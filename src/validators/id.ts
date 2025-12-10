import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Indonesian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10-13 digits starting with 08
 * - Landline: 9-11 digits with area codes (021-Jakarta, 022-Bandung, 031-Surabaya, etc.)
 * - Handles international format (+62 prefix) and 0062 prefix
 *
 * Mobile carriers:
 * - 0811, 0812, 0813, 0821, 0822, 0823: Telkomsel
 * - 0814, 0815, 0816, 0855, 0856, 0857, 0858: Indosat
 * - 0817, 0818, 0819, 0859: XL Axiata
 * - 0895, 0896, 0897, 0898, 0899: 3 (Tri)
 *
 * @example
 * validateID("0812 3456 7890") // { isValid: true }
 * validateID("0712 3456 7890") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateID: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats (+62)
  if (digits.startsWith("0062")) {
    // Mobile: +62 812 -> 0812
    if (digits.length >= 14 && digits.charAt(4) === "8") {
      digits = "0" + digits.slice(4);
    }
    // Landline: +62 21 -> 021
    else if (digits.length >= 13) {
      digits = "0" + digits.slice(4);
    }
  } else if (digits.startsWith("62")) {
    // Mobile: +62 812 -> 0812
    if (digits.length >= 12 && digits.charAt(2) === "8") {
      digits = "0" + digits.slice(2);
    }
    // Landline: +62 21 -> 021
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
        expected: "9-13",
        got: digits.length,
      }),
      details: { expected: "9-13", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 13) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-13",
        got: digits.length,
      }),
      details: { expected: "9-13", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Indonesia",
      }),
      details: { country: "Indonesia" },
    };
  }

  // Mobile: 08 + 8-11 digits (10-13 total)
  if (digits.startsWith("08")) {
    if (digits.length < 10 || digits.length > 13) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "10-13", got: digits.length, type: "mobile" }
        ),
        details: { expected: "10-13", got: digits.length, type: "mobile" },
      };
    }

    if (!/^08\d{8,11}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Indonesia",
          type: "mobile",
        }),
        details: { country: "Indonesia", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-7,9] + area code + number (9-11 digits)
  if (/^0[1-79]/.test(digits)) {
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

    if (!/^0[1-79]\d{7,9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Indonesia",
          type: "landline",
        }),
        details: { country: "Indonesia", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["08 (mobile)", "01-07, 09 (landline)"],
      country: "Indonesia",
    }),
    details: {
      validPrefixes: ["08 (mobile)", "01-07, 09 (landline)"],
      country: "Indonesia",
    },
  };
};
