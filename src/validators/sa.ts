import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Saudi Arabian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 05 (050, 053, 054, 055, 056, 058, 059)
 * - Landline: 10 digits with area codes (011-017)
 * - Handles international format (+966 prefix) and 00966 prefix
 *
 * @example
 * validateSA("050 123 4567") // { isValid: true }
 * validateSA("057 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateSA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00966") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("966") && digits.length >= 12) {
    digits = "0" + digits.slice(3);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Saudi Arabia",
      }),
      details: { country: "Saudi Arabia" },
    };
  }

  // Mobile: 05[0345689]
  if (digits.startsWith("05")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = [
      "050",
      "053",
      "054",
      "055",
      "056",
      "058",
      "059",
    ];

    if (!validMobilePrefixes.includes(mobilePrefix)) {
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

    if (!/^05[0345689]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Saudi Arabia",
          type: "mobile",
        }),
        details: { country: "Saudi Arabia", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 01[1-7]
  if (digits.startsWith("01")) {
    const areaCode = digits.slice(0, 3);
    const validAreaCodes = ["011", "012", "013", "014", "016", "017"];

    if (!validAreaCodes.includes(areaCode)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_AREA_CODE,
        message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
          code: areaCode,
          reason: "must be 011, 012, 013, 014, 016, or 017",
        }),
        details: {
          code: areaCode,
          validCodes: validAreaCodes,
          reason: "must be 011, 012, 013, 014, 016, or 017",
        },
      };
    }

    if (!/^01[1-7]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Saudi Arabia",
          type: "landline",
        }),
        details: { country: "Saudi Arabia", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["05 (mobile)", "01 (landline)"],
      country: "Saudi Arabia",
    }),
    details: {
      validPrefixes: ["05 (mobile)", "01 (landline)"],
      country: "Saudi Arabia",
    },
  };
};
