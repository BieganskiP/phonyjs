import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Laotian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 020 (020-XXXXXXX)
 * - Landline: 8-9 digits with area codes (021 XXX XXXX)
 * - Mobile prefix: 020
 * - Handles international format (+856 prefix) and 00856 prefix
 *
 * @example
 * validateLA("020 123 4567") // { isValid: true }
 * validateLA("021 123 4567") // { isValid: true }
 */
export const validateLA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00856")) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("856")) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Laos",
      }),
      details: { country: "Laos" },
    };
  }

  // Mobile: 020-XXXXXXX (10 digits total)
  if (digits.startsWith("020")) {
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

  // Landline: 021 XXX XXXX (8-10 digits total)
  if (digits.length >= 8 && digits.length <= 10) {
    // Area codes: 021 (Vientiane), 023, 030, 031, etc.
    if (/^0[2-9]\d{6,8}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Laos",
    }),
    details: { country: "Laos" },
  };
};

