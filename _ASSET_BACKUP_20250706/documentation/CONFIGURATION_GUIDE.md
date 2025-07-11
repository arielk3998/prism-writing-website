# Site Configuration Documentation

## Overview

This project now uses a centralized configuration system to ensure consistency across all pages. All shared variables like pricing, service descriptions, company information, and other content are managed from a single source of truth.

## Configuration Files

### `src/config/siteConfig.ts`

This is the main configuration file containing all shared data:

- **Company Information**: Name, description, contact details
- **Services**: Complete service definitions with pricing, descriptions, and features
- **Pricing Packages**: Starter, Professional, and Enterprise packages
- **Industries**: Industries served with descriptions and icons
- **Features**: Company features and value propositions
- **Navigation**: Site navigation structure
- **CTA (Call-to-Action)**: Primary and secondary CTAs
- **Meta Information**: SEO data and keywords

### `src/components/ui/Icons.tsx`

Centralized icon components used throughout the site:
- Service icons (document, book, academic, clipboard, code, edit)
- Feature icons (check-circle, clock, users)
- Industry icons (chip, heart, currency, beaker)
- UI icons (arrow)

### `src/components/shared/Cards.tsx`

Reusable card components:
- **ServiceCard**: Displays service information with pricing
- **FeatureCard**: Shows company features and benefits
- **IndustryCard**: Industry focus areas (simple and detailed versions)
- **PackageCard**: Pricing package information

## Benefits of Centralized Configuration

1. **Consistency**: All pricing, descriptions, and content are guaranteed to be identical across pages
2. **Maintenance**: Update content in one place, automatically reflected everywhere
3. **Type Safety**: TypeScript ensures data integrity and consistency
4. **Scalability**: Easy to add new services, packages, or content
5. **Developer Experience**: Clear structure makes it easy to understand and modify

## Usage Examples

### Adding a New Service

```typescript
// In src/config/siteConfig.ts
{
  id: "new-service",
  title: "New Service Name",
  description: "Service description",
  icon: "icon-name",
  features: [
    "Feature 1",
    "Feature 2"
  ],
  startingPrice: 2000,
  category: "category"
}
```

### Updating Pricing

All pricing is centralized in the `services` array. Update the `startingPrice` field for individual services, or modify the `packages` array for package pricing.

### Adding New Industries

```typescript
// In src/config/siteConfig.ts
{
  id: "new-industry",
  title: "Industry Name",
  description: "Industry description",
  icon: "icon-name"
}
```

## File Structure

```
src/
├── config/
│   └── siteConfig.ts          # Main configuration file
├── components/
│   ├── ui/
│   │   └── Icons.tsx          # Icon components
│   └── shared/
│       └── Cards.tsx          # Reusable card components
├── app/
│   ├── page.tsx              # Homepage (uses config)
│   └── services/
│       └── page.tsx          # Services page (uses config)
```

## Best Practices

1. **Always use the config**: Don't hardcode content that should be shared
2. **Update pricing centrally**: All pricing changes should go through `siteConfig.ts`
3. **Use TypeScript**: Leverage type safety for consistency
4. **Test after changes**: Always build and test after configuration updates
5. **Deploy carefully**: Use the build process to catch any configuration errors

## Maintenance

When updating content:

1. Edit `src/config/siteConfig.ts`
2. Run `npm run build` to test
3. Deploy with `npx vercel --prod`
4. Verify changes on the live site

This system ensures that pricing and other critical business information remains consistent across the entire website, eliminating the risk of showing different prices or descriptions on different pages.
