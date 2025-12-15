import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Israeli phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 05 (05x xxx xxxx)
 * - Landline: 9 digits with area codes (02 for Jerusalem, 03 for Tel Aviv, etc.)
 * - Handles international format (+972 prefix) and 00972 prefix
 *
 * @example
 * validateIL("050 123 4567") // { isValid: true }
 * validateIL("02-123-4567") // { isValid: true }
 */
export const validateIL: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00972") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("972") && digits.length >= 12) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Israel",
      }),
      details: { country: "Israel" },
    };
  }

  // Mobile: 05 followed by 8 digits (10 total)
  if (digits.startsWith("05")) {
    if (digits.length === 10) {
      return { isValid: true };
    }
    return {
      isValid: false,
      errorCode: digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 10,
          got: digits.length,
          type: "mobile",
        }
      ),
      details: { expected: 10, got: digits.length, type: "mobile" },
    };
  }

  // Landline: 0 + area code (1-2 digits) + subscriber (6-7 digits) = 9 total
  // Area codes: 02 (Jerusalem), 03 (Tel Aviv), 04 (Haifa), 08 (Beersheba), 09 (Netanya)
  if (digits.length === 9) {
    if (/^0[2-9]\d{7,8}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Israel",
    }),
    details: { country: "Israel" },
  };
};

