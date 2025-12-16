import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Myanmar phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 09XX (09XX-XXXXXXX)
 * - Landline: 9-10 digits with area codes (0XX XXX XXXX or 0XXX XX XXXX)
 * - Mobile prefixes: 092, 094, 095, 096, 097, 098, 099
 * - Handles international format (+95 prefix) and 0095 prefix
 *
 * @example
 * validateMM("09212 345678") // { isValid: true }
 * validateMM("01 123 4567") // { isValid: true }
 */
export const validateMM: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0095")) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("95")) {
    digits = "0" + digits.slice(2);
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Myanmar",
      }),
      details: { country: "Myanmar" },
    };
  }

  // Mobile: 09XX-XXXXXXX (11 digits total)
  if (digits.startsWith("09")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["092", "094", "095", "096", "097", "098", "099"];

    if (validMobilePrefixes.includes(mobilePrefix)) {
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

    if (digits.length === 11) {
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

  // Landline: 0XX XXX XXXX or 0XXX XX XXXX (9-10 digits total)
  if (digits.length >= 9 && digits.length <= 10) {
    if (/^0[1-9]\d{7,8}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Myanmar",
    }),
    details: { country: "Myanmar" },
  };
};

