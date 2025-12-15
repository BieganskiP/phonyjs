import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Serbian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits (excluding country code)
 * - Mobile numbers start with 06
 * - Landline numbers start with area codes (011 for Belgrade, etc.)
 * - Handles international format (+381 prefix) and 00381 prefix
 *
 * @example
 * validateRS("011 234 5678") // { isValid: true }
 * validateRS("061 234 5678") // { isValid: true }
 */
export const validateRS: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00381") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("381") && digits.length >= 12) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Serbia",
      }),
      details: { country: "Serbia" },
    };
  }

  // Check length (9 digits after leading 0, 10 total)
  if (digits.length !== 10) {
    return {
      isValid: false,
      errorCode: digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 10,
          got: digits.length,
        }
      ),
      details: { expected: 10, got: digits.length },
    };
  }

  // Must be 0 followed by 9 digits
  if (!/^0\d{9}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Serbia",
      }),
      details: { country: "Serbia" },
    };
  }

  return { isValid: true };
};

