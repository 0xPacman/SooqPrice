import { createApi } from 'unsplash-js';

// Unsplash API configuration
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'y2XU5IoudtxLK_mnxCZ9XMNGda-QIVIZFihQzRv79Uo',
});

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
  };
  links: {
    download: string;
  };
}

export class UnsplashService {
  private static cache = new Map<string, UnsplashImage[]>();
  private static readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
  private static cacheTimestamps = new Map<string, number>();

  /**
   * Search for product images on Unsplash
   */
  static async searchProductImages(productName: string, count: number = 3): Promise<UnsplashImage[]> {
    const cacheKey = `${productName.toLowerCase()}_${count}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const timestamp = this.cacheTimestamps.get(cacheKey) || 0;
      if (Date.now() - timestamp < this.CACHE_DURATION) {
        return this.cache.get(cacheKey) || [];
      }
    }

    try {
      // Create search query for food/produce
      const searchQuery = `${productName} fresh produce market food vegetable fruit`;
      
      const result = await unsplash.search.getPhotos({
        query: searchQuery,
        page: 1,
        perPage: count,
        orientation: 'landscape',
        orderBy: 'relevant',
      });

      if (result.errors) {
        console.error('Unsplash API error:', result.errors);
        return [];
      }

      const images: UnsplashImage[] = result.response?.results.map(photo => ({
        id: photo.id,
        urls: photo.urls,
        alt_description: photo.alt_description,
        description: photo.description,
        user: {
          name: photo.user.name,
          username: photo.user.username,
        },
        links: {
          download: photo.links.download,
        },
      })) || [];

      // Cache the results
      this.cache.set(cacheKey, images);
      this.cacheTimestamps.set(cacheKey, Date.now());

      return images;
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
      return [];
    }
  }

  /**
   * Get a single product image URL
   */
  static async getProductImageUrl(productName: string, size: 'thumb' | 'small' | 'regular' = 'small'): Promise<string | null> {
    try {
      const images = await this.searchProductImages(productName, 1);
      if (images.length > 0) {
        return images[0].urls[size];
      }
      return null;
    } catch (error) {
      console.error('Error getting product image URL:', error);
      return null;
    }
  }

  /**
   * Download image for offline use (trigger download)
   */
  static async downloadImage(image: UnsplashImage): Promise<void> {
    try {
      // Trigger download endpoint to give credit to photographer
      await fetch(image.links.download);
      
      // Open download link
      const link = document.createElement('a');
      link.href = image.urls.regular;
      link.download = `${image.alt_description || 'unsplash-image'}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  /**
   * Get attribution text for image credit
   */
  static getAttributionText(image: UnsplashImage): string {
    return `Photo by ${image.user.name} on Unsplash`;
  }

  /**
   * Clear cache
   */
  static clearCache(): void {
    this.cache.clear();
    this.cacheTimestamps.clear();
  }

  /**
   * Preload images for common products
   */
  static async preloadCommonProducts(products: string[]): Promise<void> {
    const promises = products.map(product => 
      this.searchProductImages(product, 1)
    );
    
    try {
      await Promise.all(promises);
      console.log('Preloaded images for common products');
    } catch (error) {
      console.error('Error preloading product images:', error);
    }
  }
}

export default UnsplashService;
