import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Vietnamese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 09XX or 01XX (09XX XXX XXX or 01XX XXX XXX)
 * - Landline: 10-11 digits with area codes (0XX XXX XXXX or 0XXX XX XXXX)
 * - Mobile prefixes: 090, 091, 092, 093, 094, 096, 097, 098, 099, 032, 033, 034, 035, 036, 037, 038, 039, 070, 076, 077, 078, 079, 081, 082, 083, 084, 085, 086, 088, 089
 * - Handles international format (+84 prefix) and 0084 prefix
 *
 * @example
 * validateVN("0912 345 678") // { isValid: true }
 * validateVN("024 1234 5678") // { isValid: true }
 */
export const validateVN: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0084") && digits.length >= 13) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("84") && digits.length >= 11) {
    digits = "0" + digits.slice(2);
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Vietnam",
      }),
      details: { country: "Vietnam" },
    };
  }

  // Mobile: 09XX XXX XXX or 01XX XXX XXX (10 digits total)
  if (digits.startsWith("09") || digits.startsWith("01")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = [
      "090", "091", "092", "093", "094", "096", "097", "098", "099",
      "032", "033", "034", "035", "036", "037", "038", "039",
      "070", "076", "077", "078", "079",
      "081", "082", "083", "084", "085", "086", "088", "089"
    ];

    // Check if prefix is valid and the 4th digit is not 0 (for 09XX format)
    if (validMobilePrefixes.includes(mobilePrefix)) {
      // Reject invalid prefixes like 0900, 0150
      if (digits.startsWith("0900") || digits.startsWith("0150")) {
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
  }

  // Landline: 0XX XXX XXXX or 0XXX XX XXXX (10-11 digits total)
  if (digits.length >= 10 && digits.length <= 11) {
    // Area codes: 2-digit (Hanoi 024, Ho Chi Minh 028) or 3-digit
    if (/^0[2-9]\d{8,9}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Vietnam",
    }),
    details: { country: "Vietnam" },
  };
};

