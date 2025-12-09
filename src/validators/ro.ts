import { PhoneValidator } from "../types";

/**
 * Validates Romanian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 07x
 * - Landline: 10 digits with area codes (e.g., 021-Bucharest, 0264-Cluj)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+40 prefix)
 * 
 * Mobile prefixes: 072-079
 * Major area codes:
 * - 021: Bucharest
 * - 0264: Cluj-Napoca
 * - 0256: Timișoara
 * - 0232: Iași
 * 
 * @example
 * validateRO("0722 123 456") // true (mobile)
 * validateRO("021 234 5678") // true (landline - Bucharest)
 * validateRO("+40 722 123 456") // true (international mobile)
 * validateRO("+40 21 234 5678") // true (international landline)
 */
export const validateRO: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+40)
  if (digits.startsWith("40")) {
    digits = "0" + digits.slice(2);
  }
  
  // Romanian numbers: 10 digits starting with 0
  if (!/^0\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 07[2-9] followed by 7 digits (10 total)
  const isMobile = /^07[2-9]\d{7}$/.test(digits);
  
  // Landline: 0[2-3] followed by 8 digits (10 total)
  const isLandline = /^0[2-3]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

