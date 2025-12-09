import { PhoneValidator } from "../types";

/**
 * Validates Chinese phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 11 digits starting with 13, 14, 15, 16, 17, 18, or 19
 * - Landline: 10-12 digits with area codes (010-Beijing, 021-Shanghai, etc.)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+86 prefix)
 * 
 * Mobile prefixes: 13x, 14x, 15x, 16x, 17x, 18x, 19x
 * Major area codes: 010 (Beijing), 021 (Shanghai), 020 (Guangzhou)
 * 
 * @example
 * validateCN("138 0013 8000") // true (mobile)
 * validateCN("010 1234 5678") // true (landline - Beijing)
 * validateCN("021 1234 5678") // true (landline - Shanghai)
 * validateCN("+86 138 0013 8000") // true (international mobile)
 */
export const validateCN: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+86)
  if (digits.startsWith("86")) {
    // Mobile numbers in international format: +86 13x
    if (digits.length === 13 && /^861[3-9]/.test(digits)) {
      digits = digits.slice(2);
    }
    // Landline in international format: +86 10 (Beijing) -> 010
    else if (digits.length >= 12) {
      digits = "0" + digits.slice(2);
    }
  }
  
  // Mobile: 1[3-9] + 9 digits (11 total)
  // Landline: 0[1-9] + area code + number (10-12 digits)
  return /^(1[3-9]\d{9}|0[1-9]\d{8,10})$/.test(digits);
};

