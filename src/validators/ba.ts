import { PhoneValidator } from "../types";

/**
 * Validates Bosnia and Herzegovina phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 6x
 * - Landline: 8-9 digits with area codes (e.g., 33-Sarajevo, 51-Banja Luka)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+387 prefix)
 * 
 * Mobile prefixes: 60-66
 * Major area codes:
 * - 33: Sarajevo
 * - 51: Banja Luka
 * - 35: Mostar
 * - 32: Tuzla
 * 
 * @example
 * validateBA("061 123 456") // true (mobile)
 * validateBA("33 123 456") // true (landline - Sarajevo)
 * validateBA("+387 61 123 456") // true (international mobile)
 * validateBA("+387 33 123 456") // true (international landline)
 */
export const validateBA: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+387)
  if (digits.startsWith("387")) {
    digits = "0" + digits.slice(3);
  }
  
  // Bosnian numbers: 9-10 digits starting with 0
  if (!/^0?\d{8,9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 06[0-6] followed by 6 digits (9 total with leading 0)
  const isMobile = /^0?6[0-6]\d{6}$/.test(digits);
  
  // Landline: 0?[3-5] followed by 6-7 digits (8-9 total with optional leading 0)
  const isLandline = /^0?[3-5]\d{6,7}$/.test(digits);
  
  return isMobile || isLandline;
};

