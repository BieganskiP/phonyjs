import { describe, test, expect } from "vitest";
import { validateRS } from "../src/validators/rs";

describe("validateRS - Serbian phone numbers", () => {
  test("should accept valid Serbian mobile numbers", () => {
    expect(validateRS("061 234 5678").isValid).toBe(true);
    expect(validateRS("062 234 5678").isValid).toBe(true);
  });

  test("should accept valid Serbian landline numbers", () => {
    expect(validateRS("011 234 5678").isValid).toBe(true);
    expect(validateRS("021 234 5678").isValid).toBe(true);
  });

  test("should accept phone numbers with formatting characters", () => {
    expect(validateRS("011 234 5678").isValid).toBe(true);
    expect(validateRS("011-234-5678").isValid).toBe(true);
    expect(validateRS("+381 11 234 5678").isValid).toBe(true);
  });

  test("should reject phone numbers with incorrect length", () => {
    expect(validateRS("011 234 567").isValid).toBe(false); // too short
    expect(validateRS("011 234 56789").isValid).toBe(false); // too long
    expect(validateRS("123").isValid).toBe(false);
    expect(validateRS("").isValid).toBe(false);
  });

  test("should reject numbers without leading zero", () => {
    expect(validateRS("112345678").isValid).toBe(false);
  });
});

