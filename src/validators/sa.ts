import { PhoneValidator } from "../types";

/**
 * Validates Saudi Arabian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 05
 * - Landline: 10 digits with area codes (011-Riyadh, 012-Mecca/Jeddah, 013-Eastern, 014-Madinah, etc.)
 * - Valid mobile prefixes: 050, 053, 054, 055, 056, 058, 059
 * - Non-digit characters are stripped before validation
 * - Handles international format (+966 prefix)
 * 
 * Mobile carriers:
 * - 050, 053, 055: STC
 * - 054, 056: Mobily
 * - 058, 059: Zain
 * 
 * @example
 * validateSA("050 123 4567") // true (mobile)
 * validateSA("011 123 4567") // true (landline - Riyadh)
 * validateSA("012 123 4567") // true (landline - Jeddah)
 * validateSA("+966 50 123 4567") // true (international mobile)
 * validateSA("+966 11 123 4567") // true (international landline)
 */
export const validateSA: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+966)
  if (digits.startsWith("966") && digits.length > 9) {
    digits = "0" + digits.slice(3);
  }
  
  // Mobile: 05[0345689] + 7 digits (10 total)
  // Landline: 01[1-7] + 7 digits (10 total)
  return /^(05[0345689]\d{7}|01[1-7]\d{7})$/.test(digits);
};

