import { PhoneValidator } from "../types";

/**
 * Validates Russian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 11 digits starting with 7 (country code) + 9xx
 * - Landline: 11 digits with area codes (e.g., 495-Moscow, 812-St. Petersburg)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+7 prefix)
 * 
 * Mobile prefixes: 9xx (after country code)
 * Major area codes:
 * - 495/499: Moscow
 * - 812: St. Petersburg
 * - 383: Novosibirsk
 * - 343: Yekaterinburg
 * 
 * Note: Russian numbers always include country code (7) in domestic format
 * 
 * @example
 * validateRU("8 912 345 67 89") // true (mobile, 8 = domestic prefix)
 * validateRU("8 495 123 45 67") // true (landline - Moscow)
 * validateRU("+7 912 345 67 89") // true (international mobile)
 * validateRU("+7 495 123 45 67") // true (international landline)
 */
export const validateRU: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Handle domestic format: 8 prefix becomes 7
  if (digits.startsWith("8") && digits.length === 11) {
    digits = "7" + digits.slice(1);
  }
  
  // Russian numbers must be 11 digits (with country code)
  // 10-digit numbers are invalid unless without country code prefix
  if (digits.length !== 11 && digits.length !== 10) {
    return false;
  }
  
  // If 10 digits, they should NOT start with 7 or 8 (those need 11 digits)
  if (digits.length === 10 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return false;
  }
  
  // Remove country code if present (+7) to normalize
  if (digits.startsWith("7") && digits.length === 11) {
    digits = digits.slice(1);
  }
  
  // After normalization, must be exactly 10 digits
  if (!/^\d{10}$/.test(digits)) {
    return false;
  }
  
  // Mobile: starts with 9xx (after country code)
  const isMobile = /^9\d{9}$/.test(digits);
  
  // Landline: starts with area codes (not 9)
  const isLandline = /^[2-8]\d{9}$/.test(digits);
  
  return isMobile || isLandline;
};

