import { PhoneValidator } from "../types";

/**
 * Validates Lebanese phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 8 digits starting with 3, 7, or 8
 * - Landline: 7-8 digits with area codes (e.g., 1 for Beirut)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+961 prefix)
 * 
 * Mobile carriers:
 * - 3xxx xxxx: Alfa
 * - 7xxx xxxx, 8xxx xxxx: Touch
 * 
 * Major area codes:
 * - 1: Beirut
 * - 3: Mount Lebanon (landline, different from mobile 3)
 * - 4: South Lebanon
 * - 5: Mount Lebanon North
 * - 6: North Lebanon
 * - 7: Nabatieh
 * - 8: Bekaa
 * - 9: Baalbek-Hermel
 * 
 * @example
 * validateLB("3 123 456") // true (mobile - Alfa)
 * validateLB("7 123 4567") // true (mobile - Touch)
 * validateLB("1 123 456") // true (landline - Beirut)
 * validateLB("+961 3 123 456") // true (international mobile)
 */
export const validateLB: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+961)
  if (digits.startsWith("961")) {
    digits = digits.slice(3);
  }
  
  // Mobile: 7-8 digits starting with 3, 7, or 8
  const isMobile = /^[378]\d{6,7}$/.test(digits);
  
  // Landline: 7-8 digits starting with 1, 4, 5, 6, 9
  const isLandline = /^[145689]\d{6,7}$/.test(digits);
  
  return isMobile || isLandline;
};

