# PhonyJS

> Type-safe phone number validation library with detailed error messages and i18n support

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Package](https://img.shields.io/npm/v/phonyjs.svg)](https://www.npmjs.com/package/phonyjs)
[![Buy Me A Coffee](https://img.shields.io/badge/☕_Support-Buy_Me_A_Coffee-orange.svg)](https://buycoffee.to/pbieganski)

**Created by [Patryk Biegański](https://github.com/BieganskiP)** | [GitHub](https://github.com/BieganskiP/phonyjs) | [NPM](https://www.npmjs.com/package/phonyjs)

## ✨ Features

✅ **Detailed Error Messages** - Know exactly why validation failed  
✅ **i18n Support** - Custom messages in any language  
✅ **Error Codes** - Machine-readable validation results  
✅ **92 Countries** - Comprehensive global coverage  
✅ **Type-safe** - Full TypeScript support  
✅ **Tree-shakeable** - Import only what you need  
✅ **Zero dependencies** - Lightweight and fast  
✅ **Mobile & Landline** - Both formats supported  
✅ **International formats** - Handles +XX and 00XX prefixes  
✅ **Production-ready** - 411 tests, 100% pass rate

## 📦 Installation

```bash
npm install phonyjs
```

## 🚀 Quick Start

```typescript
import { validatePhone, isValidPhone } from "phonyjs";

// Get detailed validation results
const result = validatePhone("us", "123");
console.log(result);
// {
//   isValid: false,
//   errorCode: "TOO_SHORT",
//   message: "Too short - expected 10 digits, got 3",
//   details: { expected: 10, got: 3 }
// }

// Or just check if valid
if (isValidPhone("us", "+1 212 456 7890")) {
  console.log("Valid!");
}
```

## 🌍 Supported Countries

**92 countries** covering 5+ billion people (~70% of world population)

<details>
<summary><b>View all supported countries</b></summary>

### Europe (51 countries) 🇪🇺

| Country              | Code | Example           |
| -------------------- | ---- | ----------------- |
| Poland               | `pl` | `123 456 789`     |
| United Kingdom       | `gb` | `07912 345678`    |
| France               | `fr` | `06 12 34 56 78`  |
| Germany              | `de` | `0151 12345678`   |
| Spain                | `es` | `612 34 56 78`    |
| Italy                | `it` | `320 123 4567`    |
| Netherlands          | `nl` | `06 12345678`     |
| Switzerland          | `ch` | `078 123 45 67`   |
| Austria              | `at` | `0664 123456`     |
| Belgium              | `be` | `0470 12 34 56`   |
| Ireland              | `ie` | `085 123 4567`    |
| Greece               | `gr` | `694 123 4567`    |
| Turkey               | `tr` | `0532 123 45 67`  |
| Denmark              | `dk` | `20 12 34 56`     |
| Finland              | `fi` | `040 123 4567`    |
| Hungary              | `hu` | `06 20 123 4567`  |
| Czech Republic       | `cz` | `601 123 456`     |
| Croatia              | `hr` | `091 123 4567`    |
| Romania              | `ro` | `0712 345 678`    |
| Bosnia & Herzegovina | `ba` | `061 123 456`     |
| Albania              | `al` | `067 212 3456`    |
| Montenegro           | `me` | `067 123 456`     |
| Georgia              | `ge` | `555 12 34 56`    |
| Armenia              | `am` | `091 123456`      |
| Russia               | `ru` | `8 912 345 67 89` |
| Cyprus               | `cy` | `96 123456`       |

### Middle East (16 countries) 🕌

| Country      | Code | Example         |
| ------------ | ---- | --------------- |
| Saudi Arabia | `sa` | `050 123 4567`  |
| UAE          | `ae` | `050 123 4567`  |
| Egypt        | `eg` | `010 1234 5678` |
| Qatar        | `qa` | `3312 3456`     |
| Kuwait       | `kw` | `9123 4567`     |
| Bahrain      | `bh` | `3600 1234`     |
| Oman         | `om` | `9123 4567`     |
| Jordan       | `jo` | `07 9012 3456`  |
| Yemen        | `ye` | `71 123 4567`   |
| Lebanon      | `lb` | `03 123 456`    |
| Iraq         | `iq` | `0750 123 4567` |
| Sudan        | `sd` | `091 234 5678`  |

### Asia-Pacific (18 countries) 🌏

| Country     | Code | Example          |
| ----------- | ---- | ---------------- |
| India       | `in` | `98765 43210`    |
| Pakistan    | `pk` | `0300 1234567`   |
| China       | `cn` | `138 0013 8000`  |
| Japan       | `jp` | `090 1234 5678`  |
| South Korea | `kr` | `010 1234 5678`  |
| Indonesia   | `id` | `0812 3456 7890` |
| Philippines | `ph` | `0917 123 4567`  |
| Thailand    | `th` | `081 234 5678`   |
| Malaysia    | `my` | `012 345 6789`   |
| Singapore   | `sg` | `8123 4567`      |
| Hong Kong   | `hk` | `9123 4567`      |
| Nepal       | `np` | `9841 234 567`   |
| Sri Lanka   | `lk` | `071 234 5678`   |
| Uzbekistan  | `uz` | `90 123 45 67`   |
| Kyrgyzstan  | `kg` | `555 123 456`    |
| Afghanistan | `af` | `70 123 4567`    |
| Australia   | `au` | `04 1234 5678`   |
| Maldives    | `mv` | `791 2345`       |

### Africa (5 countries) 🌍

| Country      | Code | Example        |
| ------------ | ---- | -------------- |
| South Africa | `za` | `072 123 4567` |
| Kenya        | `ke` | `0712 345 678` |
| Uganda       | `ug` | `0712 345 678` |
| Senegal      | `sn` | `77 123 45 67` |
| Angola       | `ao` | `923 123 456`  |

### Americas (2 countries) 🌎

| Country       | Code | Example          |
| ------------- | ---- | ---------------- |
| United States | `us` | `(212) 456-7890` |
| Canada        | `ca` | `416-123-4567`   |

</details>

## 💡 Usage

### Basic Validation

```typescript
import { validatePhone, isValidPhone } from "phonyjs";

// Get detailed results
const result = validatePhone("us", "+1 212 456 7890");
console.log(result);
// → { isValid: true }

// Just boolean
if (isValidPhone("gb", "07912 345678")) {
  console.log("Valid UK mobile!");
}
```

### Error Handling

```typescript
const result = validatePhone("us", "012-345-6789");

if (!result.isValid) {
  console.log(`Error: ${result.message}`);
  // → "Error: Invalid area code - cannot start with 0"

  console.log(`Code: ${result.errorCode}`);
  // → "Code: INVALID_AREA_CODE"

  console.log(`Details:`, result.details);
  // → Details: { code: "012", reason: "cannot start with 0" }
}
```

### Available Error Codes

```typescript
import { ErrorCodes } from "phonyjs";

ErrorCodes.TOO_SHORT; // "TOO_SHORT"
ErrorCodes.TOO_LONG; // "TOO_LONG"
ErrorCodes.INVALID_CHARACTERS; // "INVALID_CHARACTERS"
ErrorCodes.INVALID_FORMAT; // "INVALID_FORMAT"
ErrorCodes.INVALID_AREA_CODE; // "INVALID_AREA_CODE"
ErrorCodes.INVALID_MOBILE_PREFIX; // "INVALID_MOBILE_PREFIX"
ErrorCodes.INVALID_EXCHANGE_CODE; // "INVALID_EXCHANGE_CODE"
ErrorCodes.INVALID_PREFIX; // "INVALID_PREFIX"
ErrorCodes.UNSUPPORTED_COUNTRY; // "UNSUPPORTED_COUNTRY"
ErrorCodes.PERSONAL_NUMBER_PREFIX; // "PERSONAL_NUMBER_PREFIX" (UK 070)
ErrorCodes.MISSING_LEADING_ZERO; // "MISSING_LEADING_ZERO"
```

### TypeScript Support

Full type safety with autocomplete:

```typescript
import { validatePhone, ValidationResult, AvailableCountryCode } from "phonyjs";

// TypeScript autocompletes all 92 country codes
const country: AvailableCountryCode = "us";

// Result is fully typed
const result: ValidationResult = validatePhone(country, "123");
if (!result.isValid) {
  console.log(result.errorCode); // ✅ Type-safe
  console.log(result.details); // ✅ Type-safe
}
```

### Tree-Shaking (Optimal Bundle Size)

Import only the validators you need:

```typescript
import { validateUS, validateGB, validatePL } from "phonyjs";

validateUS("212-456-7890"); // true
validateGB("07912 345678"); // true
validatePL("123 456 789"); // true
```

### International Format Support

All validators support international dialing codes:

```typescript
// +XX format
validatePhone("us", "+1 212 456 7890"); // ✅
validatePhone("gb", "+44 7912 345678"); // ✅
validatePhone("sa", "+966 50 123 4567"); // ✅

// 00XX format
validatePhone("us", "001 212 456 7890"); // ✅
validatePhone("gb", "0044 7912 345678"); // ✅
validatePhone("sa", "00966 50 123 4567"); // ✅
```

**Note:** Full `00` prefix support currently available for GB, US, SA. Other countries coming soon!

## 📖 API Reference

### `validatePhone(countryCode, phoneNumber, options?)`

Main validation function with detailed error information.

```typescript
function validatePhone(
  countryCode: string,
  phoneNumber: string,
  options?: ValidationOptions
): ValidationResult;

interface ValidationResult {
  isValid: boolean;
  errorCode?: string;
  message?: string;
  details?: Record<string, any>;
}

interface ValidationOptions {
  messages?: Record<string, MessageFormatter | string>;
}
```

**Returns:** Detailed validation result

### `isValidPhone(countryCode, phoneNumber)`

Simple boolean validator for quick checks.

```typescript
function isValidPhone(countryCode: CountryCode, phoneNumber: string): boolean;
```

**Returns:** `true` if valid, `false` otherwise

### `validatePhoneWithFallback(countryCode, phoneNumber, strict?)`

Validation with fallback to generic validation for unsupported countries.

```typescript
function validatePhoneWithFallback(
  countryCode: CountryCode,
  phoneNumber: string,
  strict?: boolean
): boolean;
```

**Parameters:**

- `countryCode` - Any country code string
- `phoneNumber` - Phone number to validate
- `strict` - If true, returns false for unsupported countries

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT © [Patryk Biegański](https://github.com/BieganskiP)

## ☕ Support

If you find this library helpful, consider [buying me a coffee](https://buycoffee.to/pbieganski)! ☕

---

## 🗺️ Roadmap

### ✅ Completed (v2.0.0)

- [x] 92 countries with mobile & landline support
- [x] Detailed error messages with error codes
- [x] Full TypeScript support
- [x] Tree-shaking support
- [x] `00` prefix support (GB, US, SA)
- [x] Zero dependencies
- [x] 411 comprehensive tests

### 🚀 Planned Features

#### Expand Coverage

- [ ] Add remaining countries to achieve **global coverage** (190+ countries)
- [ ] Expand `00` prefix support to all countries
- [ ] Region-specific validation (states, provinces)

#### Enhanced Features

- [ ] Phone number formatting utilities
- [ ] Phone number parsing (extract country code, area code, etc.)
- [ ] Number type detection (mobile vs landline)
- [ ] Carrier/operator detection
- [ ] More granular error codes per country

---

Made with ❤️ by [Patryk Biegański](https://github.com/BieganskiP)
