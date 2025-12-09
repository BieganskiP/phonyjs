import { PhoneValidator } from "../types";

/**
 * Validates Australian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 04
 * - Landline: 10 digits starting with 02, 03, 07, or 08 (area codes)
 * - Area codes: 02 (NSW), 03 (VIC), 07 (QLD), 08 (SA/WA/NT)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+61 prefix)
 * 
 * @example
 * validateAU("04 1234 5678") // true (mobile)
 * validateAU("02 1234 5678") // true (landline - Sydney)
 * validateAU("03 1234 5678") // true (landline - Melbourne)
 * validateAU("+61 4 1234 5678") // true (international mobile)
 * validateAU("+61 2 1234 5678") // true (international landline)
 */
export const validateAU: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+61) and add leading 0
  if (digits.startsWith("61") && digits.length > 9) {
    digits = "0" + digits.slice(2);
  }
  
  // Mobile: 04 + 8 digits
  // Landline: 02/03/07/08 + 8 digits
  return /^0[2-478]\d{8}$/.test(digits);
};

