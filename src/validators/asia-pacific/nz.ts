import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates New Zealand phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 02X (020, 021, 022, 027, 028, 029)
 * - Landline: 8-9 digits starting with 0A (area code) + BBB BBBB
 * - Area codes: 03 (South Island), 04 (Wellington), 06 (Taranaki/Manawatu), 07 (Bay of Plenty), 09 (Auckland)
 * - Handles international format (+64 prefix) and 0064 prefix
 *
 * @example
 * validateNZ("021 123 4567") // { isValid: true }
 * validateNZ("03 123 4567") // { isValid: true }
 */
export const validateNZ: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0064") && digits.length >= 12) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("64") && digits.length >= 10) {
    digits = "0" + digits.slice(2);
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "New Zealand",
      }),
      details: { country: "New Zealand" },
    };
  }

  // Mobile: 02X XXX XXXX (10 digits total)
  if (digits.startsWith("02")) {
    const validMobilePrefixes = ["020", "021", "022", "027", "028", "029"];
    const mobilePrefix = digits.slice(0, 3);

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

  // Landline: 0A BBB BBBB (8-9 digits total)
  // Area codes: 03, 04, 06, 07, 09
  if (digits.length >= 8 && digits.length <= 9) {
    const areaCode = digits.slice(0, 2);
    const validAreaCodes = ["03", "04", "06", "07", "09"];

    if (validAreaCodes.includes(areaCode)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "New Zealand",
    }),
    details: { country: "New Zealand" },
  };
};

