# Copilot Instructions for UNICN

## Project Overview
UNICN is a React Native UI component library inspired by shadcn/ui, built with Expo and React Native Unistyles. It provides customizable components with built-in theming, CLI tooling, and cross-platform support (iOS, Android, Web).

## Notes

- The complete documentation includes all content from the official documentation
- The content is automatically generated from the same source as the official documentation


## Architecture & Design Patterns

### Theme System (unistyles.ts)
- **Centralized constants**: All design tokens (spacing, colors, borderRadius, fontSize, etc.) are defined as constants and reused across themes
- **Theme structure**: `colors` object contains both light/dark variants, themes reference these constants
- **Type safety**: Full TypeScript support with module declaration augmentation for UnistylesBreakpoints and UnistylesThemes

### Component Structure Pattern
All UI components follow this consistent pattern:
```typescript
// 1. Import React Native Unistyles StyleSheet
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

// 2. Props interface extending UnistylesVariants
interface ComponentProps extends UnistylesVariants<typeof styles> {
  // other props...
}

// 3. Component with variants and default values
export function Component({ 
  variant = 'default', 
  size = 'default',
  ...props 
}: ComponentProps) {
  styles.useVariants({
    variant,
    size,
  });

  return (
    <View style={styles.container}>
      {/* content */}
    </View>
  );
}

// 4. Styles with unified variants structure
const styles = StyleSheet.create((theme) => ({
  container: {
    // base styles using theme constants
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    variants: {
      variant: {
        default: { /* variant styles */ },
        secondary: { /* variant styles */ },
      },
      size: {
        default: { /* size styles */ },
        sm: { /* size styles */ },
        lg: { /* size styles */ },
      },
    },
  },
}));
```

### File Organization
- `components/ui/` - All UI components with consistent export from `index.ts`
- `unistyles.ts` - Single source of truth for all design tokens and theme configuration
- `lib/cli.ts` - Component registry and CLI logic for adding/managing components
- `app/(tabs)/` - Expo Router file-based navigation with tab structure

## Key Development Workflows

### Adding New Components
1. Create component in `components/ui/ComponentName.tsx` following the established pattern
2. Add export to `components/ui/index.ts`
3. Register in `lib/cli.ts` components registry with dependencies and file paths
4. Use theme constants from `unistyles.ts` - never hardcode values

### Theming Workflow
- Modify colors in the centralized `colors` constant in `unistyles.ts`
- All components automatically inherit theme changes via `StyleSheet.create((theme) => ({}))`
- Test both light and dark themes as they share the same structure

### Development Commands
- `npm run dev` - Start Expo development server with telemetry disabled
- `npm run android/ios` - Run on specific platforms
- `npm run build:web` - Export for web platform
- `npm run lint` - Expo's built-in linting

## Critical Integration Points

### React Native Unistyles Setup
- `unistyles.ts` configures breakpoints, themes, and settings with `adaptiveThemes: true`
- Components access theme via `StyleSheet.create((theme) => ({}))` pattern
- Module declaration extends UnistylesBreakpoints and UnistylesThemes for full type safety

### CLI System
- `RNUI_CLI` class manages component registry and installation
- Components defined with dependencies, descriptions, and file paths
- AsyncStorage used for persistence of installed components and themes

### Expo Router Navigation
- File-based routing with `app/(tabs)/` structure
- `_layout.tsx` files define navigation structure
- `useFrameworkReady` hook for web compatibility

## Component-Specific Patterns

### Card Components
- Compound component pattern: `Card`, `CardHeader`, `CardContent`, `CardFooter`
- Uses `UnistylesVariants<typeof styles>` for type-safe variant props
- Variants defined within styles object using nested structure

### Button Components
- Six variants: default, destructive, outline, secondary, ghost, link
- Loading state with ActivityIndicator
- Boolean variants for disabled state
- Size and variant combinations via unified variants structure

## Type Safety Conventions
- Always import types with `import type`
- Use `UnistylesVariants<typeof styles>` to infer variant props automatically
- Extend component props with `UnistylesVariants<typeof styles>`
- Use const assertions for theme objects: `as const`
- Module declaration pattern for extending third-party library types

# React Native Unistyles 3.0

> Easily style cross platform React Native apps with a single StyleSheet

This documentation site is a source of truth for the good practices while building apps with React Native Unistyles.

## Documentation Sets

- [Abridged documentation](https://unistyl.es/llms-small.txt): a compact version of the documentation for React Native Unistyles 3.0, with non-essential content removed
- [Complete documentation](https://unistyl.es/llms-full.txt): the full documentation for React Native Unistyles 3.0