import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Chilean phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 9 (e.g., 9 1234 5678)
 * - Landline: 8-9 digits with area codes (e.g., 2 1234 5678 for Santiago)
 * - Handles international format (+56 prefix) and 0056 prefix
 * - Mobile numbers always start with 9
 * - Landline area codes: 2 (Santiago), 32 (Valparaíso), 41 (Puerto Montt), etc.
 *
 * Major area codes:
 * - 2: Santiago (RM)
 * - 32: Valparaíso (V)
 * - 33: Viña del Mar (V)
 * - 41: Puerto Montt (X)
 * - 42: Valdivia (XIV)
 * - 43: Temuco (IX)
 * - 45: Chillán (XVI)
 * - 51: La Serena (IV)
 * - 52: Calama (II)
 * - 55: Antofagasta (II)
 * - 57: Iquique (I)
 * - 58: Arica (XV)
 * - 61: Punta Arenas (XII)
 * - 63: Coyhaique (XI)
 * - 64: Puerto Aysén (XI)
 * - 65: Castro (X)
 * - 67: Linares (VII)
 * - 71: Talca (VII)
 * - 72: Rancagua (VI)
 * - 73: Chillán (XVI)
 * - 75: Curicó (VII)
 *
 * @example
 * validateCL("9 1234 5678") // { isValid: true } - Mobile
 * validateCL("2 1234 5678") // { isValid: true } - Landline Santiago
 * validateCL("8 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateCL: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0056") && digits.length >= 12) {
    digits = digits.slice(4);
  } else if (digits.startsWith("56") && digits.length >= 10) {
    digits = digits.slice(2);
  }

  // Check minimum length
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

  // Check maximum length
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

  const firstDigit = digits[0];

  // Check if it's a mobile number (starts with 9)
  if (firstDigit === "9") {
    // Mobile number validation - must be exactly 9 digits
    if (digits.length !== 9) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Chile (mobile must be 9 digits)",
        }),
        details: { country: "Chile (mobile must be 9 digits)" },
      };
    }

    // Validate mobile format: 9 XXXX XXXX
    if (!/^9\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Chile (mobile)",
        }),
        details: { country: "Chile (mobile)" },
      };
    }
  } else {
    // Landline number validation
    const validAreaCodes = ["2", "32", "33", "41", "42", "43", "45", "51", "52", "55", "57", "58", "61", "63", "64", "65", "67", "71", "72", "73", "75"];
    
    let areaCode = "";
    let isValidAreaCode = false;

    // Check for 1-digit area codes
    if (firstDigit && validAreaCodes.includes(firstDigit)) {
      areaCode = firstDigit;
      isValidAreaCode = true;
      
      // For 1-digit area codes, total should be 8 digits
      if (digits.length !== 8) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Chile (landline with 1-digit area code must be 8 digits)",
          }),
          details: { country: "Chile (landline with 1-digit area code must be 8 digits)" },
        };
      }
    } else {
      // Check for 2-digit area codes
      const twoDigitAreaCode = digits.slice(0, 2);
      if (validAreaCodes.includes(twoDigitAreaCode)) {
        areaCode = twoDigitAreaCode;
        isValidAreaCode = true;
        
        // For 2-digit area codes, total should be 9 digits
        if (digits.length !== 9) {
          return {
            isValid: false,
            errorCode: ErrorCodes.INVALID_FORMAT,
            message: getMessage(ErrorCodes.INVALID_FORMAT, {
              country: "Chile (landline with 2-digit area code must be 9 digits)",
            }),
            details: { country: "Chile (landline with 2-digit area code must be 9 digits)" },
          };
        }
      }
    }

    if (!isValidAreaCode) {
      const codeToShow = digits.slice(0, 2) || "unknown";
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_AREA_CODE,
        message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
          code: codeToShow,
          reason: "invalid area code for Chile",
        }),
        details: { code: codeToShow, reason: "invalid area code for Chile" },
      };
    }

    // Validate landline format
    if (areaCode.length === 1) {
      // 1-digit area code: X XXXX XXX
      if (!/^[2-8]\d{7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Chile (landline)",
          }),
          details: { country: "Chile (landline)" },
        };
      }
    } else {
      // 2-digit area code: XX XXXX XXX
      if (!/^[2-8]\d\d{7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Chile (landline)",
          }),
          details: { country: "Chile (landline)" },
        };
      }
    }
  }

  return { isValid: true };
};
