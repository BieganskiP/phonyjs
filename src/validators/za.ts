import { PhoneValidator } from "../types";

/**
 * Validates South African phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 06x, 07x, 08x
 * - Landline: 10 digits with area codes (e.g., 011-Johannesburg, 021-Cape Town)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+27 prefix)
 * 
 * Mobile prefixes: 06x-08x
 * Major area codes:
 * - 011: Johannesburg
 * - 021: Cape Town
 * - 031: Durban
 * - 012: Pretoria
 * 
 * @example
 * validateZA("072 123 4567") // true (mobile)
 * validateZA("011 123 4567") // true (landline - Johannesburg)
 * validateZA("+27 72 123 4567") // true (international mobile)
 * validateZA("+27 11 123 4567") // true (international landline)
 */
export const validateZA: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+27)
  if (digits.startsWith("27")) {
    digits = "0" + digits.slice(2);
  }
  
  // South African numbers: 10 digits starting with 0
  if (!/^0\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 0[6-8]x followed by 7 digits (10 total)
  const isMobile = /^0[6-8]\d{8}$/.test(digits);
  
  // Landline: 0[1-5] followed by 8 digits (10 total)
  const isLandline = /^0[1-5]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

