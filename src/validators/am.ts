import { PhoneValidator } from "../types";

/**
 * Validates Armenian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with specific prefixes (e.g., 77, 91, 93, 94, 95, 96, 98, 99)
 * - Landline: 8 digits with area codes (e.g., 10-Yerevan, 231-Gyumri)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+374 prefix)
 * 
 * Mobile prefixes: 77, 91, 93, 94, 95, 96, 98, 99
 * Major area codes:
 * - 10: Yerevan
 * - 231: Gyumri
 * - 281: Vanadzor
 * 
 * @example
 * validateAM("077 123 456") // true (mobile)
 * validateAM("10 123 456") // true (landline - Yerevan)
 * validateAM("+374 77 123 456") // true (international mobile)
 * validateAM("+374 10 123 456") // true (international landline)
 */
export const validateAM: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+374)
  if (digits.startsWith("374")) {
    digits = "0" + digits.slice(3);
  }
  
  // Armenian numbers: 9 digits starting with 0
  if (!/^0?\d{8}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 0?77, 0?9[1,3-6,8-9] followed by 6 digits (9 total with leading 0)
  const isMobile = /^0?(77|9[1,3-6,8-9])\d{6}$/.test(digits);
  
  // Landline: 0?[1-4] followed by 7 digits (9 total with optional leading 0)
  const isLandline = /^0?[1-4]\d{7}$/.test(digits) && !isMobile;
  
  return isMobile || isLandline;
};

