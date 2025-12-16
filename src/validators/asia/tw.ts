import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Taiwanese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 09XX (09XX-XXX-XXX)
 * - Landline: 9-10 digits with area codes (0X XXXX XXXX or 0XX XXX XXXX)
 * - Mobile prefixes: 091, 092, 093, 095, 096, 097, 098, 099
 * - Area codes: 02 (Taipei), 03 (Taoyuan), 04 (Taichung), 06 (Tainan), 07 (Kaohsiung)
 * - Handles international format (+886 prefix) and 00886 prefix
 *
 * @example
 * validateTW("0912 345 678") // { isValid: true }
 * validateTW("02 1234 5678") // { isValid: true }
 */
export const validateTW: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00886") && digits.length >= 13) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("886") && digits.length >= 12) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Taiwan",
      }),
      details: { country: "Taiwan" },
    };
  }

  // Mobile: 09XX-XXX-XXX (10 digits total)
  if (digits.startsWith("09")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["091", "092", "093", "095", "096", "097", "098", "099"];

    if (validMobilePrefixes.includes(mobilePrefix)) {
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

    if (digits.length === 10) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
        message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
          validPrefixes: validMobilePrefixes,
          got: mobilePrefix,
        }),
        details: { validPrefixes: validMobilePrefixes, got: mobilePrefix },
      };
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

  // Landline: 0X XXXX XXXX or 0XX XXX XXXX (9-10 digits total)
  if (digits.length >= 9 && digits.length <= 10) {
    // Area codes: 1-digit (02 for Taipei) or 2-digit (03, 04, 06, 07, etc.)
    if (/^0[2-9]\d{7,8}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Taiwan",
    }),
    details: { country: "Taiwan" },
  };
};

