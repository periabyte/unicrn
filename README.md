# UNICRN CLI

A CLI tool for adding React Native UI components inspired by shadcn/ui, built with React Native Unistyles. Copy and paste beautiful, customizable components into your React Native projects.

## Features

- 🎨 **Beautiful Components** - 10+ professionally designed components
- 🛠️ **CLI Tool** - Install components individually to keep bundle size small
- 🎭 **Theming System** - Powerful theming with React Native Unistyles
- 📱 **Cross Platform** - Components work on iOS, Android, and Web
- 🌙 **Dark Mode** - Built-in support for light and dark themes
- 📖 **Copy & Paste** - Add only the components you need

## Quick Start

```bash
# Initialize unicrn in your React Native project
npx unicrn@latest init

# Install required dependencies
npm install react-native-unistyles react-native-reanimated expo-router

# Add components as needed
npx unicrn@latest add button card input

# Import and use in your app
import { Button, Card } from '@/components/ui';
```

## CLI Commands

### Initialize Project
```bash
npx unicrn@latest init
```
Creates:
- `components/ui/` directory for your UI components
- `components/ui/index.ts` for component exports
- `index.ts` entry point with Expo Router and Unistyles setup
- Downloads `unistyles.ts` theme configuration

### Add Components
```bash
# Add single component
npx unicrn@latest add button

# Add multiple components
npx unicrn@latest add button card input badge
```

### Manage Themes
```bash
# Set theme
npx unicrn@latest theme dark

# List available themes
npx unicrn@latest themes
```

### List Components
```bash
# List all available components
npx unicrn@latest list
```

### Get Help
```bash
npx unicrn@latest --help
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

## Available Themes

- **Default** - Clean light theme
- **Dark** - Modern dark theme
- **Blue** - Blue accent theme
- **Green** - Green accent theme

## Usage Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { Button, Card, CardContent, CardHeader, Typography } from '@/components/ui';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Card>
        <CardHeader>
          <Typography variant="h2">Welcome</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            Get started with beautiful React Native components.
          </Typography>
          <Button 
            variant="default" 
            onPress={() => console.log('Pressed!')}
          >
            Get Started
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

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- [GitHub Issues](https://github.com/periabyte/unicrn/issues)
- [Documentation](https://github.com/periabyte/unicrn)

## Manual Installation

If you prefer to install dependencies manually:

```bash
# Install the required dependencies
npm install react-native-unistyles react-native-reanimated react-native-svg lucide-react-native

# For iOS, run pod install
cd ios && pod install
```

## Quick Start

1. **Initialize your React Native Expo project with unicrn**:

```bash
# Initialize unicrn in your project
npx unicrn@latest init
```

This will create:
- `components/ui/` directory for your UI components
- `components/ui/index.ts` for component exports
- `index.ts` entry point with Expo Router and Unistyles setup
- Download `unistyles.ts` theme configuration

2. **Install required dependencies**:

```bash
npm install react-native-unistyles react-native-reanimated expo-router
```

3. **Add components as needed**:

```bash
npx unicrn@latest add button card input
```

4. **Import and use components**:

```typescript
import { Button, Card, CardContent } from '@/components/ui';

export default function App() {
  return (
    <Card>
      <CardContent>
        <Button title="Get Started" onPress={() => {}} />
      </CardContent>
    </Card>
  );
}
```

## CLI Usage

The CLI tool helps you manage components and themes:

```bash
# Install a component
rnui add button

# Install multiple components
rnui add button card input

# Set theme
rnui theme dark

# List available components
rnui list

# Show available themes
rnui themes

# Show installed components
rnui installed

# Get help
rnui help
```

## Available Components

- **Button** - Various button variants and sizes
- **Card** - Container with header, content, and footer
- **Input** - Text input with validation states
- **Badge** - Small status indicators
- **Avatar** - User profile images with fallbacks
- **Switch** - Toggle control with smooth animations
- **Text** - Flexible text component with styling variants
- **Heading** - Semantic heading components (H1-H6)
- **Typography** - Unified typography system with semantic components (H1-H6, Text, Lead, Muted, Code, Blockquote) and size variants
- **Dialog** - Modal dialog component with backdrop and animations
- **Checkbox** - Checkbox input with multiple sizes and variants
- **Radio** - Radio button group component for single selection
- **OTPInput** - One-time password input component with multiple digits

> **Note on Carousel**: For carousel functionality, we recommend using [react-native-carousel](https://rn-carousel.dev/) which provides better performance and platform-specific optimizations. See [docs/CAROUSEL.md](docs/CAROUSEL.md) for details.

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
# Start the development server
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