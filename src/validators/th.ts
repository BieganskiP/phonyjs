import { PhoneValidator } from "../types";

/**
 * Validates Thai phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 06, 08, 09
 * - Landline: 9 digits with area codes (e.g., 02-Bangkok, 053-Chiang Mai)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+66 prefix)
 * 
 * Mobile prefixes: 06x, 08x, 09x
 * Major area codes:
 * - 02: Bangkok
 * - 053: Chiang Mai
 * - 076: Phuket
 * 
 * @example
 * validateTH("081 234 5678") // true (mobile)
 * validateTH("02 123 4567") // true (landline - Bangkok)
 * validateTH("+66 81 234 5678") // true (international mobile)
 * validateTH("+66 2 123 4567") // true (international landline)
 */
export const validateTH: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+66)
  if (digits.startsWith("66")) {
    digits = "0" + digits.slice(2);
  }
  
  // Thai numbers: 9-10 digits starting with 0
  if (!/^0\d{8,9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 0[689]x followed by 7 digits (10 total)
  const isMobile = /^0[689]\d{8}$/.test(digits);
  
  // Landline: 0[2-7] followed by 7-8 digits (9-10 total)
  const isLandline = /^0[2-7]\d{7,8}$/.test(digits);
  
  return isMobile || isLandline;
};

