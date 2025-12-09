import { PhoneValidator } from "../types";

/**
 * Validates Kuwaiti phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 5, 6, or 9
 * - Landline: 8 digits starting with 2
 * - Non-digit characters are stripped before validation
 * - Handles international format (+965 prefix)
 * 
 * Mobile carriers:
 * - 5xxx xxxx: Zain
 * - 6xxx xxxx: Ooredoo
 * - 9xxx xxxx: Viva
 * 
 * @example
 * validateKW("5123 4567") // true (mobile - Zain)
 * validateKW("6123 4567") // true (mobile - Ooredoo)
 * validateKW("9123 4567") // true (mobile - Viva)
 * validateKW("2123 4567") // true (landline)
 * validateKW("+965 5123 4567") // true (international mobile)
 */
export const validateKW: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+965)
  if (digits.startsWith("965") && digits.length > 8) {
    digits = digits.slice(3);
  }
  
  // Must be 8 digits
  if (digits.length !== 8) {
    return false;
  }
  
  // Mobile: starts with 5, 6, or 9
  const isMobile = /^[569]\d{7}$/.test(digits);
  
  // Landline: starts with 2
  const isLandline = /^2\d{7}$/.test(digits);
  
  return isMobile || isLandline;
};

