import { PhoneValidator } from "../types";

/**
 * Validates Afghanistan phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 7
 * - Landline: 9 digits with area codes (e.g., 20-Kabul, 40-Herat)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+93 prefix)
 * 
 * Mobile prefixes: 70-79
 * Major area codes:
 * - 20: Kabul
 * - 40: Herat
 * - 30: Kandahar
 * 
 * @example
 * validateAF("70 123 4567") // true (mobile)
 * validateAF("20 123 4567") // true (landline - Kabul)
 * validateAF("+93 70 123 4567") // true (international mobile)
 * validateAF("+93 20 123 4567") // true (international landline)
 */
export const validateAF: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+93)
  if (digits.startsWith("93")) {
    digits = digits.slice(2);
  }
  
  // Afghanistan numbers: 9 digits
  if (!/^\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: starts with 7
  const isMobile = /^7\d{8}$/.test(digits);
  
  // Landline: starts with 2-6 (area codes)
  const isLandline = /^[2-6]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

