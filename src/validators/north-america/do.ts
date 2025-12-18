import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Dominican Republic phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code
 * - Area codes: 809, 829, 849
 * - Mobile and landline use same format: XXX-XXX-XXXX
 * - Handles international format (+1-809/829/849 prefix) and 001809/829/849 prefix
 * - Total length with area code: 10 digits (1-809-XXX-XXXX)
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateDO("809 123 4567") // { isValid: true } - Standard format
 * validateDO("1 829 123 4567") // { isValid: true } - With country code
 * validateDO("+1 849 123 4567") // { isValid: true } - International format
 * validateDO("809 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateDO: PhoneValidator = (phone: string): ValidationResult => {
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
    areaCode = digits.slice(3, 6);
    digits = digits.slice(6);
  } else if (digits.startsWith("1")) {
    areaCode = digits.slice(1, 4);
    digits = digits.slice(4);
  } else if (digits.length >= 10) {
    // If we have 10+ digits, assume first 3 are area code
    areaCode = digits.slice(0, 3);
    digits = digits.slice(3);
  }

  // Check length - Dominican Republic numbers are 7 digits after area code
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
  if (areaCode && !["809", "829", "849"].includes(areaCode)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_AREA_CODE,
      message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
        areaCode,
        country: "Dominican Republic",
      }),
      details: { areaCode, country: "Dominican Republic" },
    };
  }

  // Validate Dominican Republic phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Dominican Republic",
      }),
      details: { country: "Dominican Republic" },
    };
  }

  return { isValid: true };
};
