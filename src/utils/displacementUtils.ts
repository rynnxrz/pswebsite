// src/utils/displacementUtils.ts

/**
 * Apple's favored "squircle" function for a smooth curve.
 * y = 1 - (1 - x)^4
 * @param x - A value between 0 (edge) and 1 (flat surface).
 * @returns The "height" of the glass surface.
 */
function squircle(x: number): number {
    return 1.0 - Math.pow(1.0 - x, 4);
  }
  
  /**
   * Generates a base64 encoded PNG data URL for an SVG displacement map.
   * This map creates a refractive "liquid glass" effect for a rounded rectangle.
   *
   * @param width - The width of the navigation bar.
   * @param height - The height of the navigation bar.
   * @param borderRadius - The corner radius.
   * @param bezelWidth - The width of the curved "bezel" where refraction occurs.
   * @returns A promise that resolves with the data URL string.
   */
  export function generateDisplacementMap(
    width: number,
    height: number,
    borderRadius: number,
    bezelWidth: number
  ): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
  
      if (!ctx) {
        return resolve('');
      }
  
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
  
      // A simple physics constant for glass refraction
      const refractiveIndex = 1.5;
  
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
  
          // Calculate distance to nearest vertical and horizontal edge
          const dx = Math.max(0, borderRadius - x, x - (width - borderRadius));
          const dy = Math.max(0, borderRadius - y, y - (height - borderRadius));
          
          // Use Pythagoras to get distance from the corner center
          const distFromCorner = Math.sqrt(dx * dx + dy * dy);
          
          // Distance from the effective "edge" of the rounded rectangle
          const distFromEdge = Math.max(0, distFromCorner - borderRadius);
          
          let displacementX = 0;
          let displacementY = 0;
  
          // Only calculate refraction within the bezel area
          if (distFromEdge < bezelWidth) {
            const profileX = distFromEdge / bezelWidth; // Normalize to 0-1
            const surfaceHeight = squircle(profileX);
  
            // Approximate the surface normal's direction
            const delta = 0.01;
            const derivative = (squircle(profileX + delta) - surfaceHeight) / delta;
            
            // Calculate displacement based on a simplified Snell's Law
            const displacementMagnitude = derivative * refractiveIndex * bezelWidth;
  
            if (distFromCorner > 0) {
              displacementX = -(dx / distFromCorner) * displacementMagnitude;
              displacementY = -(dy / distFromCorner) * displacementMagnitude;
            }
          }
  
          // Map displacement vector [-max, +max] to RGB color [0, 255]
          // 128 is the neutral "zero displacement" value
          data[i] = 128 + displacementX; // Red channel for X displacement
          data[i + 1] = 128 + displacementY; // Green channel for Y displacement
          data[i + 2] = 128; // Blue channel (unused)
          data[i + 3] = 255; // Alpha channel
        }
      }
  
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    });
  }