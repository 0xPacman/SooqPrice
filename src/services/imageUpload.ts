import imageCompression from 'browser-image-compression';

export interface ImageUploadOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
  folder?: string;
  isProfilePicture?: boolean;
}

export interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export class ImageUploadService {
  private static cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  private static uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  /**
   * Compress image before upload to reduce bandwidth usage
   * Essential for Moroccan users with varying internet speeds
   */
  static async compressImage(
    file: File, 
    options: ImageUploadOptions = {}
  ): Promise<File> {
    const compressionOptions = {
      maxSizeMB: options.maxSizeMB || 0.8, // 800KB default
      maxWidthOrHeight: options.maxWidthOrHeight || 1024,
      useWebWorker: true,
      fileType: 'image/jpeg',
      quality: options.quality || 0.8,
    };

    try {
      const compressedFile = await imageCompression(file, compressionOptions);
      console.log('Image compressed:', {
        original: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        compressed: `${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
        reduction: `${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`
      });
      return compressedFile;
    } catch (error) {
      console.warn('Image compression failed, using original:', error);
      return file;
    }
  }

  /**
   * Validate image file before upload
   */
  static validateImage(file: File): { isValid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB max

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Invalid file type. Please use JPEG, PNG, or WebP images.'
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File too large. Please use an image smaller than 10MB.'
      };
    }

    return { isValid: true };
  }

  /**
   * Upload to Cloudinary with automatic optimization
   * Perfect for product images with varying network conditions
   */
  static async uploadToCloudinary(
    file: File,
    options: ImageUploadOptions = {}
  ): Promise<UploadedImage> {
    // Validate file
    const validation = this.validateImage(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Compress image
    const compressedFile = await this.compressImage(file, options);

    // Prepare form data
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', this.uploadPreset);
    
    // Add folder organization
    if (options.folder) {
      formData.append('folder', options.folder);
    }

    // Add transformation for consistent sizing
    const transformation = options.isProfilePicture
      ? 'c_fill,g_face,h_400,w_400,q_auto:good,f_auto' // Square profile pics
      : 'c_fit,h_800,w_800,q_auto:good,f_auto'; // Product images
    
    formData.append('transformation', transformation);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      };
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Failed to upload image. Please try again.');
    }
  }

  /**
   * Generate optimized URLs for different screen sizes
   * Reduces data usage for mobile users in Morocco
   */
  static getOptimizedUrl(publicId: string, options: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best';
    format?: 'auto' | 'jpg' | 'png' | 'webp';
  } = {}): string {
    const {
      width,
      height,
      quality = 'auto:good',
      format = 'auto'
    } = options;

    let transformation = `q_${quality},f_${format}`;
    
    if (width && height) {
      transformation += `,c_fill,w_${width},h_${height}`;
    } else if (width) {
      transformation += `,c_scale,w_${width}`;
    } else if (height) {
      transformation += `,c_scale,h_${height}`;
    }

    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformation}/${publicId}`;
  }

  /**
   * Delete image from Cloudinary
   * Note: This requires server-side implementation for security
   */  static async deleteImage(_publicId: string): Promise<boolean> {
    // This should be implemented on your backend for security
    console.warn('Image deletion should be handled server-side');
    
    // For now, just mark as deleted in your database
    // The actual Cloudinary deletion should happen via your backend API
    return true;
  }

  /**
   * Generate thumbnail URL for quick loading
   */
  static getThumbnailUrl(publicId: string, size: 150 | 300 | 500 = 150): string {
    return this.getOptimizedUrl(publicId, {
      width: size,
      height: size,
      quality: 'auto:low'
    });
  }

  /**
   * Generate responsive image URLs for different breakpoints
   */
  static getResponsiveUrls(publicId: string) {
    return {
      mobile: this.getOptimizedUrl(publicId, { width: 400, quality: 'auto:good' }),
      tablet: this.getOptimizedUrl(publicId, { width: 768, quality: 'auto:good' }),
      desktop: this.getOptimizedUrl(publicId, { width: 1200, quality: 'auto:best' }),
      thumbnail: this.getThumbnailUrl(publicId, 150),
    };
  }
}

// Utility functions for common use cases
export const uploadProductImage = (file: File, userId: string) => {
  return ImageUploadService.uploadToCloudinary(file, {
    folder: `products/${userId}`,
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
  });
};

export const uploadProfilePicture = (file: File, userId: string) => {
  return ImageUploadService.uploadToCloudinary(file, {
    folder: `profiles/${userId}`,
    maxSizeMB: 0.5,
    maxWidthOrHeight: 400,
    isProfilePicture: true,
  });
};

export default ImageUploadService;
