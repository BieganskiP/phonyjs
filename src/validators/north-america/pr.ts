import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Puerto Rico phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 787 or 939
 * - Mobile and landline use same format: 787/939-XXX-XXXX
 * - Handles international format (+1-787/939 prefix) and 001787/939 prefix
 * - Total length with area code: 10 digits (1-787-XXX-XXXX)
 *
 * Area codes: 787, 939
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validatePR("787 123 4567") // { isValid: true } - Standard format
 * validatePR("1 939 123 4567") // { isValid: true } - With country code
 * validatePR("+1 787 123 4567") // { isValid: true } - International format
 * validatePR("787 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validatePR: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");
  let areaCode = "";

  // Handle international formats and extract area code
  if (digits.startsWith("001")) {
    const potentialAreaCode = digits.slice(3, 6);
    if (["787", "939"].includes(potentialAreaCode)) {
      areaCode = potentialAreaCode;
      digits = digits.slice(6);
    } else if (digits.length >= 6) {
      areaCode = potentialAreaCode;
      digits = digits.slice(6);
    }
  } else if (digits.startsWith("1")) {
    const potentialAreaCode = digits.slice(1, 4);
    if (["787", "939"].includes(potentialAreaCode)) {
      areaCode = potentialAreaCode;
      digits = digits.slice(4);
    } else if (digits.length >= 4) {
      areaCode = potentialAreaCode;
      digits = digits.slice(4);
    }
  } else if (digits.length >= 10) {
    // If we have 10+ digits, assume first 3 are area code
    areaCode = digits.slice(0, 3);
    digits = digits.slice(3);
  }

  // Check length - Puerto Rico numbers are 7 digits after area code
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7",
        got: digits.length,
      }),
      details: { expected: "7", got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7",
        got: digits.length,
      }),
      details: { expected: "7", got: digits.length },
    };
  }

  // If area code was provided, validate it
  if (areaCode && !["787", "939"].includes(areaCode)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_AREA_CODE,
      message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
        areaCode,
        country: "Puerto Rico",
      }),
      details: { areaCode, country: "Puerto Rico" },
    };
  }

  // Validate Puerto Rico phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Puerto Rico",
      }),
      details: { country: "Puerto Rico" },
    };
  }

  return { isValid: true };
};


