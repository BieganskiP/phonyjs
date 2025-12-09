import { PhoneValidator } from "../types";

/**
 * Validates US phone numbers.
 *
 * Rules:
 * - Must be 10 digits (or 11 if starting with '1')
 * - Area code (first 3 digits) cannot start with 0 or 1
 * - Exchange code (next 3 digits) cannot start with 0 or 1
 * - Non-digit characters are stripped before validation
 *
 * @example
 * validateUS("212 456 7890") // true
 * validateUS("1-212-456-7890") // true
 * validateUS("123 456 7890") // false (area code starts with 1)
 */
export const validateUS: PhoneValidator = (phone) => {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("1") ? digits.slice(1) : digits;
  return /^[2-9][0-9]{2}[2-9][0-9]{6}$/.test(normalized);
};
