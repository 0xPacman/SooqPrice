// filepath: src/utils/mapsUtils.ts
/**
 * Utility functions for Google Maps integration
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Generate Google Maps URL for viewing a location
 * @param coordinates - Latitude and longitude
 * @param placeName - Name of the place (optional)
 * @returns Google Maps URL
 */
export const getGoogleMapsUrl = (
  coordinates: Coordinates,
  placeName?: string
): string => {
  const { lat, lng } = coordinates;
  const query = placeName ? encodeURIComponent(placeName) : `${lat},${lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${query}&center=${lat},${lng}&zoom=15`;
};

/**
 * Generate Google Maps URL for directions to a location
 * @param coordinates - Destination coordinates
 * @param placeName - Name of the destination (optional)
 * @returns Google Maps directions URL
 */
export const getGoogleMapsDirectionsUrl = (
  coordinates: Coordinates,
  placeName?: string
): string => {
  const { lat, lng } = coordinates;
  const destination = placeName ? encodeURIComponent(placeName) : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
};

/**
 * Open Google Maps in a new tab/window
 * @param coordinates - Location coordinates
 * @param placeName - Name of the place (optional)
 * @param directions - Whether to open directions (default: false)
 */
export const openGoogleMaps = (
  coordinates: Coordinates,
  placeName?: string,
  directions: boolean = false
): void => {
  const url = directions 
    ? getGoogleMapsDirectionsUrl(coordinates, placeName)
    : getGoogleMapsUrl(coordinates, placeName);
  
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Get a readable address from coordinates (for display purposes)
 * Note: This is a basic implementation. For production, consider using
 * Google Geocoding API for reverse geocoding
 */
export const formatCoordinates = (coordinates: Coordinates): string => {
  return `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
};
