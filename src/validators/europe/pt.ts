import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Portuguese phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits
 * - Mobile numbers start with 9
 * - Landline numbers start with 2
 * - Handles international format (+351 prefix) and 00351 prefix
 *
 * @example
 * validatePT("912 345 678") // { isValid: true }
 * validatePT("212 345 678") // { isValid: true }
 */
export const validatePT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00351") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("351") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  // Must be 9 digits starting with 2 (landline) or 9 (mobile)
  if (!/^[29]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Portugal",
      }),
      details: { country: "Portugal" },
    };
  }

  return { isValid: true };
};
