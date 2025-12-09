import { PhoneValidator } from "../types";

/**
 * Validates Maldivian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 7 digits starting with 7, 9
 * - Landline: 7 digits starting with 3, 6
 * - Non-digit characters are stripped before validation
 * - Handles international format (+960 prefix)
 * 
 * Mobile prefixes: 7xx, 9xx
 * Landline prefixes: 3xx, 6xx
 * 
 * @example
 * validateMV("791 2345") // true (mobile)
 * validateMV("332 1234") // true (landline)
 * validateMV("+960 791 2345") // true (international mobile)
 * validateMV("+960 332 1234") // true (international landline)
 */
export const validateMV: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+960)
  // Only strip if more than 7 digits (to avoid stripping valid 960xxxx numbers)
  if (digits.startsWith("960") && digits.length > 7) {
    digits = digits.slice(3);
  }
  
  // Maldivian numbers: 7 digits
  if (!/^\d{7}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 7xx or 9xx followed by 4 digits (7 total)
  const isMobile = /^[79]\d{6}$/.test(digits);
  
  // Landline: 3xx or 6xx followed by 4 digits (7 total)
  const isLandline = /^[36]\d{6}$/.test(digits);
  
  return isMobile || isLandline;
};

