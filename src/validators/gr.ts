import { PhoneValidator } from "../types";

/**
 * Validates Greek phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 69 (69x)
 * - Landline: 10 digits starting with 2 (area codes like 21-Athens, 231-Thessaloniki)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+30 prefix)
 * 
 * Mobile prefixes: 690-699 (various carriers - Cosmote, Vodafone, Wind)
 * Major area codes:
 * - 21: Athens and Attica
 * - 231: Thessaloniki
 * - 261: Patras
 * - 281: Heraklion
 * 
 * @example
 * validateGR("69x xxx xxxx") // true (mobile)
 * validateGR("21 xxxx xxxx") // true (landline - Athens)
 * validateGR("+30 69x xxx xxxx") // true (international mobile)
 * validateGR("+30 21 xxxx xxxx") // true (international landline)
 */
export const validateGR: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+30)
  if (digits.startsWith("30") && digits.length > 10) {
    digits = digits.slice(2);
  }
  
  // Must be 10 digits
  if (digits.length !== 10) {
    return false;
  }
  
  // Mobile: 69x followed by 7 digits (10 total)
  const isMobile = /^69\d{8}$/.test(digits);
  
  // Landline: 2x followed by 8 digits (10 total)
  const isLandline = /^2\d{9}$/.test(digits);
  
  return isMobile || isLandline;
};

