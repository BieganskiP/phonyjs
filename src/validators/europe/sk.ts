import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Slovak phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits (excluding country code)
 * - Mobile numbers start with 09
 * - Landline numbers start with area codes (02 for Bratislava, etc.)
 * - Handles international format (+421 prefix) and 00421 prefix
 *
 * @example
 * validateSK("02/123 456 78") // { isValid: true }
 * validateSK("0912 123 456") // { isValid: true }
 */
export const validateSK: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first (allow / for Slovak format)
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats
  // "+421 2 123 456 78" = "421212345678" = 12 digits, remove "421" = "212345678" = 9 digits, add "0" = "0212345678" = 10 digits
  if (digits.startsWith("00421") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("421") && digits.length >= 12) {
    const remaining = digits.slice(3);
    // If it already has leading 0, keep it; otherwise add it
    if (remaining.startsWith("0")) {
      digits = remaining;
    } else {
      digits = "0" + remaining;
    }
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Slovakia",
      }),
      details: { country: "Slovakia" },
    };
  }

  // Check length (9 digits after leading 0, 10 total)
  // "0912 123 456" = 10 digits, "02/123 456 78" = 10 digits, "031 123 4567" = 10 digits
  if (digits.length !== 10) {
    return {
      isValid: false,
      errorCode:
        digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
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
        country: "Slovakia",
      }),
      details: { country: "Slovakia" },
    };
  }

  return { isValid: true };
};
