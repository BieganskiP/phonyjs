import { PhoneValidator } from "../types";

/**
 * Validates French phone numbers.
 * 
 * Rules:
 * - Must be 10 digits
 * - Mobile numbers start with 06 or 07
 * - Landlines start with 01-05
 * - Special services start with 08-09
 * - Non-digit characters are stripped before validation
 * - Handles international format (+33 prefix)
 * 
 * Note: This validator accepts mobile, landline, and special service numbers.
 * 
 * @example
 * validateFR("06 12 34 56 78") // true (mobile)
 * validateFR("07 12 34 56 78") // true (mobile)
 * validateFR("01 23 45 67 89") // true (landline - Paris)
 * validateFR("+33 6 12 34 56 78") // true (international mobile)
 */
export const validateFR: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+33) and add leading 0
  if (digits.startsWith("33") && digits.length > 9) {
    digits = "0" + digits.slice(2);
  }
  
  // Must be 10 digits starting with 0, followed by 1-9
  return /^0[1-9]\d{8}$/.test(digits);
};

