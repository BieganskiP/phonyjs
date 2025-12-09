import { PhoneValidator } from "../types";

/**
 * Validates Australian phone numbers.
 * 
 * Rules:
 * - Mobile numbers: 10 digits starting with 04
 * - Must start with 04, followed by 8 more digits
 * - Non-digit characters are stripped before validation
 * - Handles international format (+61 prefix)
 * 
 * Note: This validator focuses on mobile numbers only.
 * Australian landlines use area codes 02, 03, 07, 08 but are less commonly validated.
 * 
 * @example
 * validateAU("04 1234 5678") // true
 * validateAU("0412345678") // true
 * validateAU("+61 4 1234 5678") // true
 * validateAU("0498 765 432") // true
 */
export const validateAU: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+61) and add leading 0
  if (digits.startsWith("61") && digits.length > 9) {
    digits = "0" + digits.slice(2);
  }
  
  // Mobile numbers: 04 followed by 8 digits
  return /^04\d{8}$/.test(digits);
};

