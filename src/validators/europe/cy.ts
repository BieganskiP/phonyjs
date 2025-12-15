import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Cyprus phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 9x
 * - Landline: 8 digits starting with 2x
 * - Handles international format (+357 prefix) and 00357 prefix
 *
 * Mobile prefixes: 95-99
 * Landline prefixes: 22-26
 *
 * @example
 * validateCY("96 123 456") // { isValid: true }
 * validateCY("90 123 456") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateCY: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00357") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("357") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  // Mobile: starts with 9[5-9]
  if (digits.startsWith("9")) {
    const mobilePrefix = digits.slice(0, 2);
    const validMobilePrefixes = ["95", "96", "97", "98", "99"];

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

    if (!/^9[5-9]\d{6}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Cyprus",
          type: "mobile",
        }),
        details: { country: "Cyprus", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: starts with 2[2-6]
  if (digits.startsWith("2")) {
    const areaCode = digits.slice(0, 2);
    const validAreaCodes = ["22", "23", "24", "25", "26"];

    if (!validAreaCodes.includes(areaCode)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_AREA_CODE,
        message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
          code: areaCode,
          reason: "must be 22-26",
        }),
        details: {
          code: areaCode,
          validCodes: validAreaCodes,
          reason: "must be 22-26",
        },
      };
    }

    if (!/^2[2-6]\d{6}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Cyprus",
          type: "landline",
        }),
        details: { country: "Cyprus", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["95-99 (mobile)", "22-26 (landline)"],
      country: "Cyprus",
    }),
    details: {
      validPrefixes: ["95-99 (mobile)", "22-26 (landline)"],
      country: "Cyprus",
    },
  };
};
