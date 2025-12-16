import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Cambodian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 0XX (0XX-XXXXXXX)
 * - Mobile prefixes: 010, 011, 012, 013, 014, 015, 016, 017, 018, 069, 070, 071, 077, 078, 079, 081, 085, 086, 087, 088, 089, 092, 093, 095, 096, 097, 098, 099
 * - Handles international format (+855 prefix) and 00855 prefix
 *
 * @example
 * validateKH("012 345 678") // { isValid: true }
 * validateKH("+855 12 345 678") // { isValid: true }
 */
export const validateKH: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00855")) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("855")) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Cambodia",
      }),
      details: { country: "Cambodia" },
    };
  }

  // Mobile: 0XX-XXXXXXX (9 digits total)
  const mobilePrefix = digits.slice(0, 3);
  const validMobilePrefixes = [
    "010", "011", "012", "013", "014", "015", "016", "017", "018",
    "069", "070", "071", "077", "078", "079",
    "081", "085", "086", "087", "088", "089",
    "092", "093", "095", "096", "097", "098", "099"
  ];

  if (validMobilePrefixes.includes(mobilePrefix)) {
    if (digits.length === 9) {
      return { isValid: true };
    }
    return {
      isValid: false,
      errorCode: digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 9,
          got: digits.length,
          type: "mobile",
        }
      ),
      details: { expected: 9, got: digits.length, type: "mobile" },
    };
  }

  if (digits.length === 9) {
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
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Cambodia",
    }),
    details: { country: "Cambodia" },
  };
};

