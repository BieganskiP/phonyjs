import { PhoneValidator } from "../types";

/**
 * Validates Sri Lankan phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 07x
 * - Landline: 10 digits with area codes (e.g., 011-Colombo, 081-Kandy)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+94 prefix)
 * 
 * Mobile prefixes: 070-079
 * Major area codes:
 * - 011: Colombo
 * - 081: Kandy
 * - 091: Jaffna
 * 
 * @example
 * validateLK("071 234 5678") // true (mobile)
 * validateLK("011 234 5678") // true (landline - Colombo)
 * validateLK("+94 71 234 5678") // true (international mobile)
 * validateLK("+94 11 234 5678") // true (international landline)
 */
export const validateLK: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+94)
  if (digits.startsWith("94")) {
    digits = "0" + digits.slice(2);
  }
  
  // Sri Lankan numbers: 10 digits starting with 0
  if (!/^0\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 07[0-9] followed by 7 digits (10 total)
  const isMobile = /^07\d{8}$/.test(digits);
  
  // Landline: 0[1-9] (not 07) followed by 8 digits (10 total)
  const isLandline = /^0[1-6,8-9]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

