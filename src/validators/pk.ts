import { PhoneValidator } from "../types";

/**
 * Validates Pakistani phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 3xx (300-349 for various carriers)
 * - Landline: 9-11 digits with area codes (e.g., 21-Karachi, 42-Lahore, 51-Islamabad)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+92 prefix)
 * 
 * Mobile carriers:
 * - 300-305: Mobilink/Jazz
 * - 306-309: Telenor
 * - 310-315: Ufone
 * - 320-329: Zong
 * - 330-339: U-fone/SCOM
 * - 340-349: Warid/Jazz
 * 
 * Major area codes: 21 (Karachi), 42 (Lahore), 51 (Islamabad), 91 (Peshawar)
 * 
 * @example
 * validatePK("0300 1234567") // true (mobile - Jazz)
 * validatePK("021 12345678") // true (landline - Karachi)
 * validatePK("+92 300 1234567") // true (international mobile)
 * validatePK("+92 21 12345678") // true (international landline)
 */
export const validatePK: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+92)
  if (digits.startsWith("92")) {
    digits = "0" + digits.slice(2);
  }
  
  // Mobile: 03[0-4]x followed by 7 digits (11 total with leading 0)
  const isMobile = /^03[0-4]\d{8}$/.test(digits);
  
  // Landline: 0[2-9]x followed by varying digits (9-11 total)
  // Explicitly exclude mobile prefixes 030-034
  // Examples: 021 (Karachi), 042 (Lahore), 051 (Islamabad), 091 (Peshawar)
  const isLandline = /^0(?:2\d|3[5-9]|[4-9]\d)\d{6,8}$/.test(digits);
  
  return isMobile || isLandline;
};

