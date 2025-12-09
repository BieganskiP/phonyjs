import { PhoneValidator } from "../types";

/**
 * Validates Canadian phone numbers.
 * 
 * Rules:
 * - Follows North American Numbering Plan (NANP)
 * - Must be 10 digits (or 11 if starting with '1')
 * - Area code (first 3 digits) cannot start with 0 or 1
 * - Exchange code (next 3 digits) cannot start with 0 or 1
 * - Non-digit characters are stripped before validation
 * - Handles international format (+1 prefix)
 * 
 * Note: Canada uses the same numbering system as the United States.
 * 
 * @example
 * validateCA("416 123 4567") // true
 * validateCA("604-555-1234") // true
 * validateCA("+1 416 123 4567") // true
 * validateCA("1-514-555-0123") // true
 */
export const validateCA: PhoneValidator = (phone) => {
  const digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+1)
  const normalized = digits.startsWith("1") ? digits.slice(1) : digits;
  
  // Must be 10 digits with NANP rules:
  // - Area code (NPA) starts with 2-9
  // - Exchange code (NXX) starts with 2-9
  return /^[2-9][0-9]{2}[2-9][0-9]{6}$/.test(normalized);
};

