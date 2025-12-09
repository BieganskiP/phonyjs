import { PhoneValidator } from "../types";

/**
 * Validates Georgian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 5xx
 * - Landline: 9 digits with area codes (e.g., 32-Tbilisi, 422-Batumi)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+995 prefix)
 * 
 * Mobile prefixes: 5xx (various operators)
 * Major area codes:
 * - 32: Tbilisi
 * - 422: Batumi
 * - 431: Kutaisi
 * - 322: Rustavi
 * 
 * @example
 * validateGE("555 123 456") // true (mobile)
 * validateGE("32 234 5678") // true (landline - Tbilisi)
 * validateGE("+995 555 123 456") // true (international mobile)
 * validateGE("+995 32 234 5678") // true (international landline)
 */
export const validateGE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+995)
  if (digits.startsWith("995")) {
    digits = digits.slice(3);
  }
  
  // Georgian numbers: 9 digits
  if (!/^\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 5xx followed by 6 digits (9 total)
  const isMobile = /^5\d{8}$/.test(digits);
  
  // Landline: [2-4] followed by 7-8 digits (8-9 total)
  const isLandline = /^[2-4]\d{7,8}$/.test(digits);
  
  return isMobile || isLandline;
};

