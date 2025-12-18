import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Peruvian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 9 (e.g., 9 1234 5678)
 * - Landline: 7-8 digits with area codes (e.g., 1 234 5678 for Lima)
 * - Handles international format (+51 prefix) and 0051 prefix
 * - Mobile numbers always start with 9
 * - Landline area codes vary by region
 *
 * Major area codes:
 * - 1: Lima and Callao
 * - 44: Ica
 * - 54: Arequipa
 * - 64: Cusco
 * - 74: Huancayo
 * - 76: Chiclayo
 * - 84: Puno
 *
 * Mobile prefixes: 9XXXX XXXX
 *
 * @example
 * validatePE("9 1234 5678") // { isValid: true } - Mobile
 * validatePE("1 234 5678") // { isValid: true } - Landline Lima
 * validatePE("8 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validatePE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0051") && digits.length >= 11) {
    digits = digits.slice(4);
  } else if (digits.startsWith("51") && digits.length >= 9) {
    digits = digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
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
          country: "Peru (mobile must be 9 digits)",
        }),
        details: { country: "Peru (mobile must be 9 digits)" },
      };
    }

    // Validate mobile format: 9 XXXX XXXX
    if (!/^9\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Peru (mobile)",
        }),
        details: { country: "Peru (mobile)" },
      };
    }
  } else {
    // Landline number validation
    const validAreaCodes = ["1", "44", "54", "64", "74", "76", "84"];
    
    let areaCode = "";
    let isValidAreaCode = false;

    // Check for 1-digit area codes
    if (firstDigit && validAreaCodes.includes(firstDigit)) {
      areaCode = firstDigit;
      isValidAreaCode = true;
      
      // For Lima (area code 1), should be 8 digits total
      if (firstDigit === "1" && digits.length !== 8) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Peru (Lima landline must be 8 digits)",
          }),
          details: { country: "Peru (Lima landline must be 8 digits)" },
        };
      }
      
      // For other 1-digit area codes, should be 7 digits total
      if (firstDigit !== "1" && digits.length !== 7) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Peru (regional landline must be 7 digits)",
          }),
          details: { country: "Peru (regional landline must be 7 digits)" },
        };
      }
    } else {
      // Check for 2-digit area codes
      const twoDigitAreaCode = digits.slice(0, 2);
      if (validAreaCodes.includes(twoDigitAreaCode)) {
        areaCode = twoDigitAreaCode;
        isValidAreaCode = true;
        
        // For 2-digit area codes, total should be 8 digits
        if (digits.length !== 8) {
          return {
            isValid: false,
            errorCode: ErrorCodes.INVALID_FORMAT,
            message: getMessage(ErrorCodes.INVALID_FORMAT, {
              country: "Peru (landline with 2-digit area code must be 8 digits)",
            }),
            details: { country: "Peru (landline with 2-digit area code must be 8 digits)" },
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
          reason: "invalid area code for Peru",
        }),
        details: { code: codeToShow, reason: "invalid area code for Peru" },
      };
    }

    // Validate landline format
    if (areaCode === "1") {
      // Lima: 1 XXX XXXX
      if (!/^1\d{7}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Peru (Lima landline)",
          }),
          details: { country: "Peru (Lima landline)" },
        };
      }
    } else if (areaCode.length === 1) {
      // Other 1-digit area codes: X XXX XXX
      if (!/^[4-8]\d{6}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Peru (regional landline)",
          }),
          details: { country: "Peru (regional landline)" },
        };
      }
    } else {
      // 2-digit area codes: XX XXX XXX
      if (!/^[4-8]\d\d{6}$/.test(digits)) {
        return {
          isValid: false,
          errorCode: ErrorCodes.INVALID_FORMAT,
          message: getMessage(ErrorCodes.INVALID_FORMAT, {
            country: "Peru (regional landline)",
          }),
          details: { country: "Peru (regional landline)" },
        };
      }
    }
  }

  return { isValid: true };
};
