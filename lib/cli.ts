import AsyncStorage from '@react-native-async-storage/async-storage';

interface ComponentInfo {
  name: string;
  description: string;
  dependencies: string[];
  files: string[];
}

interface ThemeConfig {
  name: string;
  colors: Record<string, string>;
}

export class RNUI_CLI {
  private static instance: RNUI_CLI;
  
  static getInstance(): RNUI_CLI {
    if (!RNUI_CLI.instance) {
      RNUI_CLI.instance = new RNUI_CLI();
    }
    return RNUI_CLI.instance;
  }
  
  // Available components registry
  private components: Record<string, ComponentInfo> = {
    button: {
      name: 'Button',
      description: 'Displays a button or a component that looks like a button.',
      dependencies: ['react-native-unistyles'],
      files: ['components/ui/Button.tsx'],
    },
    card: {
      name: 'Card',
      description: 'Displays a card with header, content, and footer.',
      dependencies: ['react-native-unistyles'],
      files: ['components/ui/Card.tsx'],
    },
    input: {
      name: 'Input',
      description: 'Displays a form input field or a component that looks like an input field.',
      dependencies: ['react-native-unistyles'],
      files: ['components/ui/Input.tsx'],
    },
    badge: {
      name: 'Badge',
      description: 'Displays a badge or a component that looks like a badge.',
      dependencies: ['react-native-unistyles'],
      files: ['components/ui/Badge.tsx'],
    },
    avatar: {
      name: 'Avatar',
      description: 'An image element with a fallback for representing the user.',
      dependencies: ['react-native-unistyles'],
      files: ['components/ui/Avatar.tsx'],
    },
    switch: {
      name: 'Switch',
      description: 'A control that allows the user to toggle between checked and not checked.',
      dependencies: ['react-native-unistyles', 'react-native-reanimated'],
      files: ['components/ui/Switch.tsx'],
    },
  };
  
  // Available themes
  private themes: Record<string, ThemeConfig> = {
    default: {
      name: 'Default',
      colors: {
        primary: '#18181b',
        secondary: '#f4f4f5',
        destructive: '#ef4444',
        background: '#ffffff',
        foreground: '#18181b',
      },
    },
    dark: {
      name: 'Dark',
      colors: {
        primary: '#fafafa',
        secondary: '#27272a',
        destructive: '#ef4444',
        background: '#09090b',
        foreground: '#fafafa',
      },
    },
    blue: {
      name: 'Blue',
      colors: {
        primary: '#3b82f6',
        secondary: '#e0e7ff',
        destructive: '#ef4444',
        background: '#ffffff',
        foreground: '#1e293b',
      },
    },
    green: {
      name: 'Green',
      colors: {
        primary: '#22c55e',
        secondary: '#dcfce7',
        destructive: '#ef4444',
        background: '#ffffff',
        foreground: '#1e293b',
      },
    },
  };
  
  // Get all available components
  async getComponents(): Promise<ComponentInfo[]> {
    return Object.values(this.components);
  }
  
  // Get component by name
  async getComponent(name: string): Promise<ComponentInfo | null> {
    return this.components[name.toLowerCase()] || null;
  }
  
  // Install a component (simulate CLI behavior)
  async installComponent(componentName: string): Promise<{ success: boolean; message: string }> {
    const component = await this.getComponent(componentName);
    
    if (!component) {
      return {
        success: false,
        message: `Component "${componentName}" not found. Available components: ${Object.keys(this.components).join(', ')}`
      };
    }
    
    try {
      // Simulate installation process
      await this.saveInstalledComponent(componentName);
      
      return {
        success: true,
        message: `Successfully installed ${component.name} component. Files: ${component.files.join(', ')}`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to install ${component.name}: ${error}`
      };
    }
  }
  
  // Get all available themes
  async getThemes(): Promise<ThemeConfig[]> {
    return Object.values(this.themes);
  }
  
  // Set active theme
  async setTheme(themeName: string): Promise<{ success: boolean; message: string }> {
    const theme = this.themes[themeName.toLowerCase()];
    
    if (!theme) {
      return {
        success: false,
        message: `Theme "${themeName}" not found. Available themes: ${Object.keys(this.themes).join(', ')}`
      };
    }
    
    try {
      await AsyncStorage.setItem('rnui_active_theme', themeName.toLowerCase());
      
      return {
        success: true,
        message: `Successfully set theme to "${theme.name}"`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to set theme: ${error}`
      };
    }
  }
  
  // Get current active theme
  async getActiveTheme(): Promise<string> {
    try {
      const theme = await AsyncStorage.getItem('rnui_active_theme');
      return theme || 'default';
    } catch {
      return 'default';
    }
  }
  
  // Get installed components
  async getInstalledComponents(): Promise<string[]> {
    try {
      const installed = await AsyncStorage.getItem('rnui_installed_components');
      return installed ? JSON.parse(installed) : [];
    } catch {
      return [];
    }
  }
  
  // Save installed component
  private async saveInstalledComponent(componentName: string): Promise<void> {
    const installed = await this.getInstalledComponents();
    if (!installed.includes(componentName)) {
      installed.push(componentName);
      await AsyncStorage.setItem('rnui_installed_components', JSON.stringify(installed));
    }
  }
  
  // Generate CLI help
  async getHelp(): Promise<string> {
    const components = await this.getComponents();
    const themes = await this.getThemes();
    
    return `
React Native UI CLI

USAGE:
  rnui <command> [options]

COMMANDS:
  add <component>     Add a component to your project
  theme <name>        Set the active theme
  list               List all available components
  themes             List all available themes
  installed          List installed components

AVAILABLE COMPONENTS:
${components.map(c => `  ${c.name.toLowerCase().padEnd(15)} ${c.description}`).join('\n')}

AVAILABLE THEMES:
${themes.map(t => `  ${t.name.toLowerCase().padEnd(15)} ${t.name} theme`).join('\n')}

EXAMPLES:
  rnui add button
  rnui add card input
  rnui theme dark
  rnui list
`;
  }
}

// Export singleton instance
export const cli = RNUI_CLI.getInstance();