import { PhoneValidator } from "../types";

/**
 * Validates Sudanese phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 9 digits starting with 9x (90, 91, 92, 99, etc.)
 * - Landline: 9 digits with area codes (e.g., 15-Khartoum, 18-Omdurman)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+249 prefix)
 * 
 * Mobile carriers:
 * - 90, 91, 92: Zain
 * - 99, 98: Sudani
 * - 95, 96: MTN
 * 
 * Major area codes:
 * - 15: Khartoum
 * - 18: Omdurman
 * - 41: Port Sudan
 * 
 * @example
 * validateSD("091 234 5678") // true (mobile - Zain)
 * validateSD("15 234 5678") // true (landline - Khartoum)
 * validateSD("+249 91 234 5678") // true (international mobile)
 * validateSD("+249 15 234 5678") // true (international landline)
 */
export const validateSD: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+249)
  if (digits.startsWith("249") && digits.length > 9) {
    digits = digits.slice(3);
  }
  
  // Sudanese numbers can be 9 or 10 digits (with leading 0 for mobile)
  // Mobile: 09x followed by 7 digits (10 total) OR 9x followed by 7 digits (9 total without leading 0)
  const isMobile = /^0?9[0-9]\d{7}$/.test(digits);
  
  // Landline: 1x, 2x, etc. followed by remaining digits (9 total)
  const isLandline = /^[1-8]\d{8}$/.test(digits) && digits.length === 9;
  
  return isMobile || isLandline;
};

