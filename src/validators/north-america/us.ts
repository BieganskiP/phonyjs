import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates US phone numbers with detailed error messages.
 *
 * Rules:
 * - Must be 10 digits (or 11 if starting with '1')
 * - Area code (first 3 digits) cannot start with 0 or 1
 * - Exchange code (next 3 digits) cannot start with 0 or 1
 * - Non-digit characters are stripped before validation
 * - Handles international format (+1 prefix) and 001 prefix
 *
 * @example
 * validateUS("212 456 7890") // { isValid: true }
 * validateUS("123") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateUS: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001") && digits.length >= 11) {
    digits = digits.slice(3);
  } else if (digits.startsWith("1") && digits.length === 11) {
    digits = digits.slice(1);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Extract codes
  const areaCode = digits.slice(0, 3);
  const exchangeCode = digits.slice(3, 6);

  // Check area code
  if (areaCode[0] === "0" || areaCode[0] === "1") {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_AREA_CODE,
      message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
        code: areaCode,
        reason: `cannot start with ${areaCode[0]}`,
      }),
      details: { code: areaCode, reason: `cannot start with ${areaCode[0]}` },
    };
  }

  // Check exchange code
  if (exchangeCode[0] === "0" || exchangeCode[0] === "1") {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_EXCHANGE_CODE,
      message: getMessage(ErrorCodes.INVALID_EXCHANGE_CODE, {
        code: exchangeCode,
        reason: `cannot start with ${exchangeCode[0]}`,
      }),
      details: {
        code: exchangeCode,
        reason: `cannot start with ${exchangeCode[0]}`,
      },
    };
  }

  // Final validation
  if (!/^[2-9][0-9]{2}[2-9][0-9]{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, { country: "US" }),
      details: { country: "US" },
    };
  }

  return { isValid: true };
};
