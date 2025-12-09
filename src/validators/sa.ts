import { PhoneValidator } from "../types";

/**
 * Validates Saudi Arabian phone numbers.
 * 
 * Rules:
 * - Mobile numbers: 10 digits starting with 05
 * - Valid mobile prefixes: 050, 053, 054, 055, 056, 058, 059
 * - Non-digit characters are stripped before validation
 * - Handles international format (+966 prefix)
 * 
 * Carriers:
 * - 050, 053, 055: STC
 * - 054, 056: Mobily
 * - 058, 059: Zain
 * 
 * @example
 * validateSA("0501234567") // true
 * validateSA("050 123 4567") // true
 * validateSA("+966 50 123 4567") // true
 * validateSA("0571234567") // false (057 is not a valid mobile prefix)
 */
export const validateSA: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+966)
  if (digits.startsWith("966") && digits.length > 10) {
    digits = "0" + digits.slice(3);
  }
  
  // Must be 10 digits starting with 05, followed by valid carrier prefix
  // Valid prefixes: 050, 053, 054, 055, 056, 058, 059
  return /^05[0345689]\d{7}$/.test(digits);
};

