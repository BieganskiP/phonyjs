import { describe, test, expect } from "vitest";
import { validateBR } from "../../src/validators/south-america/br";
import { ErrorCodes } from "../../src/errorCodes";

describe("validateBR - Brazilian phone numbers", () => {
  test("should accept valid Brazilian mobile numbers", () => {
    expect(validateBR("11 91234 5678").isValid).toBe(true); // São Paulo mobile
    expect(validateBR("21 98765 4321").isValid).toBe(true); // Rio de Janeiro mobile
    expect(validateBR("31 99876 5432").isValid).toBe(true); // Belo Horizonte mobile
    expect(validateBR("11912345678").isValid).toBe(true); // Without formatting
  });

  test("should accept valid Brazilian landline numbers", () => {
    expect(validateBR("11 2234 5678").isValid).toBe(true); // São Paulo landline
    expect(validateBR("21 3345 6789").isValid).toBe(true); // Rio de Janeiro landline
    expect(validateBR("31 4456 7890").isValid).toBe(true); // Belo Horizonte landline
    expect(validateBR("1122345678").isValid).toBe(true); // Without formatting
  });

  test("should accept phone numbers with country code", () => {
    expect(validateBR("55 11 91234 5678").isValid).toBe(true);
    expect(validateBR("+55 21 2234 5678").isValid).toBe(true);
    expect(validateBR("0055 31 99876 5432").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validateBR("11-91234-5678").isValid).toBe(true);
    expect(validateBR("(21) 2234-5678").isValid).toBe(true);
    expect(validateBR("31.99876.5432").isValid).toBe(true);
    expect(validateBR("11 9 1234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with invalid area code", () => {
    const result1 = validateBR("10 91234 5678"); // Area code too low
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);

    const result2 = validateBR("01 91234 5678"); // Area code too low
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_AREA_CODE);
  });

  test("should reject mobile numbers not starting with 9", () => {
    const result = validateBR("11 81234 5678"); // 11 digits but doesn't start with 9
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_PREFIX);
  });

  test("should reject landline numbers starting with 9", () => {
    const result = validateBR("11 9234 5678"); // 10 digits but starts with 9
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe(ErrorCodes.INVALID_FORMAT);
  });

  test("should reject phone numbers with incorrect length", () => {
    const tooShort1 = validateBR("11 1234 567");
    expect(tooShort1.isValid).toBe(false);
    expect(tooShort1.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooShort2 = validateBR("123456789");
    expect(tooShort2.isValid).toBe(false);
    expect(tooShort2.errorCode).toBe(ErrorCodes.TOO_SHORT);

    const tooLong = validateBR("11 91234 56789");
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.errorCode).toBe(ErrorCodes.TOO_LONG);

    const empty = validateBR("");
    expect(empty.isValid).toBe(false);
    expect(empty.errorCode).toBe(ErrorCodes.TOO_SHORT);
  });

  test("should reject phone numbers with invalid characters", () => {
    const result1 = validateBR("11 9abc 5678");
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);

    const result2 = validateBR("11#91234#5678");
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_CHARACTERS);
  });

  test("should accept valid area codes", () => {
    expect(validateBR("11 91234 5678").isValid).toBe(true); // São Paulo
    expect(validateBR("21 91234 5678").isValid).toBe(true); // Rio de Janeiro
    expect(validateBR("31 91234 5678").isValid).toBe(true); // Belo Horizonte
    expect(validateBR("41 91234 5678").isValid).toBe(true); // Curitiba
    expect(validateBR("51 91234 5678").isValid).toBe(true); // Porto Alegre
    expect(validateBR("61 91234 5678").isValid).toBe(true); // Brasília
    expect(validateBR("71 91234 5678").isValid).toBe(true); // Salvador
    expect(validateBR("81 91234 5678").isValid).toBe(true); // Recife
    expect(validateBR("85 91234 5678").isValid).toBe(true); // Fortaleza
  });

  test("should reject landline numbers with invalid third digit", () => {
    const result1 = validateBR("11 0234 5678"); // Third digit cannot be 0
    expect(result1.isValid).toBe(false);
    expect(result1.errorCode).toBe(ErrorCodes.INVALID_FORMAT);

    const result2 = validateBR("11 1234 5678"); // Third digit cannot be 1
    expect(result2.isValid).toBe(false);
    expect(result2.errorCode).toBe(ErrorCodes.INVALID_FORMAT);
  });
});
