import { PhoneValidator } from "../types";

/**
 * Validates Egyptian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 010, 011, 012, or 015
 * - Landline: 9-10 digits with area codes (02-Cairo, 03-Alexandria, 040-Aswan, etc.)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+20 prefix)
 * 
 * Mobile carriers:
 * - Vodafone: 010
 * - Etisalat: 011
 * - Orange: 012
 * - WE (We): 015
 * 
 * @example
 * validateEG("010 1234 5678") // true (mobile)
 * validateEG("02 1234 5678") // true (landline - Cairo)
 * validateEG("03 123 4567") // true (landline - Alexandria)
 * validateEG("+20 10 1234 5678") // true (international mobile)
 * validateEG("+20 2 1234 5678") // true (international landline)
 */
export const validateEG: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+20)
  if (digits.startsWith("20") && digits.length > 9) {
    digits = "0" + digits.slice(2);
  }
  
  // Mobile: 01[0125] + 8 digits (10 total)
  // Landline: 0[2-9] + 7-8 digits (9-10 total)
  return /^(01[0125]\d{8}|0[2-9]\d{6,8})$/.test(digits);
};

