import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Palestinian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 05 (059, 056, 057)
 * - Landline: 9-10 digits with area codes (02 for Jerusalem, 04 for Gaza, etc.)
 * - Handles international format (+970 prefix) and 00970 prefix
 *
 * @example
 * validatePS("059 123 4567") // { isValid: true }
 * validatePS("02 123 4567") // { isValid: true }
 */
export const validatePS: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00970") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("970") && digits.length >= 12) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Palestine",
      }),
      details: { country: "Palestine" },
    };
  }

  // Mobile: 05 followed by 8 digits (10 total)
  // Mobile prefixes: 059, 056, 057
  if (digits.startsWith("05")) {
    const mobilePrefix = digits.slice(0, 3);
    const validMobilePrefixes = ["059", "056", "057"];
    
    if (validMobilePrefixes.includes(mobilePrefix)) {
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
    
    // If it's 05 but not a valid prefix, check length first
    if (digits.length === 10) {
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

  // Landline: 0 + area code (1-2 digits) + subscriber (6-7 digits) = 9-10 total
  // Area codes: 02 (Jerusalem), 04 (Gaza), 09 (Nablus), etc.
  if (digits.length >= 9 && digits.length <= 10) {
    if (/^0[2-9]\d{7,9}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Palestine",
    }),
    details: { country: "Palestine" },
  };
};

