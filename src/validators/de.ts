import { PhoneValidator } from "../types";

/**
 * Validates German phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile numbers: 10-11 digits starting with 015, 016, or 017
 * - Landline numbers: Variable length (5-14 digits) with area codes
 * - Non-digit characters are stripped before validation
 * - Handles international format (+49 prefix)
 * 
 * @example
 * validateDE("0151 12345678") // true (mobile)
 * validateDE("030 12345678") // true (landline - Berlin)
 * validateDE("089 123456") // true (landline - Munich)
 * validateDE("+49 151 12345678") // true (international mobile)
 * validateDE("+49 30 12345678") // true (international landline)
 */
export const validateDE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+49)
  if (digits.startsWith("49") && digits.length > 5) {
    digits = "0" + digits.slice(2);
  }
  
  // Mobile: 01[567] + 7-9 digits (10-11 total)
  // Landline: 0[2-9] + variable length (5-14 digits total)
  return /^(01[567]\d{7,9}|0[2-9]\d{3,12})$/.test(digits);
};

