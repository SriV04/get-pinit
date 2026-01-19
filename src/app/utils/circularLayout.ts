/**
 * Utility functions for circular carousel layout calculations
 */

/**
 * Calculate the position of an icon in a circular orbit (2D - legacy)
 * @param index - The index of the icon (0-6 for 7 icons)
 * @param radius - The radius of the circle
 * @returns Object with x and y coordinates
 */
export function getIconPosition(index: number, radius: number) {
  const angle = ((index / 7) * 2 * Math.PI) - (Math.PI / 2); // Start at top
  return {
    x: Math.round(Math.cos(angle) * radius * 2) / 2,
    y: Math.round(Math.sin(angle) * radius * 2) / 2,
  };
}

/**
 * Calculate the 3D position of an icon in a circular orbit with depth
 * @param index - The index of the icon (0-6 for 7 icons)
 * @param totalCount - Total number of icons
 * @param radius - The radius of the circle
 * @returns Object with x, y, and z coordinates
 */
export function get3DIconPosition(
  index: number,
  totalCount: number,
  radius: number
): { x: number; y: number; z: number } {
  const angle = ((index / totalCount) * 2 * Math.PI) - (Math.PI / 2);

  const x = Math.round(Math.cos(angle) * radius * 2) / 2;
  const y = Math.round(Math.sin(angle) * radius * 2) / 2;

  // Z-axis creates depth: front items z=0, side/back items recede to z=-200
  // Use sine to create depth - items at sides/back are farther away
  const z = Math.round(-Math.abs(Math.sin(angle)) * 200);

  return { x, y, z };
}

/**
 * Calculate scale factor based on depth (z position)
 * Icons farther away appear smaller
 * @param z - The z coordinate (negative values = farther away)
 * @returns Scale factor (0.75 to 1.0)
 */
export function getDepthScale(z: number): number {
  // Scale from 1.0 (front, z=0) to 0.75 (back, z=-200)
  return Math.max(0.75, 1 - (Math.abs(z) / 200) * 0.25);
}

/**
 * Calculate blur amount based on depth (z position)
 * Icons farther away have more blur (depth-of-field effect)
 * @param z - The z coordinate (negative values = farther away)
 * @returns Blur radius in pixels (0 to 3)
 */
export function getDepthBlur(z: number): number {
  // Blur from 0px (front) to 3px (back)
  return Math.min(3, Math.abs(z) / 67);
}

/**
 * Calculate z-index based on depth
 * Icons closer to viewer should appear above farther icons
 * @param z - The z coordinate (negative values = farther away)
 * @returns Z-index value
 */
export function getDepthZIndex(z: number): number {
  // Higher z-index for items closer to viewer
  return Math.round(100 - Math.abs(z));
}

/**
 * Get responsive radius based on viewport width
 * Updated with larger values for better 3D visibility
 * @param width - The viewport width in pixels
 * @returns The appropriate radius for the circle
 */
export function getResponsiveRadius(width: number): number {
  if (width < 768) return 160;  // Mobile: +20px
  if (width < 1024) return 200;  // Tablet: +20px
  if (width < 1920) return 240;  // Desktop: +20px
  return 280;  // Large: +20px
}

/**
 * Get responsive icon size based on viewport width
 * @param width - The viewport width in pixels
 * @returns The appropriate icon size in pixels
 */
export function getResponsiveIconSize(width: number): number {
  if (width < 768) return 48;
  if (width < 1024) return 64;
  return 72;
}
