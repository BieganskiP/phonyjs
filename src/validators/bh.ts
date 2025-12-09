import { PhoneValidator } from "../types";

/**
 * Validates Bahraini phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 3
 * - Landline: 8 digits starting with 1 or 7
 * - Non-digit characters are stripped before validation
 * - Handles international format (+973 prefix)
 * 
 * Mobile carriers:
 * - 3xxx xxxx: Various carriers (Batelco, Zain, Viva)
 * 
 * Landline:
 * - 1xxx xxxx: Manama and central regions
 * - 7xxx xxxx: Other regions
 * 
 * @example
 * validateBH("3123 4567") // true (mobile)
 * validateBH("1123 4567") // true (landline - Manama)
 * validateBH("7123 4567") // true (landline)
 * validateBH("+973 3123 4567") // true (international mobile)
 */
export const validateBH: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+973)
  if (digits.startsWith("973") && digits.length > 8) {
    digits = digits.slice(3);
  }
  
  // Must be 8 digits
  if (digits.length !== 8) {
    return false;
  }
  
  // Mobile: starts with 3
  const isMobile = /^3\d{7}$/.test(digits);
  
  // Landline: starts with 1 or 7
  const isLandline = /^[17]\d{7}$/.test(digits);
  
  return isMobile || isLandline;
};

