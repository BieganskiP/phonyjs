import { PhoneValidator } from "../types";

/**
 * Validates Iraqi phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10 digits starting with 7
 * - Landline: 9-10 digits with area codes (e.g., 1 for Baghdad)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+964 prefix)
 * 
 * Mobile carriers:
 * - 7xxx xxx xxx: Various carriers (Zain, Asiacell, Korek)
 * 
 * Major area codes:
 * - 1: Baghdad
 * - 30: Najaf
 * - 40: Basra
 * - 50: Erbil
 * - 60: Mosul
 * 
 * @example
 * validateIQ("7812 345 678") // true (mobile)
 * validateIQ("1 234 5678") // true (landline - Baghdad)
 * validateIQ("+964 7812 345 678") // true (international mobile)
 * validateIQ("30 234 5678") // true (landline - Najaf)
 */
export const validateIQ: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+964)
  if (digits.startsWith("964")) {
    digits = digits.slice(3);
  }
  
  // Mobile: 7 followed by 9 digits (10 total)
  const isMobile = /^7\d{9}$/.test(digits);
  
  // Landline: specific area codes followed by remaining digits
  // 1-digit codes: 1 (Baghdad), 2-6 (other regions)
  // 2-digit codes: 30-69 (various cities)
  // Total: 9-10 digits
  const isLandline = /^([1-6]\d{8}|[1-6]\d{7})$/.test(digits);
  
  return isMobile || isLandline;
};

