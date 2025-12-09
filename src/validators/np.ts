import { PhoneValidator } from "../types";

/**
 * Validates Nepali phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 97, 98
 * - Landline: 10 digits with area codes (e.g., 01-Kathmandu, 061-Pokhara)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+977 prefix)
 * 
 * Mobile prefixes: 97x, 98x
 * Major area codes:
 * - 01: Kathmandu
 * - 061: Pokhara
 * - 021: Biratnagar
 * 
 * @example
 * validateNP("9841 234 567") // true (mobile)
 * validateNP("01 234 5678") // true (landline - Kathmandu)
 * validateNP("+977 9841 234 567") // true (international mobile)
 * validateNP("+977 1 234 5678") // true (international landline)
 */
export const validateNP: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+977)
  if (digits.startsWith("977")) {
    const remaining = digits.slice(3);
    // If remaining starts with 9, it's a mobile (keep as is)
    // Otherwise add leading 0 for landline
    digits = remaining.startsWith("9") ? remaining : "0" + remaining;
  }
  
  // Nepali numbers: 9-10 digits (mobile with leading 9, landline with leading 0)
  if (!/^[09]\d{8,9}$/.test(digits)) {
    return false;
  }
  
  // Mobile: 9[7-8]x followed by 7 digits (10 total, no leading 0)
  const isMobile = /^9[7-8]\d{8}$/.test(digits);
  
  // Landline: 0[1-9] followed by 7-8 digits (9-10 total with leading 0)
  const isLandline = /^0[1-9]\d{7,8}$/.test(digits);
  
  return isMobile || isLandline;
};

