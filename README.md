# UNICRN Component Library

A modern React Native component library built with Unistyles 3.0, featuring beautiful, customizable components and hooks with performance optimization. Install components and hooks individually via CLI for optimal bundle size.

## Features

- 🎨 **Modern Design**: Clean, beautiful components following modern design principles
- ⚡ **Performance Optimized**: Built with Unistyles 3.0 for optimal performance
- 🎯 **TypeScript First**: Fully typed components and hooks with excellent developer experience
- 📱 **React Native**: Designed specifically for React Native applications
- 🎭 **Variant System**: Flexible component variants for different use cases
- 🎨 **Customizable**: Easy to customize colors, sizes, and styles
- 📦 **CLI-Based**: Install only the components and hooks you need
- ⚙️ **Configurable**: Customize installation paths and preferences
- 🪝 **Hooks Included**: Useful React hooks for common patterns

## Quick Start

```bash
# Initialize unicrn in your React Native project
npx unicrn init

# Install required dependencies
npm install react-native-unistyles react-native-reanimated expo-router

# Add components as needed
npx unicrn add button card input

# Add hooks as needed
npx unicrn add usedisclose

# Import and use in your app
import { Button, Card } from './components/ui';
import { useDisclose } from './components/hooks';
```

## CLI Commands

### Initialize Project

```bash
npx unicrn init
```

Creates:
- `components/ui/` directory for your UI components
- `components/hooks/` directory for your React hooks
- `components/ui/index.ts` for component exports
- `components/hooks/index.ts` for hook exports
- `components/unistyles.ts` theme configuration
- `index.ts` entry point with Expo Router and Unistyles setup

### Add Components and Hooks

```bash
# Add single component
npx unicrn add button

# Add multiple components
npx unicrn add button card input badge

# Add hooks
npx unicrn add usedisclose

# Mix components and hooks
npx unicrn add button usedisclose card
```

### Remove Components and Hooks

```bash
# Remove single component or hook
npx unicrn remove button

# Remove multiple items
npx unicrn remove button card usedisclose
```

### Manage Themes

```bash
# Set theme
npx unicrn theme dark

# List available themes
npx unicrn themes
```

### List Available Items

```bash
# List all available components and hooks
npx unicrn list
```

### Get Help

```bash
npx unicrn --help
```

## Available Components

- **Button** - Displays a button with multiple variants
- **Card** - Container with header, content, and footer
- **Input** - Form input field with validation styles
- **Badge** - Small status indicators
- **Avatar** - User profile images with fallbacks
- **Switch** - Toggle control with animations
- **Typography** - Text components with semantic variants
- **Dialog** - Modal dialogs with backdrop
- **Checkbox** - Checkbox inputs with multiple sizes
- **OTPInput** - One-time password input
- **Radio** - Radio button groups

## Available Hooks

- **useDisclose** - Hook for managing disclosure state (open/close) for modals, dialogs, etc.

## Available Themes

- **Default** - Clean light theme
- **Dark** - Modern dark theme
- **Blue** - Blue accent theme
- **Green** - Green accent theme

## Usage Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { Button, Card, CardContent, CardHeader, Typography } from './components/ui';
import { useDisclose } from './components/hooks';

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Card>
        <CardHeader>
          <Typography variant="h2">Welcome</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            Get started with beautiful React Native components and hooks.
          </Typography>
          <Button 
            variant="default" 
            onPress={onOpen}
          >
            Open Dialog
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
```

## Requirements

- React Native 0.70+
- Expo SDK 49+ (if using Expo)
- Node.js 16+

## Dependencies

The CLI will prompt you to install these dependencies:

```bash
npm install react-native-unistyles react-native-reanimated expo-router lucide-react-native
```

## Configuration

The CLI uses a `unicrn.config.json` file for configuration:

```json
{
  "componentsFolder": "components"
}
```

You can customize the installation directory by modifying this file.

## Hook Documentation

### useDisclose

A hook for managing disclosure state (open/close) for modals, dialogs, drawers, etc.

```tsx
import { useDisclose } from './components/hooks';

function MyComponent() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclose();

  return (
    <View>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal visible={isOpen} onRequestClose={onClose}>
        {/* Modal content */}
      </Modal>
    </View>
  );
}
```

## Theming

The library includes several built-in themes:

- **Default** - Clean light theme
- **Dark** - Dark mode variant
- **Blue** - Blue accent theme
- **Green** - Green accent theme

### Custom Themes

Create custom themes by extending the base theme configuration:

```typescript
const customTheme = {
  colors: {
    primary: '#your-brand-color',
    secondary: '#your-secondary-color',
    // ... other colors
  },
  spacing: {
    // ... custom spacing
  },
  borderRadius: {
    // ... custom border radius
  }
};
```

## Component Documentation

Each component is fully typed and includes comprehensive props:

### Button

```tsx
<Button
  title="Click me"
  variant="default" // default | secondary | outline | destructive | ghost | link
  size="default"    // default | sm | lg | icon
  loading={false}
  disabled={false}
  onPress={() => {}}
/>
```

### Card

```tsx
<Card>
  <CardHeader>
    <Text>Card Title</Text>
  </CardHeader>
  <CardContent>
    <Text>Card content goes here</Text>
  </CardContent>
  <CardFooter>
    <Button title="Action" />
  </CardFooter>
</Card>
```

## Development

```bash
# Clone the repository
git clone https://github.com/periabyte/unicrn.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for web
npm run build:web

# Lint the code
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Inspired by [shadcn/ui](https://ui.shadcn.com/) and built with:

- [Expo](https://expo.dev/)
- [React Native Unistyles](https://reactnativeunistyles.vercel.app/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lucide React Native](https://lucide.dev/)
