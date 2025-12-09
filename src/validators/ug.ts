import { PhoneValidator } from "../types";

/**
 * Validates Ugandan phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 07xx
 * - Landline: 10 digits with area codes (e.g., 041-Kampala, 0392-Entebbe)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+256 prefix)
 * 
 * Mobile prefixes: 070-079
 * Major area codes:
 * - 041: Kampala
 * - 0392: Entebbe
 * - 0485: Jinja
 * 
 * @example
 * validateUG("0712 345 678") // true (mobile)
 * validateUG("041 234 5678") // true (landline - Kampala)
 * validateUG("+256 712 345 678") // true (international mobile)
 * validateUG("+256 41 234 5678") // true (international landline)
 */
export const validateUG: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+256)
  if (digits.startsWith("256")) {
    digits = "0" + digits.slice(3);
  }
  
  // Ugandan numbers: 10 digits starting with 0
  if (!/^0\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 07xx followed by 7 digits (10 total)
  const isMobile = /^07\d{8}$/.test(digits);
  
  // Landline: 0[2-4] followed by 8 digits (10 total)
  const isLandline = /^0[2-4]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

