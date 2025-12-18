import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Kiribati phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +686
 * - Format: 8 digits
 * - Mobile: starts with 3, 6, 7, 9
 * - Landline: starts with 2, 3, 4, 5, 8
 * - Handles international format (+686 prefix) and 00686 prefix
 *
 * @example
 * validateKI("7212 3456") // { isValid: true }
 * validateKI("3012 3456") // { isValid: true }
 * validateKI("+686 7212 3456") // { isValid: true }
 */
export const validateKI: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00686") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("686") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (!/^[2-9]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Kiribati",
        type: "phone",
      }),
      details: { country: "Kiribati", type: "phone" },
    };
  }

  return { isValid: true };
};




