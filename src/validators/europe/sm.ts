import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates San Marinese phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 6 digits (excluding country code)
 * - No area codes, all numbers are national
 * - Handles international format (+378 prefix) and 00378 prefix
 *
 * @example
 * validateSM("123 456") // { isValid: true }
 * validateSM("0549 88 88 88") // { isValid: true }
 */
export const validateSM: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00378") && digits.length >= 11) {
    digits = digits.slice(5);
  } else if (digits.startsWith("378") && digits.length >= 9) {
    digits = digits.slice(3);
  }

  // Check length (exactly 6 digits, but "0549 88 88 88" = 10 digits is also valid)
  // "0549 88 88 88" might be an Italian format number (San Marino uses Italian numbering)
  if (digits.length === 6) {
    return { isValid: true };
  }

  // Accept 10 digits (Italian format: 0549 + 6 digits)
  if (digits.length === 10 && digits.startsWith("0549")) {
    return { isValid: true };
  }

  if (digits.length < 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "6 or 10",
        got: digits.length,
      }),
      details: { expected: "6 or 10", got: digits.length },
    };
  }

  if (digits.length > 10 || (digits.length > 6 && digits.length < 10)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "6 or 10",
        got: digits.length,
      }),
      details: { expected: "6 or 10", got: digits.length },
    };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "San Marino",
    }),
    details: { country: "San Marino" },
  };
};

