# React Native UI Library

A beautiful, customizable component library for React Native applications, inspired by shadcn/ui and built with Expo and React Native Unistyles.

## Features

- 🎨 **Beautiful Components** - Over 20+ professionally designed components
- 🎭 **Theming System** - Powerful theming with React Native Unistyles
- 🛠️ **CLI Tool** - Install components individually to keep bundle size small
- 📱 **Cross Platform** - Works on iOS, Android, and Web
- 🌙 **Dark Mode** - Built-in support for light and dark themes
- ⚡ **Performance** - Optimized with React Native Reanimated
- 📖 **Documentation** - Interactive documentation with live examples

## Installation

```bash
# Install the required dependencies
npm install react-native-unistyles react-native-reanimated react-native-svg

# For iOS, run pod install
cd ios && pod install
```

## Quick Start

1. **Setup Unistyles configuration**:

```typescript
// unistyles.config.ts
import { UnistylesRegistry } from 'react-native-unistyles';
// ... import your theme configuration
```

2. **Import and use components**:

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

```typescript
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

```typescript
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