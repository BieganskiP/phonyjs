import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Generic phone number validator for countries without specific rules.
 *
 * This provides basic validation when a country-specific validator is not available.
 *
 * Rules:
 * - Must contain between 7 and 15 digits (international standard)
 * - Non-digit characters are stripped before validation
 * - Cannot be all zeros
 * - Must have at least one non-zero digit
 *
 * Note: This is a fallback validator and may accept invalid numbers.
 * For production use, implement country-specific validators.
 *
 * @example
 * validateGeneric("1234567") // true (7 digits)
 * validateGeneric("123 456 7890") // true (10 digits)
 * validateGeneric("12345678901234") // true (14 digits)
 * validateGeneric("123456") // false (too short)
 * validateGeneric("1234567890123456") // false (too long)
 * validateGeneric("0000000") // false (all zeros)
 */
export const validateGeneric: PhoneValidator = (
  phone: string
): ValidationResult => {
  const digits = phone.replace(/\D/g, "");

  // Must be between 7 and 15 digits (E.164 international standard)
  if (digits.length < 7 || digits.length > 15) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  // Cannot be all zeros
  if (/^0+$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT),
      details: { country: "Generic" },
    };
  }

  return { isValid: true };
};
