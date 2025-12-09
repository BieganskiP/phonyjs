import { PhoneValidator } from "../types";

/**
 * Validates Kenyan phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 07xx or 01xx
 * - Landline: 10 digits with area codes (e.g., 020-Nairobi, 041-Mombasa)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+254 prefix)
 * 
 * Mobile prefixes: 070-079, 010-019
 * Major area codes:
 * - 020: Nairobi
 * - 041: Mombasa
 * - 051: Nakuru
 * 
 * @example
 * validateKE("0712 345 678") // true (mobile)
 * validateKE("020 123 4567") // true (landline - Nairobi)
 * validateKE("+254 712 345 678") // true (international mobile)
 * validateKE("+254 20 123 4567") // true (international landline)
 */
export const validateKE: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+254)
  if (digits.startsWith("254")) {
    digits = "0" + digits.slice(3);
  }
  
  // Kenyan numbers: 10 digits starting with 0
  if (!/^0\d{9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 07xx or 01xx followed by 7 digits (10 total)
  const isMobile = /^0[17]\d{8}$/.test(digits);
  
  // Landline: 0[2-6] followed by 8 digits (10 total)
  const isLandline = /^0[2-6]\d{8}$/.test(digits);
  
  return isMobile || isLandline;
};

