import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Brazilian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits with format (XX) 9XXXX-XXXX where XX is area code (DDD)
 * - Landline: 10 digits with format (XX) XXXX-XXXX where XX is area code (DDD)
 * - Handles international format (+55 prefix) and 0055 prefix
 * - Mobile numbers always start with 9 after area code
 * - Area codes (DDD) range from 11 to 99
 *
 * Major area codes:
 * - 11: São Paulo (SP)
 * - 21: Rio de Janeiro (RJ)
 * - 31: Belo Horizonte (MG)
 * - 41: Curitiba (PR)
 * - 51: Porto Alegre (RS)
 * - 61: Brasília (DF)
 * - 71: Salvador (BA)
 * - 81: Recife (PE)
 * - 85: Fortaleza (CE)
 *
 * @example
 * validateBR("11 91234 5678") // { isValid: true } - Mobile São Paulo
 * validateBR("21 1234 5678") // { isValid: true } - Landline Rio de Janeiro
 * validateBR("10 91234 5678") // { isValid: false, errorCode: "INVALID_AREA_CODE", ... }
 */
export const validateBR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0055") && digits.length >= 12) {
    digits = digits.slice(4);
  } else if (digits.startsWith("55") && digits.length >= 10) {
    digits = digits.slice(2);
  }

  // Check length (10 for landline, 11 for mobile)
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  }

  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "10-11",
        got: digits.length,
      }),
      details: { expected: "10-11", got: digits.length },
    };
  }

  // Extract area code (DDD)
  const areaCode = digits.slice(0, 2);
  const areaCodeNum = parseInt(areaCode, 10);

  // Validate area code (must be between 11 and 99)
  if (areaCodeNum < 11 || areaCodeNum > 99) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_AREA_CODE,
      message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
        code: areaCode,
        reason: "must be between 11 and 99",
      }),
      details: { code: areaCode, reason: "must be between 11 and 99" },
    };
  }

  if (digits.length === 11) {
    // Mobile number - must start with 9 after area code
    const thirdDigit = digits[2];
    if (thirdDigit !== "9") {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_PREFIX,
        message: getMessage(ErrorCodes.INVALID_PREFIX, {
          prefix: thirdDigit,
          country: "Brazil (mobile must start with 9)",
        }),
        details: { prefix: thirdDigit, country: "Brazil (mobile must start with 9)" },
      };
    }

    // Validate mobile format: XX 9XXXX-XXXX
    if (!/^[1-9][1-9]9\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Brazil (mobile)",
        }),
        details: { country: "Brazil (mobile)" },
      };
    }
  } else {
    // Landline number (10 digits)
    const thirdDigit = digits[2];
    if (thirdDigit === "9") {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Brazil (landline cannot start with 9)",
        }),
        details: { country: "Brazil (landline cannot start with 9)" },
      };
    }

    // Validate landline format: XX XXXX-XXXX (third digit cannot be 0 or 1)
    if (!/^[1-9][1-9][2-9]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Brazil (landline)",
        }),
        details: { country: "Brazil (landline)" },
      };
    }
  }

  return { isValid: true };
};
