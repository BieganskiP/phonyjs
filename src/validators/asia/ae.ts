import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates UAE (United Arab Emirates) phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 050, 052, 054, 055, 056, or 058 (0 + mobile prefix + 7-digit local number)
 * - Landline: 9 digits with area codes (02-Abu Dhabi, 03-Al Ain, 04-Dubai, 06-Sharjah/Ajman/UAQ, 07-Ras Al Khaimah, 09-Fujairah)
 * - Handles international format (+971 prefix) and 00971 prefix
 *
 * Mobile carriers:
 * - Etisalat: 050, 052, 056
 * - du: 054, 055, 058
 *
 * @example
 * validateAE("050 123 4567") // { isValid: true }
 * validateAE("04 123 4567") // { isValid: true }
 * validateAE("057 123 4567") // { isValid: false, errorCode: "INVALID_MOBILE_PREFIX", ... }
 */
export const validateAE: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");
  let hasCountryCode = false;

  // Handle international formats
  // UAE numbers in international format don't include the leading 0
  // So +971 501234567 should be accepted as 501234567 (9 digits)
  // But local format 0501234567 should still be accepted (10 digits with leading 0)
  if (digits.startsWith("00971") && digits.length >= 13) {
    digits = digits.slice(5);
    hasCountryCode = true;
    // Remove leading 0 if present (some people incorrectly include it)
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }
  } else if (digits.startsWith("971") && digits.length >= 11) {
    digits = digits.slice(3);
    hasCountryCode = true;
    // Remove leading 0 if present (some people incorrectly include it)
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }
  }

  // Check length
  // With country code: 9 digits (mobile) or 8 digits (landline) without leading 0
  // Without country code: 10 digits (mobile) or 9 digits (landline) with leading 0
  const minLength = hasCountryCode ? 8 : 9;
  const maxLength = hasCountryCode ? 9 : 10;
  if (digits.length < minLength) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: hasCountryCode ? "8-9" : "9-10",
        got: digits.length,
      }),
      details: { expected: hasCountryCode ? "8-9" : "9-10", got: digits.length },
    };
  }

  if (digits.length > maxLength) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: hasCountryCode ? "8-9" : "9-10",
        got: digits.length,
      }),
      details: { expected: hasCountryCode ? "8-9" : "9-10", got: digits.length },
    };
  }

  // If no country code, must start with 0
  if (!hasCountryCode && !digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, { country: "UAE" }),
      details: { country: "UAE" },
    };
  }

  // Mobile validation
  if (hasCountryCode) {
    // With country code: 9 digits starting with 5
    if (digits.startsWith("5") && digits.length === 9) {
      const mobilePrefix = digits.slice(0, 2);
      const validMobilePrefixes = ["50", "52", "54", "55", "56", "58"];

      if (!validMobilePrefixes.includes(mobilePrefix)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
          message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
            validPrefixes: validMobilePrefixes.map((p) => "5" + p[1]),
            got: mobilePrefix,
          }),
          details: { validPrefixes: validMobilePrefixes.map((p) => "5" + p[1]), got: mobilePrefix },
        };
      }

      if (!/^5[024568]\d{7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "UAE",
            type: "mobile",
          }),
          details: { country: "UAE", type: "mobile" },
        };
      }

      return { isValid: true };
    }

    // Landline with country code: 8 digits starting with 2, 3, 4, 6, 7, or 9
    if (/^[2-4679]/.test(digits) && digits.length === 8) {
      if (!/^[2-4679]\d{7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "UAE",
            type: "landline",
          }),
          details: { country: "UAE", type: "landline" },
        };
      }

      return { isValid: true };
    }
  } else {
    // Local format: 9-10 digits with leading 0
    // Mobile: 05[024568] + 7 digits (10 total)
    if (digits.startsWith("05")) {
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
      const validMobilePrefixes = ["050", "052", "054", "055", "056", "058"];

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

      if (!/^05[024568]\d{7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "UAE",
            type: "mobile",
          }),
          details: { country: "UAE", type: "mobile" },
        };
      }

      return { isValid: true };
    }

    // Landline: 0[2-4679] + 7 digits (9 total)
    if (/^0[2-4679]/.test(digits)) {
      if (digits.length !== 9) {
        return {
          isValid: false,
          errorCode:
            digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          message: getMessage(
            digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
            { expected: 9, got: digits.length, type: "landline" }
          ),
          details: { expected: 9, got: digits.length, type: "landline" },
        };
      }

      if (!/^0[2-4679]\d{7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "UAE",
            type: "landline",
          }),
          details: { country: "UAE", type: "landline" },
        };
      }

      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: hasCountryCode
        ? [
            "5 (mobile)",
            "2 (Abu Dhabi)",
            "3 (Al Ain)",
            "4 (Dubai)",
            "6 (Sharjah)",
            "7 (RAK)",
            "9 (other)",
          ]
        : [
            "05 (mobile)",
            "02 (Abu Dhabi)",
            "03 (Al Ain)",
            "04 (Dubai)",
            "06 (Sharjah)",
            "07 (RAK)",
            "09 (other)",
          ],
      country: "UAE",
    }),
    details: {
      validPrefixes: hasCountryCode
        ? [
            "5 (mobile)",
            "2 (Abu Dhabi)",
            "3 (Al Ain)",
            "4 (Dubai)",
            "6 (Sharjah)",
            "7 (RAK)",
            "9 (other)",
          ]
        : [
            "05 (mobile)",
            "02 (Abu Dhabi)",
            "03 (Al Ain)",
            "04 (Dubai)",
            "06 (Sharjah)",
            "07 (RAK)",
            "09 (other)",
          ],
      country: "UAE",
    },
  };
};
