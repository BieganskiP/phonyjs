import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Iranian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 09 (09xx xxxx xxx)
 * - Landline: 10-11 digits with area codes (021 for Tehran, 031 for Isfahan, etc.)
 * - Handles international format (+98 prefix) and 0098 prefix
 *
 * @example
 * validateIR("0912 345 6789") // { isValid: true }
 * validateIR("021 1234 5678") // { isValid: true }
 */
export const validateIR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0098") && digits.length >= 14) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("98") && digits.length >= 12) {
    digits = "0" + digits.slice(2);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Iran",
      }),
      details: { country: "Iran" },
    };
  }

  // Mobile: 09 followed by 9 digits (10 total)
  if (digits.startsWith("09")) {
    if (digits.length === 11) {
      return { isValid: true };
    }
    return {
      isValid: false,
      errorCode: digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 11,
          got: digits.length,
          type: "mobile",
        }
      ),
      details: { expected: 11, got: digits.length, type: "mobile" },
    };
  }

  // Landline: 0 + area code (2-3 digits) + subscriber (6-8 digits) = 10-12 total
  if (digits.length >= 10 && digits.length <= 12) {
    // Area codes: 021 (Tehran), 031 (Isfahan), 041 (Tabriz), etc.
    if (/^0[1-9]\d{8,11}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Iran",
    }),
    details: { country: "Iran" },
  };
};

