import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates South Korean phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10-11 digits starting with 010
 * - Landline: 9-11 digits with area codes (02-Seoul, 031-Gyeonggi, 051-Busan, etc.)
 * - Handles international format (+82 prefix) and 0082 prefix
 *
 * Mobile format: 010-XXXX-XXXX or 010-XXX-XXXX
 * Major area codes: 02 (Seoul), 031 (Gyeonggi), 032 (Incheon), 051 (Busan)
 *
 * @example
 * validateKR("010 1234 5678") // { isValid: true }
 * validateKR("020 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateKR: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats (+82)
  if (digits.startsWith("0082")) {
    // Mobile: +82 10 -> 010
    if (
      digits.length >= 14 &&
      digits.charAt(4) === "1" &&
      digits.charAt(5) === "0"
    ) {
      digits = "0" + digits.slice(4);
    }
    // Landline: +82 2 -> 02 (Seoul doesn't have middle 0)
    else if (digits.length >= 13) {
      digits = "0" + digits.slice(4);
    }
  } else if (digits.startsWith("82")) {
    // Mobile: +82 10 -> 010
    if (
      digits.length >= 12 &&
      digits.charAt(2) === "1" &&
      digits.charAt(3) === "0"
    ) {
      digits = "0" + digits.slice(2);
    }
    // Landline: +82 2 -> 02 (Seoul doesn't have middle 0)
    else if (digits.length >= 11) {
      digits = "0" + digits.slice(2);
    }
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "South Korea",
      }),
      details: { country: "South Korea" },
    };
  }

  // Mobile: 010 + 7-8 digits (10-11 total)
  if (digits.startsWith("010")) {
    if (digits.length < 10 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "10-11", got: digits.length, type: "mobile" }
        ),
        details: { expected: "10-11", got: digits.length, type: "mobile" },
      };
    }

    if (!/^010\d{7,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "South Korea",
          type: "mobile",
        }),
        details: { country: "South Korea", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-9] + 7-9 digits (9-11 total)
  if (/^0[2-9]/.test(digits)) {
    if (digits.length < 9 || digits.length > 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-11", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-11", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[2-9]\d{6,9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "South Korea",
          type: "landline",
        }),
        details: { country: "South Korea", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["010 (mobile)", "02-09 (landline)"],
      country: "South Korea",
    }),
    details: {
      validPrefixes: ["010 (mobile)", "02-09 (landline)"],
      country: "South Korea",
    },
  };
};
