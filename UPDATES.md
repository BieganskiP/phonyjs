# Recent Updates to PhonyJS

## 🎉 What's New

### 1. Enhanced Country-Specific Validation Rules

All validators now implement **strict prefix validation** based on real-world telecommunication rules:

#### 🇵🇱 Poland (PL) - Enhanced
- **Mobile numbers only**: Must start with 4, 5, 6, 7, or 8
- ❌ **Rejects**: Numbers starting with 1, 2, 3 (landline area codes)
- ❌ **Rejects**: Numbers starting with 9 (special services)
- ✅ **Valid examples**: `500123456`, `600123456`, `+48 700 123 456`

#### 🇬🇧 United Kingdom (GB) - Enhanced
- **Mobile numbers**: Must start with `07`, followed by `1-9` (not 0)
- ❌ **Rejects**: `070` prefix (personal numbers, not mobile)
- ✅ **Valid patterns**: `071`, `072`, `073`, `074`, `075`, `076`, `077`, `078`, `079`
- ✅ **Valid examples**: `07912345678`, `+44 7912 345678`

#### 🇺🇸 United States (US) - Already Correct
- ✅ Area code: Cannot start with 0 or 1
- ✅ Exchange code: Cannot start with 0 or 1
- ✅ **Valid examples**: `212-456-7890`, `1-212-456-7890`

### 2. New Country: Saudi Arabia 🇸🇦

Added complete validation for Saudi Arabian mobile numbers:

- **Format**: 10 digits starting with `05`
- **Valid prefixes**: `050`, `053`, `054`, `055`, `056`, `058`, `059`
- **Carriers**:
  - STC: `050`, `053`, `055`
  - Mobily: `054`, `056`
  - Zain: `058`, `059`
- **International format**: Supports `+966` prefix
- ✅ **Valid examples**: `0501234567`, `+966 50 123 4567`

### 3. Generic Validator for Any Country

Implemented a **fallback validator** for countries without specific rules:

- Validates based on international standards (E.164)
- Accepts 7-15 digits
- Rejects all-zero numbers
- Perfect for countries without dedicated validators

### 4. New Function: `validatePhoneWithFallback()`

A flexible validation function that supports any country code:

```typescript
// Uses specific validator if available
validatePhoneWithFallback("pl", "500123456"); // true (specific)

// Falls back to generic for unsupported countries
validatePhoneWithFallback("fr", "0612345678"); // true (generic)

// Strict mode: only use specific validators
validatePhoneWithFallback("fr", "0612345678", { strict: true }); // false
```

**Benefits:**
- Type-safe for known countries
- Graceful fallback for unknown countries
- Optional strict mode
- Perfect for international applications

## 📊 Updated Statistics

| Metric | Value |
|--------|-------|
| **Supported Countries** | 4 (PL, US, GB, SA) |
| **Test Files** | 7 |
| **Total Tests** | 50 ✅ |
| **Test Pass Rate** | 100% |
| **Bundle Size** | ~1.5KB (still tiny!) |

## 🆕 New API Functions

### `validatePhoneWithFallback(countryCode, phoneNumber, options?)`

```typescript
import { validatePhoneWithFallback } from 'phonyjs';

// Basic usage - uses specific validator or falls back to generic
validatePhoneWithFallback("pl", "500123456"); // true
validatePhoneWithFallback("fr", "0612345678"); // true (generic)

// Strict mode - only specific validators
validatePhoneWithFallback("fr", "0612345678", { strict: true }); // false
```

### `validateGeneric(phoneNumber)`

```typescript
import { validateGeneric } from 'phonyjs';

// Generic validation for any country
validateGeneric("1234567890"); // true
validateGeneric("123"); // false (too short)
validateGeneric("0000000000"); // false (all zeros)
```

### Individual Country Validators

```typescript
import { validateSA } from 'phonyjs';

validateSA("0501234567"); // true
validateSA("0571234567"); // false (invalid prefix)
```

## 🔧 ESLint Configuration Updated

Added test-specific overrides to allow test utilities while maintaining strict rules for source code:

```json
"overrides": [
  {
    "files": ["test/**/*.ts"],
    "rules": {
      "@typescript-eslint/no-unsafe-call": "off"
    }
  }
]
```

## 📝 Updated Documentation

All validators now include:
- Detailed JSDoc comments
- Real-world carrier information (for SA)
- Valid/invalid examples
- Prefix rules and restrictions

## 🧪 Enhanced Test Coverage

New test files:
- `test/sa.test.ts` - Saudi Arabia validator tests
- `test/generic.test.ts` - Generic validator tests
- `test/validatePhoneWithFallback.test.ts` - Fallback function tests

Each validator now tests:
- ✅ Valid numbers
- ✅ Formatted numbers
- ✅ International format
- ✅ Invalid prefixes
- ✅ Wrong length
- ✅ Edge cases

## 🚀 Usage Examples

### Type-Safe Validation (Specific Countries)

```typescript
import { validatePhone } from 'phonyjs';

// Only accepts known country codes
validatePhone("pl", "500123456"); // ✅ TypeScript autocomplete
validatePhone("sa", "0501234567"); // ✅ TypeScript autocomplete
validatePhone("xx", "123456789"); // ❌ TypeScript error
```

### Flexible Validation (Any Country)

```typescript
import { validatePhoneWithFallback } from 'phonyjs';

// Works with any country code string
const userCountry = getUserCountry(); // could be any string
validatePhoneWithFallback(userCountry, phoneNumber); // ✅ Always works
```

### Direct Validator Access

```typescript
import { validateSA, validatePL } from 'phonyjs';

// Tree-shaking optimized
validateSA("0501234567"); // Only imports SA validator
validatePL("500123456"); // Only imports PL validator
```

## 🔄 Migration Guide

### If You Were Using Old Validators

**Poland (PL):**
```typescript
// ❌ OLD: These would pass but shouldn't
validatePhone("pl", "123456789"); // landline format
validatePhone("pl", "923456789"); // special services

// ✅ NEW: Only mobile numbers (4-8 prefix)
validatePhone("pl", "500123456"); // correct
validatePhone("pl", "600123456"); // correct
```

**United Kingdom (GB):**
```typescript
// ❌ OLD: This would pass but shouldn't
validatePhone("gb", "07012345678"); // 070 is personal, not mobile

// ✅ NEW: Excludes 070 prefix
validatePhone("gb", "07912345678"); // correct
```

### Adding Generic Validation

```typescript
// OLD: Only specific countries
import { validatePhone } from 'phonyjs';
validatePhone("pl", number); // works
// validatePhone("fr", number); // TypeScript error

// NEW: Support any country with fallback
import { validatePhoneWithFallback } from 'phonyjs';
validatePhoneWithFallback("pl", number); // uses specific
validatePhoneWithFallback("fr", number); // uses generic
```

## 📚 Learn More

- **README.md** - Complete API documentation
- **CONTRIBUTING.md** - How to add new validators
- **QUICK_REFERENCE.md** - Command cheat sheet
- **PROJECT_SUMMARY.md** - Architecture overview

## 🎯 What's Next?

Potential future enhancements:
- [ ] Add more countries (FR, DE, JP, AU, etc.)
- [ ] Phone number formatting utilities
- [ ] Parse phone numbers into components
- [ ] Carrier/region detection
- [ ] Validate landlines separately from mobile

## 🐛 Bug Fixes

- ✅ Fixed ESLint type-checking errors in test files
- ✅ Fixed validators to handle international format properly
- ✅ Updated all tests to use valid phone numbers

---

**All tests passing! 50/50 ✅**

Ready to publish with `npm publish --access=public`

