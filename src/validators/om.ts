import { PhoneValidator } from "../types";

/**
 * Validates Omani phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 7, 9, or 95-99
 * - Landline: 8 digits starting with 2 (area codes like 24-Muscat)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+968 prefix)
 * 
 * Mobile carriers:
 * - 7xxx xxxx: Omantel
 * - 9xxx xxxx: Ooredoo
 * - 95-99: Various mobile carriers
 * 
 * Major area codes:
 * - 24: Muscat
 * - 25: Sohar
 * - 26: Nizwa
 * - 23: Salalah
 * 
 * @example
 * validateOM("7xxx xxxx") // true (mobile - Omantel)
 * validateOM("9xxx xxxx") // true (mobile - Ooredoo)
 * validateOM("24 xx xxxx") // true (landline - Muscat)
 * validateOM("+968 7xxx xxxx") // true (international mobile)
 * validateOM("+968 24 xx xxxx") // true (international landline)
 */
export const validateOM: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+968)
  if (digits.startsWith("968") && digits.length > 8) {
    digits = digits.slice(3);
  }
  
  // Must be 8 digits
  if (digits.length !== 8) {
    return false;
  }
  
  // Mobile: starts with 7 or 9
  const isMobile = /^[79]\d{7}$/.test(digits);
  
  // Landline: starts with 2
  const isLandline = /^2\d{7}$/.test(digits);
  
  return isMobile || isLandline;
};

