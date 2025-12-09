import { PhoneValidator } from "../types";

/**
 * Validates Qatari phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 3, 5, 6, or 7
 * - Landline: 8 digits starting with 4
 * - Non-digit characters are stripped before validation
 * - Handles international format (+974 prefix)
 * 
 * Mobile carriers:
 * - 3xxx xxxx: Ooredoo
 * - 5xxx xxxx, 6xxx xxxx, 7xxx xxxx: Vodafone Qatar
 * 
 * @example
 * validateQA("3123 4567") // true (mobile - Ooredoo)
 * validateQA("5123 4567") // true (mobile - Vodafone)
 * validateQA("4123 4567") // true (landline)
 * validateQA("+974 3123 4567") // true (international mobile)
 */
export const validateQA: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+974)
  if (digits.startsWith("974") && digits.length > 8) {
    digits = digits.slice(3);
  }
  
  // Must be 8 digits
  if (digits.length !== 8) {
    return false;
  }
  
  // Mobile: starts with 3, 5, 6, or 7
  const isMobile = /^[3567]\d{7}$/.test(digits);
  
  // Landline: starts with 4
  const isLandline = /^4\d{7}$/.test(digits);
  
  return isMobile || isLandline;
};

