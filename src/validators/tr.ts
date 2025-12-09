import { PhoneValidator } from "../types";

/**
 * Validates Turkish phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 5xx (50x-59x)
 * - Landline: 10 digits with area codes (e.g., 212-Istanbul, 312-Ankara, 216-Istanbul Asian)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+90 prefix)
 * 
 * Mobile prefixes: 50x, 51x, 52x, 53x, 54x, 55x, 56x, 57x, 58x, 59x
 * Major area codes: 212 (Istanbul European), 216 (Istanbul Asian), 312 (Ankara), 232 (Izmir)
 * 
 * @example
 * validateTR("0532 123 4567") // true (mobile - Vodafone)
 * validateTR("0212 123 4567") // true (landline - Istanbul)
 * validateTR("+90 532 123 4567") // true (international mobile)
 * validateTR("+90 212 123 4567") // true (international landline)
 */
export const validateTR: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+90)
  if (digits.startsWith("90") && digits.length > 10) {
    digits = "0" + digits.slice(2);
  }
  
  // Must be 11 digits starting with 0
  if (!/^0\d{10}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 05xx followed by 8 digits (11 total with leading 0)
  const isMobile = /^05[0-9]\d{8}$/.test(digits);
  
  // Landline: 0[2-4]xx followed by 7 digits (11 total)
  // Area codes: 2xx (European side), 3xx (Ankara, Antalya), 4xx (Asian regions)
  const isLandline = /^0[2-4]\d{9}$/.test(digits);
  
  return isMobile || isLandline;
};

