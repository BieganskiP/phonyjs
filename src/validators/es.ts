import { PhoneValidator } from "../types";

/**
 * Validates Spanish phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 6 or 7
 * - Landline: 9 digits starting with 8 or 9
 * - Non-digit characters are stripped before validation
 * - Handles international format (+34 prefix)
 * 
 * @example
 * validateES("612 345 678") // true (mobile)
 * validateES("912 345 678") // true (landline - Madrid)
 * validateES("934 123 456") // true (landline - Barcelona)
 * validateES("+34 612 345 678") // true (international mobile)
 * validateES("+34 91 234 5678") // true (international landline)
 */
export const validateES: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+34)
  if (digits.startsWith("34") && digits.length > 9) {
    digits = digits.slice(2);
  }
  
  // Mobile: 6/7 + 8 digits
  // Landline: 8/9 + 8 digits
  return /^[6-9]\d{8}$/.test(digits);
};

