#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const https = require('https');

program
  .name('unicrn')
  .description('UNICRN CLI - Unistyles + Components + React Native')
  .version('1.0.0');

// Init command to set up project structure
program
  .command('init')
  .description('Initialize unicrn in your React Native project')
  .action(async () => {
    try {
      await initProject();
    } catch (error) {
      console.error('❌ Failed to initialize project:', error.message);
      process.exit(1);
    }
  });

// Add component command
program
  .command('add')
  .description('Add a component to your project')
  .argument('<components...>', 'component names to add')
  .action(async (components) => {
    try {
      // Check if project is initialized
      if (!isProjectInitialized()) {
        console.error('❌ Project not initialized. Run "unicrn init" first.');
        process.exit(1);
      }

      for (const component of components) {
        await addComponent(component);
      }
    } catch (error) {
      console.error('❌ Failed to add components:', error.message);
      process.exit(1);
    }
  });

// List components command
program
  .command('list')
  .description('List all available components')
  .action(async () => {
    try {
      await listComponents();
    } catch (error) {
      console.error('❌ Failed to list components:', error.message);
      process.exit(1);
    }
  });

// Theme commands
program
  .command('theme')
  .description('Set the active theme')
  .argument('<theme>', 'theme name to set')
  .action(async (theme) => {
    try {
      await setTheme(theme);
    } catch (error) {
      console.error('❌ Failed to set theme:', error.message);
      process.exit(1);
    }
  });

program
  .command('themes')
  .description('List all available themes')
  .action(async () => {
    try {
      await listThemes();
    } catch (error) {
      console.error('❌ Failed to list themes:', error.message);
      process.exit(1);
    }
  });

// Components registry
const components = {
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
    description:
      'Displays a form input field or a component that looks like an input field.',
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
    description:
      'A control that allows the user to toggle between checked and not checked.',
    dependencies: ['react-native-unistyles', 'react-native-reanimated'],
    files: ['components/ui/Switch.tsx'],
  },
  typography: {
    name: 'Typography',
    description:
      'Unified typography component with semantic variants like shadcn/ui.',
    dependencies: ['react-native-unistyles'],
    files: ['components/ui/Typography.tsx'],
  },
  dialog: {
    name: 'Dialog',
    description: 'Modal dialog component with backdrop and animations.',
    dependencies: ['react-native-unistyles', 'lucide-react-native'],
    files: ['components/ui/Dialog.tsx'],
  },
  checkbox: {
    name: 'Checkbox',
    description: 'Checkbox input with multiple sizes and variants.',
    dependencies: ['react-native-unistyles', 'lucide-react-native'],
    files: ['components/ui/Checkbox.tsx'],
  },
  otpinput: {
    name: 'OTPInput',
    description: 'One-time password input component with multiple digits.',
    dependencies: ['react-native-unistyles'],
    files: ['components/ui/OTPInput.tsx'],
  },
  radio: {
    name: 'Radio',
    description: 'Radio button group component for single selection.',
    dependencies: ['react-native-unistyles'],
    files: ['components/ui/Radio.tsx'],
  },
};

