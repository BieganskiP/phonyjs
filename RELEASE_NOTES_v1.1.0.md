# 🎉 PhonyJS v1.1.0 - 5 New Countries Added!

## 🌍 What's New

PhonyJS now supports **9 countries** (up from 4)! We've added 5 high-priority countries based on global usage and developer demand.

### New Countries

| Country      | Code | Format       | Example          |
| ------------ | ---- | ------------ | ---------------- |
| 🇫🇷 France    | `fr` | 10 digits    | `06 12 34 56 78` |
| 🇩🇪 Germany   | `de` | 10-11 digits | `0151 12345678`  |
| 🇮🇳 India     | `in` | 10 digits    | `98765 43210`    |
| 🇨🇦 Canada    | `ca` | 10 digits    | `416-234-5678`   |
| 🇦🇺 Australia | `au` | 10 digits    | `04 1234 5678`   |

### All Supported Countries

**9 countries total:**

- 🇵🇱 Poland (PL)
- 🇺🇸 United States (US)
- 🇬🇧 United Kingdom (GB)
- 🇸🇦 Saudi Arabia (SA)
- 🇫🇷 France (FR) ⭐ NEW
- 🇩🇪 Germany (DE) ⭐ NEW
- 🇮🇳 India (IN) ⭐ NEW
- 🇨🇦 Canada (CA) ⭐ NEW
- 🇦🇺 Australia (AU) ⭐ NEW

## 📊 Stats

- **Test Coverage**: 82 tests (up from 50)
- **Bundle Size**:
  - ESM: 3.15 KB
  - CJS: 3.44 KB
  - Types: 1.23 KB
- **Zero Dependencies**: Still no runtime dependencies!

## 🚀 Usage

### France

```typescript
import { validateFR } from "phonyjs";

validateFR("06 12 34 56 78"); // true - mobile
validateFR("01 23 45 67 89"); // true - landline (Paris)
validateFR("+33 6 12 34 56 78"); // true - international
```

### Germany

```typescript
import { validateDE } from "phonyjs";

validateDE("0151 12345678"); // true
validateDE("+49 151 12345678"); // true - international
validateDE("0162 1234567"); // true - different carrier
```

### India

```typescript
import { validateIN } from "phonyjs";

validateIN("98765 43210"); // true
validateIN("+91 98765 43210"); // true - international
validateIN("8123456789"); // true - starts with 8
```

### Canada

```typescript
import { validateCA } from "phonyjs";

validateCA("416-234-5678"); // true - Toronto
validateCA("604-555-1234"); // true - Vancouver
validateCA("+1 416 234 5678"); // true - international
```

### Australia

```typescript
import { validateAU } from "phonyjs";

validateAU("04 1234 5678"); // true
validateAU("+61 4 1234 5678"); // true - international
validateAU("0412 345 678"); // true - formatted
```

## 🔧 Validation Rules

### 🇫🇷 France (FR)

- **Format**: 10 digits
- **Mobile**: Start with 06 or 07
- **Landline**: Start with 01-05
- **International**: +33 (strips and adds 0)

### 🇩🇪 Germany (DE)

- **Format**: 10-11 digits
- **Mobile**: Start with 015, 016, or 017
- **International**: +49

### 🇮🇳 India (IN)

- **Format**: 10 digits
- **Mobile**: Start with 6, 7, 8, or 9
- **International**: +91

### 🇨🇦 Canada (CA)

- **Format**: 10 digits (NANP)
- **Rules**: Same as US
- **Area code**: Cannot start with 0 or 1
- **Exchange**: Cannot start with 0 or 1
- **International**: +1

### 🇦🇺 Australia (AU)

- **Format**: 10 digits
- **Mobile**: Start with 04
- **International**: +61 (strips and adds 0)

## 📦 Installation

```bash
npm install phonyjs
```

## 💡 Breaking Changes

None! This is a **minor version** update. All existing code continues to work.

## 🎯 Type Safety

TypeScript users get automatic autocomplete for all 9 countries:

```typescript
import { validatePhone, AvailableCountryCode } from "phonyjs";

// TypeScript knows about all 9 countries
const country: AvailableCountryCode = "fr"; // ✅ Autocomplete works!

validatePhone("de", "015112345678"); // ✅ Type-safe
validatePhone("xx", "123456789"); // ❌ TypeScript error
```

## 🌐 Fallback Support

Don't have a specific validator? Use the generic fallback:

```typescript
import { validatePhoneWithFallback } from "phonyjs";

// Uses specific validator for FR
validatePhoneWithFallback("fr", "0612345678"); // true

// Falls back to generic for unsupported countries
validatePhoneWithFallback("jp", "09012345678"); // true (generic)

// Strict mode - only specific validators
validatePhoneWithFallback("jp", "09012345678", { strict: true }); // false
```

## 📈 Performance

- Fast regex-based validation
- No API calls or I/O
- Tree-shakeable (import only what you need)
- Minimal bundle impact (~3KB for everything)

## 🤝 Contributing

Want to add your country? Check out [ADDING_COUNTRIES.md](ADDING_COUNTRIES.md) for a step-by-step guide!

## 🔗 Links

- **NPM**: https://www.npmjs.com/package/phonyjs
- **GitHub**: https://github.com/BieganskiP/phonyjs
- **Author**: [Patryk Biegański](https://github.com/BieganskiP)
- **Docs**: See README.md

## 🙏 Thank You!

Thanks to everyone who requested these countries. More countries coming soon!

---

**Install now:** `npm install phonyjs@latest`
