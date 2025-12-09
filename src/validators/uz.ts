import { PhoneValidator } from "../types";

/**
 * Validates Uzbekistan phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 9x, 88, 90-99
 * - Landline: 9 digits with area codes (e.g., 71-Tashkent, 662-Samarkand)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+998 prefix)
 * 
 * Mobile prefixes: 88, 90-99
 * Major area codes:
 * - 71: Tashkent
 * - 662: Samarkand
 * - 622: Bukhara
 * 
 * @example
 * validateUZ("90 123 45 67") // true (mobile)
 * validateUZ("71 123 45 67") // true (landline - Tashkent)
 * validateUZ("+998 90 123 45 67") // true (international mobile)
 * validateUZ("+998 71 123 45 67") // true (international landline)
 */
export const validateUZ: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+998)
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }
  
  // Uzbekistan numbers: 9 digits
  if (!/^\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: starts with 88, 9[0-9]
  const isMobile = /^(88|9[0-9])\d{7}$/.test(digits);
  
  // Landline: starts with [3-7]x (area codes)
  const isLandline = /^[3-7]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

