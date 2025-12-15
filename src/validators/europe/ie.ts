import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Irish phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 8 (08x)
 * - Landline: 9-10 digits with area codes (01-Dublin, 021-Cork, etc.)
 * - Handles international format (+353 prefix) and 00353 prefix
 *
 * Mobile prefixes: 083, 085, 086, 087, 089
 * Major area codes:
 * - 01: Dublin
 * - 021: Cork
 * - 091: Galway
 * - 061: Limerick
 *
 * @example
 * validateIE("087 123 4567") // { isValid: true }
 * validateIE("080 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateIE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00353") && digits.length >= 11) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("353") && digits.length >= 9) {
    digits = "0" + digits.slice(3);
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Ireland",
      }),
      details: { country: "Ireland" },
    };
  }

  // Mobile: 08[3-9] followed by 7 digits (10 total)
  if (digits.startsWith("08")) {
    if (digits.length !== 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 10, got: digits.length, type: "mobile" }
        ),
        details: { expected: 10, got: digits.length, type: "mobile" },
      };
    }

    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["083", "085", "086", "087", "089"];

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

    if (!/^08[3-9]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Ireland",
          type: "mobile",
        }),
        details: { country: "Ireland", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-7,9] (not 08) followed by 6-8 digits (9-10 total)
  // Valid area codes: 01, 021-029, 041-049, 051-059, 061-069, 071, 090-099 (but not all 09X are valid)
  if (/^0[1-79]/.test(digits)) {
    if (digits.length < 9 || digits.length > 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-10", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-10", got: digits.length, type: "landline" },
      };
    }

    // Check for invalid area codes (097 is not valid, 090-096, 098, 099 are valid)
    const areaCode = digits.slice(0, 3);
    if (areaCode === "097") {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_PREFIX,
        message: getMessage(ErrorCodes.INVALID_PREFIX, {
          validPrefixes: ["01, 021-029, 041-049, 051-059, 061-069, 071, 090-096, 098-099 (landline)"],
          got: areaCode,
        }),
        details: {
          validPrefixes: ["01, 021-029, 041-049, 051-059, 061-069, 071, 090-096, 098-099"],
          got: areaCode,
        },
      };
    }

    if (!/^0[1-79]\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Ireland",
          type: "landline",
        }),
        details: { country: "Ireland", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["083, 085-087, 089 (mobile)", "01-07, 09 (landline)"],
      country: "Ireland",
    }),
    details: {
      validPrefixes: ["083, 085-087, 089 (mobile)", "01-07, 09 (landline)"],
      country: "Ireland",
    },
  };
};

