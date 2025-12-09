import { PhoneValidator } from "../types";

/**
 * Validates Hong Kong phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 4, 5, 6, 7, 9
 * - Landline: 8 digits starting with 2, 3
 * - Non-digit characters are stripped before validation
 * - Handles international format (+852 prefix)
 * 
 * Mobile prefixes: 4xxx-9xxx
 * Landline prefixes: 2xxx, 3xxx
 * 
 * Note: Hong Kong does not use area codes, all numbers are 8 digits
 * 
 * @example
 * validateHK("9123 4567") // true (mobile)
 * validateHK("2123 4567") // true (landline)
 * validateHK("+852 9123 4567") // true (international mobile)
 * validateHK("+852 2123 4567") // true (international landline)
 */
export const validateHK: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+852)
  if (digits.startsWith("852")) {
    digits = digits.slice(3);
  }
  
  // Hong Kong numbers: 8 digits
  if (!/^\d{8}$/.test(digits)) {
    return false;
  }
  
  // Mobile: starts with 4, 5, 6, 7, 9
  const isMobile = /^[4-79]\d{7}$/.test(digits);
  
  // Landline: starts with 2, 3
  const isLandline = /^[23]\d{7}$/.test(digits);
  
  return isMobile || isLandline;
};

