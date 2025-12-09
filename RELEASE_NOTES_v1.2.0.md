# 🎉 PhonyJS v1.2.0 - 5 More Countries Added!

## 🌍 What's New

PhonyJS now supports **14 countries** (up from 9)! We've added 5 new countries focusing on Middle East and European markets.

### New Countries in v1.2.0

| Country | Code | Format | Example | Carriers |
|---------|------|--------|---------|----------|
| 🇦🇪 UAE | `ae` | 9 digits | `050 123 4567` | Etisalat, du |
| 🇪🇬 Egypt | `eg` | 10 digits | `010 1234 5678` | Vodafone, Etisalat, Orange, WE |
| 🇪🇸 Spain | `es` | 9 digits | `612 345 678` | All carriers |
| 🇮🇹 Italy | `it` | 10 digits | `320 123 4567` | All carriers |
| 🇳🇱 Netherlands | `nl` | 9 digits | `06 1234 5678` | All carriers |

### All 14 Supported Countries

**By Region:**

**Europe (7 countries):**
- 🇵🇱 Poland (PL)
- 🇬🇧 United Kingdom (GB)
- 🇫🇷 France (FR)
- 🇩🇪 Germany (DE)
- 🇪🇸 Spain (ES) ⭐ NEW
- 🇮🇹 Italy (IT) ⭐ NEW
- 🇳🇱 Netherlands (NL) ⭐ NEW

**North America (2 countries):**
- 🇺🇸 United States (US)
- 🇨🇦 Canada (CA)

**Middle East (3 countries):**
- 🇸🇦 Saudi Arabia (SA)
- 🇦🇪 UAE (AE) ⭐ NEW
- 🇪🇬 Egypt (EG) ⭐ NEW

**Asia-Pacific (2 countries):**
- 🇮🇳 India (IN)
- 🇦🇺 Australia (AU)

## 📊 Stats

- **Test Coverage**: 112 tests (up from 82)
- **Bundle Size**: 
  - ESM: 4.41 KB (still lightweight!)
  - CJS: 4.81 KB
  - Types: 1.61 KB
- **Zero Dependencies**: Still no runtime dependencies!

## 🚀 Usage Examples

### UAE (United Arab Emirates)
```typescript
import { validateAE } from 'phonyjs';

// Etisalat
validateAE("050 123 4567"); // true
validateAE("052 123 4567"); // true

// du
validateAE("054 123 4567"); // true
validateAE("055 123 4567"); // true

// International format
validateAE("+971 50 123 4567"); // true
```

### Egypt
```typescript
import { validateEG } from 'phonyjs';

// Vodafone
validateEG("010 1234 5678"); // true

// Etisalat
validateEG("011 1234 5678"); // true

// Orange
validateEG("012 1234 5678"); // true

// WE
validateEG("015 1234 5678"); // true

// International format
validateEG("+20 10 1234 5678"); // true
```

### Spain
```typescript
import { validateES } from 'phonyjs';

validateES("612 345 678"); // true
validateES("712 345 678"); // true
validateES("+34 612 345 678"); // true
```

### Italy
```typescript
import { validateIT } from 'phonyjs';

validateIT("320 123 4567"); // true
validateIT("339 123 4567"); // true
validateIT("+39 320 123 4567"); // true
```

### Netherlands
```typescript
import { validateNL } from 'phonyjs';

validateNL("06 1234 5678"); // true
validateNL("0612345678"); // true
validateNL("+31 6 1234 5678"); // true
```

## 🔧 Validation Rules

### 🇦🇪 UAE (AE)
- **Format**: 9 digits starting with 05
- **Valid prefixes**: 050, 052, 054, 055, 056, 058
- **Carriers**: Etisalat (050, 052, 056), du (054, 055, 058)
- **International**: +971

### 🇪🇬 Egypt (EG)
- **Format**: 10 digits starting with 01
- **Valid prefixes**: 010, 011, 012, 015
- **Carriers**: Vodafone (010), Etisalat (011), Orange (012), WE (015)
- **International**: +20

### 🇪🇸 Spain (ES)
- **Format**: 9 digits starting with 6 or 7
- **Mobile**: Any number starting with 6 or 7
- **International**: +34

### 🇮🇹 Italy (IT)
- **Format**: 10 digits starting with 3
- **Mobile**: Any number starting with 3
- **Common prefixes**: 32X, 33X, 34X, 35X, 36X, 37X, 38X, 39X
- **International**: +39

### 🇳🇱 Netherlands (NL)
- **Format**: 9 digits starting with 06
- **Mobile**: All mobile numbers start with 06
- **International**: +31

## 📦 Installation

```bash
npm install phonyjs@latest
```

## 💡 Breaking Changes

None! This is a **minor version** update. All existing code continues to work.

## 🎯 Type Safety

TypeScript automatically knows about all 14 countries:

```typescript
import { validatePhone, AvailableCountryCode } from 'phonyjs';

// TypeScript autocomplete shows all 14 countries
const country: AvailableCountryCode = 'ae'; // ✅
const country2: AvailableCountryCode = 'eg'; // ✅
const country3: AvailableCountryCode = 'es'; // ✅
```

## 🌐 Regional Coverage

### Strong Coverage In:
- ✅ **Western Europe**: 5 major countries (UK, FR, DE, ES, IT, NL)
- ✅ **Middle East**: 3 countries (SA, AE, EG)
- ✅ **North America**: Full NANP coverage (US, CA)
- ✅ **Asia-Pacific**: India, Australia

### Coming Soon:
- 🇧🇷 Brazil
- 🇲🇽 Mexico
- 🇯🇵 Japan
- 🇰🇷 South Korea
- 🇸🇬 Singapore
- And more!

## 📈 Growth Trajectory

| Version | Countries | Tests | Bundle Size |
|---------|-----------|-------|-------------|
| v1.0.0 | 4 | 50 | ~2KB |
| v1.1.0 | 9 | 82 | ~3KB |
| v1.2.0 | **14** | **112** | **~4.5KB** |

## 🤝 Contributing

Want to add your country? We now have 14 examples to learn from!

Check out [ADDING_COUNTRIES.md](ADDING_COUNTRIES.md) for a step-by-step guide.

## 🔗 Links

- **NPM**: https://www.npmjs.com/package/phonyjs
- **GitHub**: https://github.com/BieganskiP/phonyjs
- **Author**: [Patryk Biegański](https://github.com/BieganskiP)

## 🙏 Thank You!

Special thanks to everyone requesting these countries. Your feedback drives development!

---

**Upgrade now:** `npm install phonyjs@latest`

**14 countries and counting!** 🚀

