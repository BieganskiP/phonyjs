import { PhoneValidator } from "../types";

/**
 * Validates Hungarian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 20, 30, or 70
 * - Landline: 9 digits with area codes (e.g., 1-Budapest, 62-Szeged)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+36 prefix)
 * 
 * Mobile prefixes: 20, 30, 31, 70
 * Major area codes:
 * - 1: Budapest
 * - 62: Szeged
 * - 52: Debrecen
 * - 96: Győr
 * 
 * @example
 * validateHU("20 123 4567") // true (mobile - Telenor)
 * validateHU("1 234 5678") // true (landline - Budapest)
 * validateHU("+36 20 123 4567") // true (international mobile)
 * validateHU("+36 1 234 5678") // true (international landline)
 */
export const validateHU: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+36)
  if (digits.startsWith("36")) {
    digits = digits.slice(2);
  }
  
  // Hungarian numbers: 7-9 digits (no leading 0 in domestic format)
  // Landlines can be shorter (7-8 digits) while mobiles are always 9
  if (!/^\d{7,9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: starts with 20, 30, 31, or 70 (always 9 digits exactly)
  const isMobile = /^(20|30|31|70)\d{7}$/.test(digits) && digits.length === 9;
  
  // Landline: starts with 1-9 (not 20,30,31,70), 7-9 digits total
  // Area codes: 1 (Budapest), 62 (Szeged), 52 (Debrecen), etc.
  const isLandline = /^[1-9]\d{6,8}$/.test(digits) && !isMobile;
  
  return isMobile || isLandline;
};

