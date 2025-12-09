import { PhoneValidator } from "../types";

/**
 * Validates Cyprus phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 9x
 * - Landline: 8 digits starting with 2x
 * - Non-digit characters are stripped before validation
 * - Handles international format (+357 prefix)
 * 
 * Mobile prefixes: 95-99
 * Landline prefixes: 22-26
 * 
 * @example
 * validateCY("96 123 456") // true (mobile)
 * validateCY("22 123 456") // true (landline)
 * validateCY("+357 96 123 456") // true (international mobile)
 * validateCY("+357 22 123 456") // true (international landline)
 */
export const validateCY: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+357)
  if (digits.startsWith("357")) {
    digits = digits.slice(3);
  }
  
  // Cyprus numbers: 8 digits
  if (!/^\d{8}$/.test(digits)) {
    return false;
  }
  
  // Mobile: starts with 9[5-9]
  const isMobile = /^9[5-9]\d{6}$/.test(digits);
  
  // Landline: starts with 2[2-6]
  const isLandline = /^2[2-6]\d{6}$/.test(digits);
  
  return isMobile || isLandline;
};

