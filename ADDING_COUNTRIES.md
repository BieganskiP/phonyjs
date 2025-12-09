# Adding New Countries to PhonyJS

Quick guide for adding new country validators.

## 🚀 Quick Checklist

For each new country:

- [ ] Research validation rules
- [ ] Create validator file
- [ ] Add to registry
- [ ] Export in index
- [ ] Create tests
- [ ] Update CHANGELOG.md
- [ ] Update README.md table
- [ ] Run tests
- [ ] Build and publish

## 📝 Step-by-Step Process

### 1. Research Validation Rules

Use these sources:

- Wikipedia: "[Country] telephone numbering plan"
- Official telecom authority websites
- ITU-T recommendations
- Real examples from that country

Key information needed:

- Total digits (with/without country code)
- Mobile number prefixes
- Landline prefixes (if validating)
- Invalid prefixes
- Country code

### 2. Create Validator File

**Template**: `src/validators/[code].ts`

```typescript
import { PhoneValidator } from "../types";

/**
 * Validates [Country] phone numbers.
 *
 * Rules:
 * - [Describe format]
 * - [List valid prefixes]
 * - [List invalid prefixes]
 * - Non-digit characters are stripped before validation
 * - Handles international format (+XXX prefix)
 *
 * @example
 * validate[CODE]("XXX XXX XXX") // true
 * validate[CODE]("+XXX XXX XXX XXX") // true
 * validate[CODE]("invalid") // false
 */
export const validate[CODE]: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code if present (+XXX)
  if (digits.startsWith("[COUNTRY_CODE]") && digits.length > [NORMAL_LENGTH]) {
    digits = digits.slice([COUNTRY_CODE_LENGTH]);
    // Or add leading zero if needed:
    // digits = "0" + digits.slice([COUNTRY_CODE_LENGTH]);
  }

  // Validation regex
  return /^[PATTERN]$/.test(digits);
};
```

### 3. Add to Registry

**File**: `src/validators/index.ts`

```typescript
import { validate[CODE] } from "./[code]";

export const validators = {
  // ... existing
  [code]: validate[CODE],  // Add here
} satisfies Record<string, PhoneValidator>;
```

### 4. Export in Index

**File**: `src/index.ts`

```typescript
export { validate[CODE] } from "./validators/[code]";
```

### 5. Create Tests

**Template**: `test/[code].test.ts`

```typescript
import { describe, test, expect } from "vitest";
import { validate[CODE] } from "../src/validators/[code]";

describe("validate[CODE] - [Country] phone numbers", () => {
  test("should accept valid mobile numbers", () => {
    expect(validate[CODE]("XXX XXX XXX")).toBe(true);
    expect(validate[CODE]("XXXXXXXXX")).toBe(true);
  });

  test("should accept phone numbers with formatting", () => {
    expect(validate[CODE]("XXX XXX XXX")).toBe(true);
    expect(validate[CODE]("XXX-XXX-XXX")).toBe(true);
  });

  test("should accept international format (+XXX)", () => {
    expect(validate[CODE]("+XXX XXX XXX XXX")).toBe(true);
  });

  test("should reject invalid prefixes", () => {
    expect(validate[CODE]("XXX XXX XXX")).toBe(false);
  });

  test("should reject incorrect length", () => {
    expect(validate[CODE]("XXX")).toBe(false);
    expect(validate[CODE]("")).toBe(false);
  });

  test("should reject non-digit characters only", () => {
    expect(validate[CODE]("abc def ghi")).toBe(false);
  });
});
```

### 6. Update CHANGELOG.md

Add to the top (create new version if needed):

```markdown
## [1.X.0] - YYYY-MM-DD

### Added

- 🇽🇽 **[Country] ([CODE])** - [Description of what's validated]
```

### 7. Update README.md

Add to "Supported Countries" table:

```markdown
| [Country] | `[code]` | [format] | `[example]` |
```

### 8. Run Tests and Build

```bash
npm test        # All tests should pass
npm run build   # Should build without errors
npm run lint    # Should pass linting
```

### 9. Publish

```bash
npm version minor  # Or patch if just bug fixes
npm publish
```

## 📋 Country Information Template

When researching, fill out this template:

```
Country: [Name]
Code: [2-letter ISO code]
Country Code: +[XXX]
Total Digits: [X] (without country code), [Y] (with country code)

Mobile Numbers:
- Format: [0XXX XXX XXX]
- Prefixes: [List all valid prefixes]
- Cannot start with: [List invalid]
- Carriers: [If known - e.g., Carrier A: 050, 051]

Landlines:
- Format: [If applicable]
- Prefixes: [If validating landlines]

Special Numbers:
- Toll-free: [XXX]
- Premium: [XXX]
- [Others]

Sources:
- [URL 1]
- [URL 2]
```

## 🌍 Priority Countries to Add

Based on global usage:

### High Priority (Large populations/tech hubs)

- [ ] 🇮🇳 India (IN)
- [ ] 🇨🇳 China (CN)
- [ ] 🇧🇷 Brazil (BR)
- [ ] 🇩🇪 Germany (DE)
- [ ] 🇫🇷 France (FR)
- [ ] 🇯🇵 Japan (JP)
- [ ] 🇦🇺 Australia (AU)
- [ ] 🇨🇦 Canada (CA)
- [ ] 🇪🇸 Spain (ES)
- [ ] 🇮🇹 Italy (IT)

### Medium Priority

- [ ] 🇲🇽 Mexico (MX)
- [ ] 🇰🇷 South Korea (KR)
- [ ] 🇳🇱 Netherlands (NL)
- [ ] 🇸🇪 Sweden (SE)
- [ ] 🇨🇭 Switzerland (CH)
- [ ] 🇧🇪 Belgium (BE)
- [ ] 🇦🇹 Austria (AT)
- [ ] 🇳🇴 Norway (NO)
- [ ] 🇩🇰 Denmark (DK)
- [ ] 🇫🇮 Finland (FI)

### Regional Focus

- [ ] 🇦🇪 UAE (AE)
- [ ] 🇪🇬 Egypt (EG)
- [ ] 🇿🇦 South Africa (ZA)
- [ ] 🇳🇬 Nigeria (NG)
- [ ] 🇸🇬 Singapore (SG)
- [ ] 🇲🇾 Malaysia (MY)
- [ ] 🇹🇭 Thailand (TH)
- [ ] 🇵🇭 Philippines (PH)
- [ ] 🇮🇩 Indonesia (ID)
- [ ] 🇻🇳 Vietnam (VN)

## 💡 Tips

1. **Start simple**: Begin with countries that have straightforward rules
2. **Mobile first**: Focus on mobile numbers (most common use case)
3. **Test thoroughly**: Use real examples from that country
4. **Document sources**: Always cite where you got the rules
5. **Batch similar**: Group similar countries (e.g., EU countries often have similar patterns)

## 🔍 Example: Adding France (FR)

```typescript
// src/validators/fr.ts
export const validateFR: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");

  // Remove country code +33
  if (digits.startsWith("33") && digits.length > 9) {
    digits = "0" + digits.slice(2);
  }

  // Mobile: 06 or 07, then 8 more digits
  return /^0[67]\d{8}$/.test(digits);
};
```

## 📞 Need Help?

- Check existing validators for patterns
- Ask in issues/discussions
- Reference ITU-T E.164 standard
- Use Wikipedia's telephone numbering plans
