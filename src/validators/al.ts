import { PhoneValidator } from "../types";

/**
 * Validates Albanian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 06x or 069
 * - Landline: 9 digits with area codes (e.g., 04-Tirana, 052-Durrës)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+355 prefix)
 * 
 * Mobile prefixes: 066-069
 * Major area codes:
 * - 04: Tirana
 * - 052: Durrës
 * - 042: Shkodër
 * - 082: Vlorë
 * 
 * @example
 * validateAL("069 123 4567") // true (mobile)
 * validateAL("04 234 5678") // true (landline - Tirana)
 * validateAL("+355 69 123 4567") // true (international mobile)
 * validateAL("+355 4 234 5678") // true (international landline)
 */
export const validateAL: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+355)
  if (digits.startsWith("355")) {
    digits = digits.slice(3);
  }
  
  // Albanian numbers: 9-10 digits (optional leading 0)
  if (!/^0?\d{8,9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 0?6[6-9] followed by 7 digits (10 total with leading 0, 9 without)
  const isMobile = /^0?6[6-9]\d{7}$/.test(digits);
  
  // Landline: 0?[2-5,7-9] (not 06) followed by 7-8 digits (9-10 total)
  const isLandline = /^0?(?:[2-5]|[7-9])\d{7,8}$/.test(digits);
  
  return isMobile || isLandline;
};

