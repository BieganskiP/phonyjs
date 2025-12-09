import { PhoneValidator } from "../types";

/**
 * Validates Yemeni phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 7
 * - Landline: 9 digits with area codes (e.g., 1 for Sana'a, 2 for Aden)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+967 prefix)
 * 
 * Mobile carriers:
 * - 7xxxx xxxx: Various carriers (Yemen Mobile, MTN, Sabafon)
 * 
 * Major area codes:
 * - 1: Sana'a
 * - 2: Aden
 * - 3: Taiz
 * - 4: Al Hudaydah
 * - 5: Ibb
 * 
 * @example
 * validateYE("7 1234 5678") // true (mobile)
 * validateYE("1 234 567") // true (landline - Sana'a)
 * validateYE("+967 7 1234 5678") // true (international mobile)
 */
export const validateYE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+967)
  if (digits.startsWith("967") && digits.length > 9) {
    digits = digits.slice(3);
  }
  
  // Yemen numbers are typically 9 digits, but landlines can be 7-9 digits
  // Mobile: 7 followed by 8 digits (9 total)
  const isMobile = /^7\d{8}$/.test(digits) && digits.length === 9;
  
  // Landline: starts with 1-6 (area codes), 7-9 digits total
  const isLandline = /^[1-6]\d{6,8}$/.test(digits);
  
  return isMobile || isLandline;
};

