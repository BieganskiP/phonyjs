import { PhoneValidator } from "../types";

/**
 * Validates Jordanian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 7
 * - Landline: 8-9 digits with area codes (e.g., 6 for Amman, 2 for Irbid)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+962 prefix)
 * 
 * Mobile carriers:
 * - 7xxxx xxxx: Various carriers (Zain, Orange, Umniah)
 * 
 * Major area codes:
 * - 6: Amman
 * - 2: Irbid, Jerash, Ajloun
 * - 3: Zarqa, Mafraq
 * - 5: Aqaba, Ma'an
 * 
 * @example
 * validateJO("7 9123 4567") // true (mobile)
 * validateJO("6 123 4567") // true (landline - Amman)
 * validateJO("+962 7 9123 4567") // true (international mobile)
 * validateJO("06 123 4567") // true (landline with leading 0)
 */
export const validateJO: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+962)
  if (digits.startsWith("962")) {
    digits = digits.slice(3);
  }
  
  // Remove leading 0 if present
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  
  // Mobile: 7 followed by 8 digits (9 total)
  const isMobile = /^7\d{8}$/.test(digits);
  
  // Landline: area code (2-6) followed by 6-7 digits (7-8 total)
  const isLandline = /^[2-6]\d{6,7}$/.test(digits);
  
  return isMobile || isLandline;
};

