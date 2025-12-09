import { PhoneValidator } from "../types";

/**
 * Validates Singapore phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 8 or 9
 * - Landline: 8 digits starting with 6
 * - Non-digit characters are stripped before validation
 * - Handles international format (+65 prefix)
 * 
 * Number types:
 * - 6XXX XXXX: Landline
 * - 8XXX XXXX: Mobile
 * - 9XXX XXXX: Mobile
 * 
 * @example
 * validateSG("8123 4567") // true (mobile)
 * validateSG("9123 4567") // true (mobile)
 * validateSG("6123 4567") // true (landline)
 * validateSG("+65 8123 4567") // true (international mobile)
 * validateSG("+65 6123 4567") // true (international landline)
 */
export const validateSG: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+65)
  if (digits.startsWith("65") && digits.length > 8) {
    digits = digits.slice(2);
  }
  
  // Must be 8 digits starting with 6 (landline), 8, or 9 (mobile)
  return /^[689]\d{7}$/.test(digits);
};

