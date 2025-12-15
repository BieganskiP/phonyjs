import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Romanian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 07x
 * - Landline: 10 digits with area codes (e.g., 021-Bucharest, 0264-Cluj)
 * - Handles international format (+40 prefix) and 0040 prefix
 *
 * Mobile prefixes: 072-079
 * Major area codes:
 * - 021: Bucharest
 * - 0264: Cluj-Napoca
 * - 0256: Timișoara
 * - 0232: Iași
 *
 * @example
 * validateRO("0722 123 456") // { isValid: true }
 * validateRO("0622 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateRO: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0040") && digits.length >= 10) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("40") && digits.length >= 8) {
    digits = "0" + digits.slice(2);
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
        country: "Romania",
      }),
      details: { country: "Romania" },
    };
  }

  // Mobile: 07[2-9] followed by 7 digits (10 total)
  if (digits.startsWith("07")) {
    const mobilePrefix = digits.slice(0, 3);
    if (!/^07[2-9]/.test(mobilePrefix)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
        message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
          validPrefixes: ["072-079"],
          got: mobilePrefix,
        }),
        details: { validPrefixes: ["072-079"], got: mobilePrefix },
      };
    }

    if (!/^07[2-9]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Romania",
          type: "mobile",
        }),
        details: { country: "Romania", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-3] followed by 8 digits (10 total)
  if (/^0[2-3]/.test(digits)) {
    if (!/^0[2-3]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Romania",
          type: "landline",
        }),
        details: { country: "Romania", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["072-079 (mobile)", "02-03 (landline)"],
      country: "Romania",
    }),
    details: {
      validPrefixes: ["072-079 (mobile)", "02-03 (landline)"],
      country: "Romania",
    },
  };
};

