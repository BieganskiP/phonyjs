import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

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
  let hasCountryCode = false;

  // Handle international formats
  // Saudi numbers in international format don't include the leading 0
  // So +966 512345678 should be accepted as 512345678 (9 digits)
  // But local format 0501234567 should still be accepted (10 digits with leading 0)
  if (digits.startsWith("00966") && digits.length >= 12) {
    digits = digits.slice(5);
    hasCountryCode = true;
    // Remove leading 0 if present (some people incorrectly include it)
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }
  } else if (digits.startsWith("966") && digits.length >= 10) {
    digits = digits.slice(3);
    hasCountryCode = true;
    // Remove leading 0 if present (some people incorrectly include it)
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }
  }

  // Check length
  // With country code: 9 digits (without leading 0)
  // Without country code: 10 digits (with leading 0)
  const expectedLength = hasCountryCode ? 9 : 10;
  if (digits.length < expectedLength) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: expectedLength,
        got: digits.length,
      }),
      details: { expected: expectedLength, got: digits.length },
    };
  }

  if (digits.length > expectedLength) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: expectedLength,
        got: digits.length,
      }),
      details: { expected: expectedLength, got: digits.length },
    };
  }

  // If no country code, must start with 0
  if (!hasCountryCode && !digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Saudi Arabia",
      }),
      details: { country: "Saudi Arabia" },
    };
  }

  // Mobile validation
  if (hasCountryCode) {
    // With country code: 9 digits starting with 5
    if (digits.startsWith("5")) {
      const mobilePrefix = digits.slice(0, 2);
      const validMobilePrefixes = ["50", "53", "54", "55", "56", "58", "59"];

      if (!validMobilePrefixes.includes(mobilePrefix)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
          message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
            validPrefixes: validMobilePrefixes.map((p) => "5" + p[1]),
            got: mobilePrefix,
          }),
          details: {
            validPrefixes: validMobilePrefixes.map((p) => "5" + p[1]),
            got: mobilePrefix,
          },
        };
      }

      if (!/^5[0345689]\d{7}$/.test(digits)) {
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

    // Landline with country code: 9 digits starting with 1
    if (digits.startsWith("1")) {
      const areaCode = digits.slice(0, 2);
      const validAreaCodes = ["11", "12", "13", "14", "16", "17"];

      if (!validAreaCodes.includes(areaCode)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_AREA_CODE,
          message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
            code: "0" + areaCode,
            reason: "must be 011, 012, 013, 014, 016, or 017",
          }),
          details: {
            code: "0" + areaCode,
            validCodes: validAreaCodes.map((c) => "0" + c),
            reason: "must be 011, 012, 013, 014, 016, or 017",
          },
        };
      }

      if (!/^1[1-7]\d{7}$/.test(digits)) {
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
  } else {
    // Local format: 10 digits with leading 0
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
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: hasCountryCode
        ? ["5 (mobile)", "1 (landline)"]
        : ["05 (mobile)", "01 (landline)"],
      country: "Saudi Arabia",
    }),
    details: {
      validPrefixes: hasCountryCode
        ? ["5 (mobile)", "1 (landline)"]
        : ["05 (mobile)", "01 (landline)"],
      country: "Saudi Arabia",
    },
  };
};
