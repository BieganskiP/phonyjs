# PhonyJS

> Type-safe phone number validation library with country-specific rules

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Package](https://img.shields.io/npm/v/phonyjs.svg)](https://www.npmjs.com/package/phonyjs)
[![Buy Me A Coffee](https://img.shields.io/badge/☕_Support-Buy_Me_A_Coffee-orange.svg)](https://buycoffee.to/pbieganski)

**Created by [Patryk Biegański](https://github.com/BieganskiP)** | [GitHub](https://github.com/BieganskiP/phonyjs) | [NPM](https://www.npmjs.com/package/phonyjs)

## Features

✅ **63 Countries** - Comprehensive global coverage  
✅ **Type-safe** - Full TypeScript support with strict typing  
✅ **Tree-shakeable** - Import only what you need  
✅ **Zero dependencies** - Lightweight and fast  
✅ **Mobile & Landline** - Both formats supported  
✅ **International formats** - Handles +XX country codes  
✅ **Well-tested** - 413 tests, 100% pass rate  
✅ **Production-ready** - Under 25 KB bundle size

## Installation

```bash
npm install phonyjs
```

## Quick Start

```typescript
import { validatePhone } from "phonyjs";

// Validate phone numbers from 63 countries worldwide 🌍
validatePhone("us", "+1 (212) 456-7890"); // true - USA
validatePhone("gb", "07912 345678"); // true - UK
validatePhone("pl", "123 456 789"); // true - Poland
validatePhone("sa", "+966 50 123 4567"); // true - Saudi Arabia
validatePhone("jp", "090-1234-5678"); // true - Japan
validatePhone("de", "0151 12345678"); // true - Germany
validatePhone("ru", "8 912 345 67 89"); // true - Russia
validatePhone("au", "04 1234 5678"); // true - Australia

// Invalid numbers return false
validatePhone("us", "invalid"); // false
validatePhone("gb", "1234"); // false
```

## Supported Countries

**63 countries** covering 60+ billion people across 6 continents 🌍

### Europe (24 countries) 🇪🇺

| Country              | Code | Example           |
| -------------------- | ---- | ----------------- |
| Poland               | `pl` | `123 456 789`     |
| United Kingdom       | `gb` | `07912 345678`    |
| France               | `fr` | `06 12 34 56 78`  |
| Germany              | `de` | `0151 12345678`   |
| Spain                | `es` | `612 345 678`     |
| Italy                | `it` | `312 345 6789`    |
| Netherlands          | `nl` | `06 1234 5678`    |
| Greece               | `gr` | `690 123 4567`    |
| Ireland              | `ie` | `087 123 4567`    |
| Switzerland          | `ch` | `079 123 45 67`   |
| Austria              | `at` | `0650 123 4567`   |
| Belgium              | `be` | `0470 12 34 56`   |
| Denmark              | `dk` | `12 34 56 78`     |
| Finland              | `fi` | `040 123 4567`    |
| Hungary              | `hu` | `20 123 4567`     |
| Czech Republic       | `cz` | `601 123 456`     |
| Croatia              | `hr` | `091 123 4567`    |
| Romania              | `ro` | `0722 123 456`    |
| Bosnia & Herzegovina | `ba` | `061 123 456`     |
| Albania              | `al` | `069 123 4567`    |
| Montenegro           | `me` | `067 123 456`     |
| Georgia              | `ge` | `555 123 456`     |
| Armenia              | `am` | `077 123 456`     |
| Russia               | `ru` | `8 912 345 67 89` |
| Cyprus               | `cy` | `96 123 456`      |

### Middle East (13 countries) 🕌

| Country      | Code | Example         |
| ------------ | ---- | --------------- |
| Saudi Arabia | `sa` | `050 123 4567`  |
| UAE          | `ae` | `050 123 4567`  |
| Qatar        | `qa` | `3123 4567`     |
| Kuwait       | `kw` | `5123 4567`     |
| Bahrain      | `bh` | `3123 4567`     |
| Oman         | `om` | `7123 4567`     |
| Egypt        | `eg` | `010 1234 5678` |
| Turkey       | `tr` | `0532 123 4567` |
| Jordan       | `jo` | `7 9123 4567`   |
| Lebanon      | `lb` | `3 123 456`     |
| Iraq         | `iq` | `7812 345 678`  |
| Yemen        | `ye` | `7 1234 5678`   |
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

### Africa (6 countries) 🌍

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

## Usage

### Basic Validation

```typescript
import { validatePhone } from "phonyjs";

// Simple validation
const isValid = validatePhone("us", "+1 (212) 456-7890");
console.log(isValid); // true

// Works with various formats
validatePhone("pl", "123456789"); // true
validatePhone("pl", "123 456 789"); // true
validatePhone("pl", "+48 123 456 789"); // true
validatePhone("pl", "48-123-456-789"); // true
```

### TypeScript Support

Full autocomplete and type checking:

```typescript
import { validatePhone, AvailableCountryCode } from "phonyjs";

// TypeScript autocompletes all 63 country codes
const countryCode: AvailableCountryCode = "ru";

// Type error if using unsupported country
validatePhone("xx", "123456789"); // ❌ TypeScript error
```

### Tree-Shaking (Optimal Bundle Size)

Import only the validators you need:

```typescript
import { validateUS, validateGB, validatePL, validateRU } from "phonyjs";

validateUS("212-456-7890"); // true
validateGB("07912 345678"); // true
validatePL("123 456 789"); // true
validateRU("8 912 345 67 89"); // true
```

### Validator Registry

Access validators directly:

```typescript
import { validators } from "phonyjs";

// Get all available country codes
const countries = Object.keys(validators);
console.log(countries.length); // 63

// Use validators directly
validators.us("212-456-7890"); // true
validators.sa("+966 50 123 4567"); // true
```

### Fallback for Unsupported Countries

```typescript
import { validatePhoneWithFallback } from "phonyjs";

// Returns true for basic validation if country not supported
validatePhoneWithFallback("us", "212-456-7890"); // true
validatePhoneWithFallback("zz", "+1234567890"); // true (basic check)
validatePhoneWithFallback("zz", "invalid", true); // false (strict mode)
```

## Validation Features

### International Format Support

All validators support international dialing codes:

- `+XX` prefix format (e.g., `+1`, `+44`, `+966`)
- Automatic country code stripping and normalization
- Handles various formatting (spaces, dashes, parentheses)

### Mobile & Landline Support

Every country validator supports both:

- ✅ Mobile numbers (with operator-specific prefixes)
- ✅ Landline numbers (with area codes)

### Format Flexibility

```typescript
// All these are valid for US numbers:
validatePhone("us", "2124567890");
validatePhone("us", "212-456-7890");
validatePhone("us", "(212) 456-7890");
validatePhone("us", "+1 212 456 7890");
validatePhone("us", "1-212-456-7890");
```

## API Reference

### `validatePhone(countryCode, phoneNumber)`

Main validation function.

```typescript
function validatePhone(
  countryCode: AvailableCountryCode,
  phoneNumber: string
): boolean;
```

**Parameters:**

- `countryCode` - Two-letter ISO country code
- `phoneNumber` - Phone number string (any format)

**Returns:** `boolean` - `true` if valid for that country

### `validatePhoneWithFallback(countryCode, phoneNumber, strict?)`

Validation with fallback for unsupported countries.

```typescript
function validatePhoneWithFallback(
  countryCode: string,
  phoneNumber: string,
  strict?: boolean
): boolean;
```

**Parameters:**

- `countryCode` - Any country code string
- `phoneNumber` - Phone number string
- `strict` - If true, returns false for unsupported countries

### Individual Validators

Each country has its own named export:

```typescript
import {
  validateUS,
  validateGB,
  validatePL,
  validateSA,
  validateRU,
  validateJP,
  validateCN,
  validateDE,
  validateFR,
  validateAU,
  // ... and 53 more!
} from "phonyjs";
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

To add a new country:

1. Create validator in `src/validators/XX.ts`
2. Add to registry in `src/validators/index.ts`
3. Export in `src/index.ts`
4. Add tests in `test/XX.test.ts`

## Author

**Patryk Biegański**

- GitHub: [@BieganskiP](https://github.com/BieganskiP)
- LinkedIn: [in/patrykbieganski](https://www.linkedin.com/in/patrykbieganski)

Fullstack Developer specializing in JavaScript/TypeScript, ReactJS, NodeJS, NestJS, MongoDB, and MySQL.

## Support This Project ☕

If you find PhonyJS useful, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buycoffee.to/pbieganski)

Your support helps:

- 🌍 Add more countries
- 🐛 Fix bugs and improve validation
- 📚 Maintain documentation
- ✨ Build new features

[**☕ Support PhonyJS**](https://buycoffee.to/pbieganski)

## License

MIT © [Patryk Biegański](https://github.com/BieganskiP)

## Stats

- 🌍 **63 countries** across 6 continents
- 👥 **5+ billion people** covered (~70% of world population)
- 📦 **23.37 KB** (ESM) - lightweight!
- ✅ **413 tests** - 100% pass rate
- 🚀 **Production-ready** - battle-tested

## Roadmap

### ✅ Completed

- [x] 63 countries with mobile & landline support
- [x] Full TypeScript support with autocomplete
- [x] Tree-shaking optimization
- [x] International format handling
- [x] Zero dependencies
- [x] Comprehensive test coverage (413 tests)

### 🚀 Planned Features

#### Expand Coverage

- [ ] Add remaining countries to achieve **global coverage** (190+ countries)
- [ ] Region-specific validation (states, provinces)

#### Enhanced Validation

- [ ] **Detailed error messages** instead of boolean
  - "Too short" / "Too long"
  - "Invalid characters"
  - "Invalid area code"
  - "Invalid mobile prefix"
  - "Invalid format"
- [ ] Validation with error details: `{ isValid: boolean, error?: string }`

#### New Utilities

- [ ] Phone number formatting utilities
- [ ] Phone number parsing (extract country code, area code, etc.)
- [ ] Carrier/operator detection
- [ ] Number type detection (mobile vs landline)

---

**PhonyJS** - The most comprehensive type-safe phone validation library for JavaScript/TypeScript 🚀
