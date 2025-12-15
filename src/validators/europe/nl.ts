import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Dutch (Netherlands) phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 06
 * - Landline: 9 digits starting with 01-05 (area codes)
 * - Common area codes: 010 (Rotterdam), 020 (Amsterdam), 030 (Utrecht), 040 (Eindhoven)
 * - Handles international format (+31 prefix) and 0031 prefix
 *
 * @example
 * validateNL("06 1234 5678") // { isValid: true }
 * validateNL("09 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateNL: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats
  if (digits.startsWith("0031") && digits.length >= 13) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("31") && digits.length >= 11) {
    digits = "0" + digits.slice(2);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Netherlands",
      }),
      details: { country: "Netherlands" },
    };
  }

  // Mobile: 06 + 8 digits
  // Landline: 0[1-5] + 8 digits
  if (!/^0[1-6]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Netherlands",
      }),
      details: { country: "Netherlands" },
    };
  }

  return { isValid: true };
};