const themes = {
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

// Base URL for fetching components
const BASE_URL = 'https://raw.githubusercontent.com/periabyte/unicrn/main';

function isProjectInitialized() {
  return (
    fs.existsSync(path.join(process.cwd(), 'unistyles.ts')) ||
    fs.existsSync(path.join(process.cwd(), 'components', 'ui')) ||
    fs.existsSync(path.join(process.cwd(), 'index.ts'))
  );
}

async function initProject() {
  console.log('🚀 Initializing unicrn in your project...');

  try {
    // Create components/ui directory
    const uiDir = path.join(process.cwd(), 'components', 'ui');
    if (!fs.existsSync(uiDir)) {
      fs.mkdirSync(uiDir, { recursive: true });
      console.log('📁 Created components/ui directory');
    }

    // Create components/ui/index.ts file
    const componentIndexPath = path.join(uiDir, 'index.ts');
    if (!fs.existsSync(componentIndexPath)) {
      fs.writeFileSync(
        componentIndexPath,
        '// Export your UI components here\n'
      );
      console.log('📄 Created components/ui/index.ts');
    }

    // Create/update root index.ts file for Expo entry point
    const rootIndexPath = path.join(process.cwd(), 'index.ts');
    const indexContent = `import 'expo-router/entry';
import './unistyles.ts';
`;

    if (!fs.existsSync(rootIndexPath)) {
      fs.writeFileSync(rootIndexPath, indexContent);
      console.log('📄 Created index.ts entry point');
    } else {
      // Check if it already has the required imports
      const existingContent = fs.readFileSync(rootIndexPath, 'utf8');
      let needsUpdate = false;
      let updatedContent = existingContent;

      if (!existingContent.includes("import 'expo-router/entry'")) {
        updatedContent = `import 'expo-router/entry';\n` + updatedContent;
        needsUpdate = true;
      }

      if (!existingContent.includes("import './unistyles.ts'")) {
        // Add after expo-router import if it exists
        if (updatedContent.includes("import 'expo-router/entry'")) {
          updatedContent = updatedContent.replace(
            "import 'expo-router/entry';",
            "import 'expo-router/entry';\nimport './unistyles.ts';"
          );
        } else {
          updatedContent = `import './unistyles.ts';\n` + updatedContent;
        }
        needsUpdate = true;
      }

      if (needsUpdate) {
        fs.writeFileSync(rootIndexPath, updatedContent);
        console.log('📄 Updated index.ts entry point');
      }
    }

    // Download unistyles.ts if it doesn't exist
    const unistylesPath = path.join(process.cwd(), 'unistyles.ts');
    if (!fs.existsSync(unistylesPath)) {
      try {
        await downloadFile('unistyles.ts');
        console.log('🎨 Downloaded unistyles.ts theme configuration');
      } catch {
        console.log('⚠️  Could not download unistyles.ts automatically.');
        console.log(
          '   Please visit: https://github.com/periabyte/unicrn/blob/main/unistyles.ts'
        );
        throw new Error(
          'Failed to download unistyles.ts. Please copy it manually.'
        );
      }
    }

    console.log('\n✅ Project initialized successfully!');
    console.log('\n📋 Next steps:');
    console.log(
      '1. Install dependencies: npm install react-native-unistyles react-native-reanimated expo-router'
    );
    console.log('2. Add components: unicrn add button card');
    console.log(
      '3. Import in your app: import { Button } from "@/components/ui"'
    );
    console.log(
      '4. Make sure your package.json main field points to "index.ts"'
    );
  } catch (error) {
    console.error('❌ Failed to initialize project:', error.message);
    throw error;
  }
}

async function addComponent(componentName) {
  const component = components[componentName.toLowerCase()];

  if (!component) {
    console.error(`❌ Component "${componentName}" not found.`);
    console.log(`Available components: ${Object.keys(components).join(', ')}`);
    throw new Error(`Component "${componentName}" not found`);
  }

  try {
    console.log(`📦 Adding ${component.name} component...`);

    // Create components/ui directory if it doesn't exist
    const uiDir = path.join(process.cwd(), 'components', 'ui');
    if (!fs.existsSync(uiDir)) {
      fs.mkdirSync(uiDir, { recursive: true });
    }

    // Try to download component files
    let downloadSuccess = false;
    for (const file of component.files) {
      try {
        await downloadFile(file);
        downloadSuccess = true;
      } catch {
        console.log(`⚠️  Could not download ${file} automatically.`);
        console.log(`   Please copy it manually from: ${BASE_URL}/${file}`);
      }
    }

    // Update index.ts
    await updateIndexFile();

    if (downloadSuccess) {
      console.log(`✅ Successfully added ${component.name} component!`);
    } else {
      console.log(
        `⚠️  ${component.name} component added to registry, but files need manual copying.`
      );
    }

    console.log(`📁 Files: ${component.files.join(', ')}`);

    if (component.dependencies.length > 0) {
      console.log(
        `📋 Dependencies needed: ${component.dependencies.join(', ')}`
      );
      console.log(`💡 Run: npm install ${component.dependencies.join(' ')}`);
    }
  } catch (error) {
    console.error(`❌ Failed to add ${component.name}:`, error.message);
    throw error;
  }
}

async function downloadFile(filePath) {
  const url = `${BASE_URL}/${filePath}`;
  const localPath = path.join(process.cwd(), filePath);

  // Create directory if it doesn't exist
  const dir = path.dirname(localPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${filePath}: ${response.statusCode}`)
          );
          return;
        }

        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          fs.writeFileSync(localPath, data);
          resolve();
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

async function updateIndexFile() {
  const indexPath = path.join(process.cwd(), 'components', 'ui', 'index.ts');

  if (!fs.existsSync(indexPath)) {
    // Create new index file
    const exports = Object.values(components)
      .map((c) => `export * from './${c.name}';`)
      .join('\n');

    fs.writeFileSync(indexPath, exports + '\n');
  } else {
    // Read existing index and add missing exports
    const content = fs.readFileSync(indexPath, 'utf8');
    const existingExports = new Set(
      content
        .match(/export \* from '\.\/(\w+)';/g)
        ?.map((line) => line.match(/export \* from '\.\/(\w+)';/)[1]) || []
    );

    const newExports = [];
    Object.values(components).forEach((c) => {
      if (!existingExports.has(c.name)) {
        newExports.push(`export * from './${c.name}';`);
      }
    });

    if (newExports.length > 0) {
      fs.appendFileSync(indexPath, newExports.join('\n') + '\n');
    }
  }
}

async function listComponents() {
  console.log('\n📦 Available Components:\n');
  Object.entries(components).forEach(([key, component]) => {
    console.log(`  ${key.padEnd(15)} ${component.description}`);
  });
  console.log('\n💡 Usage: unicrn add <component-name>');
}

async function listThemes() {
  console.log('\n🎨 Available Themes:\n');
  Object.entries(themes).forEach(([key, theme]) => {
    console.log(`  ${key.padEnd(15)} ${theme.name} theme`);
  });
  console.log('\n💡 Usage: unicrn theme <theme-name>');
}

async function setTheme(themeName) {
  const theme = themes[themeName.toLowerCase()];

  if (!theme) {
    console.error(`❌ Theme "${themeName}" not found.`);
    console.log(`Available themes: ${Object.keys(themes).join(', ')}`);
    throw new Error(`Theme "${themeName}" not found`);
  }

  try {
    // Download unistyles.ts with the selected theme
    await downloadFile('unistyles.ts');

    console.log(`✅ Successfully set theme to "${theme.name}"!`);
    console.log(`📁 Updated: unistyles.ts`);
  } catch (error) {
    console.error(`❌ Failed to set theme:`, error.message);
    throw error;
  }
}

program.parse();
