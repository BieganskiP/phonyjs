import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Armenian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with specific prefixes (e.g., 77, 91, 93, 94, 95, 96, 98, 99)
 * - Landline: 8 digits with area codes (e.g., 10-Yerevan, 231-Gyumri)
 * - Handles international format (+374 prefix) and 00374 prefix
 *
 * Mobile prefixes: 77, 91, 93, 94, 95, 96, 98, 99
 * Major area codes:
 * - 10: Yerevan
 * - 231: Gyumri
 * - 281: Vanadzor
 *
 * @example
 * validateAM("077 123 456") // { isValid: true }
 * validateAM("079 123 456") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateAM: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00374") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("374") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Check length (8-9 digits, leading 0 optional)
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "8-9",
        got: digits.length,
      }),
      details: { expected: "8-9", got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "8-9",
        got: digits.length,
      }),
      details: { expected: "8-9", got: digits.length },
    };
  }

  // Mobile: 77, 9[1,3-6,8-9] followed by 6 digits (8 total) OR with leading 0 (9 total)
  // Check for patterns without leading 0 first
  const mobilePrefixNoZero = digits.slice(0, 2);
  const validMobilePrefixesNoZero = ["77", "91", "93", "94", "95", "96", "98", "99"];

  if (validMobilePrefixesNoZero.includes(mobilePrefixNoZero) && digits.length === 8) {
    if (!/^(77|9[13-689])\d{6}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Armenia",
          type: "mobile",
        }),
        details: { country: "Armenia", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Check for patterns with leading 0
  if (digits.startsWith("0")) {
    const mobilePrefix = digits.slice(1, 3);

    if (validMobilePrefixesNoZero.includes(mobilePrefix) && digits.length === 9) {
      if (!/^0(77|9[13-689])\d{6}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Armenia",
            type: "mobile",
          }),
          details: { country: "Armenia", type: "mobile" },
        };
      }

      return { isValid: true };
    }

    // Landline with leading 0: 0[1-4] followed by 6 digits (8 total) or 7 digits (9 total)
    if (/^0[1-4]/.test(digits) && (digits.length === 8 || digits.length === 9)) {
      if (!/^0[1-4]\d{6,7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Armenia",
            type: "landline",
          }),
          details: { country: "Armenia", type: "landline" },
        };
      }

      return { isValid: true };
    }
  }

  // Landline without leading 0: [1-4] followed by 6-7 digits (8-9 total)
  if (/^[1-4]/.test(digits) && (digits.length === 8 || digits.length === 9)) {
    if (!/^[1-4]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Armenia",
          type: "landline",
        }),
        details: { country: "Armenia", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: [
        "077, 091, 093-096, 098-099 (mobile)",
        "01-04 (landline)",
      ],
      country: "Armenia",
    }),
    details: {
      validPrefixes: [
        "077, 091, 093-096, 098-099 (mobile)",
        "01-04 (landline)",
      ],
      country: "Armenia",
    },
  };
};
