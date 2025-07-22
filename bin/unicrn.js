#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const https = require('https');

program
  .name('unicrn')
  .description('UNICRN CLI - Unistyles + Components + React Native')
  .version('1.0.4');

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

// Remove component command
program
  .command('remove')
  .description('Remove a component from your project')
  .argument('<components...>', 'component names to remove')
  .action(async (components) => {
    try {
      // Check if project is initialized
      if (!isProjectInitialized()) {
        console.error('❌ Project not initialized. Run "unicrn init" first.');
        process.exit(1);
      }

      for (const component of components) {
        await removeComponent(component);
      }
    } catch (error) {
      console.error('❌ Failed to remove components:', error.message);
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
    files: ['lib/components/ui/Button.tsx'],
  },
  card: {
    name: 'Card',
    description: 'Displays a card with header, content, and footer.',
    dependencies: ['react-native-unistyles'],
    files: ['lib/components/ui/Card.tsx'],
  },
  input: {
    name: 'Input',
    description:
      'Displays a form input field or a component that looks like an input field.',
    dependencies: ['react-native-unistyles'],
    files: ['lib/components/ui/Input.tsx'],
  },
  badge: {
    name: 'Badge',
    description: 'Displays a badge or a component that looks like a badge.',
    dependencies: ['react-native-unistyles'],
    files: ['lib/components/ui/Badge.tsx'],
  },
  avatar: {
    name: 'Avatar',
    description: 'An image element with a fallback for representing the user.',
    dependencies: ['react-native-unistyles'],
    files: ['lib/components/ui/Avatar.tsx'],
  },
  switch: {
    name: 'Switch',
    description:
      'A control that allows the user to toggle between checked and not checked.',
    dependencies: ['react-native-unistyles', 'react-native-reanimated'],
    files: ['lib/components/ui/Switch.tsx'],
  },
  typography: {
    name: 'Typography',
    description:
      'Unified typography component with semantic variants like shadcn/ui.',
    dependencies: ['react-native-unistyles'],
    files: ['lib/components/ui/Typography.tsx'],
  },
  dialog: {
    name: 'Dialog',
    description: 'Modal dialog component with backdrop and animations.',
    dependencies: ['react-native-unistyles', 'lucide-react-native'],
    files: ['lib/components/ui/Dialog.tsx'],
  },
  checkbox: {
    name: 'Checkbox',
    description: 'Checkbox input with multiple sizes and variants.',
    dependencies: ['react-native-unistyles', 'lucide-react-native'],
    files: ['lib/components/ui/Checkbox.tsx'],
  },
  otpinput: {
    name: 'OTPInput',
    description: 'One-time password input component with multiple digits.',
    dependencies: ['react-native-unistyles'],
    files: ['lib/components/ui/OTPInput.tsx'],
  },
  radio: {
    name: 'Radio',
    description: 'Radio button group component for single selection.',
    dependencies: ['react-native-unistyles'],
    files: ['lib/components/ui/Radio.tsx'],
  },
  usedisclose: {
    name: 'useDisclose',
    description: 'Hook for managing disclosure state (open/close) for modals, dialogs, etc.',
    dependencies: [],
    files: ['lib/hooks/useDisclose.ts'],
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
  const config = loadConfig();
  const componentsFolder = config.componentsFolder;
  
  return (
    fs.existsSync(path.join(process.cwd(), componentsFolder, 'unistyles.ts')) ||
    fs.existsSync(path.join(process.cwd(), componentsFolder, 'ui')) ||
    fs.existsSync(path.join(process.cwd(), 'unicrn.config.json'))
  );
}

async function initProject() {
  console.log('🚀 Initializing unicrn in your project...');

  try {
    // First, create unicrn.config.json config file if it doesn't exist
    const configPath = path.join(process.cwd(), 'unicrn.config.json');
    
    if (!fs.existsSync(configPath)) {
      console.log('🔧 Creating unicrn.config.json configuration...');
      
      const config = {
        "componentsFolder": "components"
      };
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log('✅ Created unicrn.config.json');
    } else {
      console.log('📄 Using existing unicrn.config.json');
    }

    // Load configuration
    const config = loadConfig();
    
    // Create components folder and UI subdirectory
    const componentsDir = path.join(process.cwd(), config.componentsFolder);
    const uiDir = path.join(componentsDir, 'ui');
    const hooksDir = path.join(componentsDir, 'hooks');
    
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
      console.log(`📁 Created ${config.componentsFolder} directory`);
    }

    if (!fs.existsSync(uiDir)) {
      fs.mkdirSync(uiDir, { recursive: true });
      console.log(`📁 Created ${config.componentsFolder}/ui directory`);
    }

    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
      console.log(`📁 Created ${config.componentsFolder}/hooks directory`);
    }

    // Create UI index.ts file (empty initially)
    const componentIndexPath = path.join(uiDir, 'index.ts');
    if (!fs.existsSync(componentIndexPath)) {
      const initialIndexContent = `// UNICRN Component Library
// Components will be automatically added here when you run: npx unicrn add <component>

`;
      fs.writeFileSync(componentIndexPath, initialIndexContent);
      console.log(`📄 Created empty ${config.componentsFolder}/ui/index.ts`);
    }

    // Create hooks index.ts file (empty initially)
    const hooksIndexPath = path.join(hooksDir, 'index.ts');
    if (!fs.existsSync(hooksIndexPath)) {
      const initialHooksIndexContent = `// UNICRN Hooks Library
// Hooks will be automatically added here when you run: npx unicrn add <hook>

`;
      fs.writeFileSync(hooksIndexPath, initialHooksIndexContent);
      console.log(`📄 Created empty ${config.componentsFolder}/hooks/index.ts`);
    }

    // Copy unistyles.ts to components folder if it doesn't exist
    const unistylesPath = path.join(componentsDir, 'unistyles.ts');
    if (!fs.existsSync(unistylesPath)) {
      try {
        let copied = false;
        
        // First try to copy from local package installation
        try {
          const packageDir = path.dirname(require.resolve('unicrn/package.json'));
          const sourceUnistylesPath = path.join(packageDir, 'lib', 'unistyles.ts');
          
          if (fs.existsSync(sourceUnistylesPath)) {
            fs.copyFileSync(sourceUnistylesPath, unistylesPath);
            console.log(`🎨 Copied unistyles.ts to ${config.componentsFolder}/`);
            copied = true;
          }
        } catch {
          // Package not found, try local development path
        }
        
        // If not found, try from current directory (local development)
        if (!copied) {
          const localUnistylesPath = path.join(__dirname, '..', 'lib', 'unistyles.ts');
          if (fs.existsSync(localUnistylesPath)) {
            fs.copyFileSync(localUnistylesPath, unistylesPath);
            console.log(`🎨 Copied unistyles.ts to ${config.componentsFolder}/`);
            copied = true;
          }
        }
        
        // Final fallback to download
        if (!copied) {
          await downloadFile(`${config.componentsFolder}/unistyles.ts`, 'unistyles.ts');
          console.log(`🎨 Downloaded unistyles.ts to ${config.componentsFolder}/`);
        }
      } catch {
        console.log('⚠️  Could not copy unistyles.ts automatically.');
        console.log(
          '   Please visit: https://github.com/periabyte/unicrn/blob/main/unistyles.ts'
        );
        throw new Error(
          'Failed to copy unistyles.ts. Please copy it manually.'
        );
      }
    }

    // Create/update root index.ts file for Expo entry point
    const rootIndexPath = path.join(process.cwd(), 'index.ts');
    const indexContent = `import 'expo-router/entry';
import './${config.componentsFolder}/unistyles.ts';
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

      const unistylesImport = `import './${config.componentsFolder}/unistyles.ts';`;
      if (!existingContent.includes(unistylesImport) && !existingContent.includes("import './unistyles.ts'")) {
        // Add after expo-router import if it exists
        if (updatedContent.includes("import 'expo-router/entry'")) {
          updatedContent = updatedContent.replace(
            "import 'expo-router/entry';",
            `import 'expo-router/entry';\n${unistylesImport}`
          );
        } else {
          updatedContent = `${unistylesImport}\n` + updatedContent;
        }
        needsUpdate = true;
      }

      if (needsUpdate) {
        fs.writeFileSync(rootIndexPath, updatedContent);
        console.log('📄 Updated index.ts entry point');
      }
    }

    console.log('\n✅ Project initialized successfully!');
    console.log('\n📋 Next steps:');
    console.log(
      '1. Install dependencies: npm install react-native-unistyles react-native-reanimated expo-router'
    );
    console.log('2. Add components: unicrn add button card');
    console.log('3. Add hooks: unicrn add usedisclose');
    console.log(
      `4. Import in your app: import { Button } from "./${config.componentsFolder}/ui"`
    );
    console.log(
      `5. Import hooks: import { useDisclose } from "./${config.componentsFolder}/hooks"`
    );
    console.log(
      '6. Make sure your package.json main field points to "index.ts"'
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

    // Load configuration and resolve paths
    const config = loadConfig();
    const componentsDir = path.join(process.cwd(), config.componentsFolder);
    const uiDir = path.join(componentsDir, 'ui');
    const hooksDir = path.join(componentsDir, 'hooks');
    
    if (!fs.existsSync(uiDir)) {
      fs.mkdirSync(uiDir, { recursive: true });
    }
    
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Try to copy component files locally first, then download as fallback
    let copySuccess = false;
    for (const file of component.files) {
      try {
        let fileCopied = false;
        
        // Update file path to use config-based components directory
        let configFile;
        if (file.includes('lib/components/')) {
          configFile = file.replace('lib/components/', `${config.componentsFolder}/`);
        } else if (file.includes('lib/hooks/')) {
          configFile = file.replace('lib/hooks/', `${config.componentsFolder}/hooks/`);
        } else {
          configFile = file;
        }
        
        // First try to copy from local package installation
        try {
          const packageDir = path.dirname(require.resolve('unicrn/package.json'));
          const sourceFilePath = path.join(packageDir, file);
          const targetFilePath = path.join(process.cwd(), configFile);
          
          if (fs.existsSync(sourceFilePath)) {
            // Create directory if it doesn't exist
            const targetDir = path.dirname(targetFilePath);
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }
            
            fs.copyFileSync(sourceFilePath, targetFilePath);
            fileCopied = true;
            copySuccess = true;
          }
        } catch {
          // Package not found, try local development path
        }
        
        // If not found, try from local development directory
        if (!fileCopied) {
          const localFilePath = path.join(__dirname, '..', file);
          if (fs.existsSync(localFilePath)) {
            const targetFilePath = path.join(process.cwd(), configFile);
            const targetDir = path.dirname(targetFilePath);
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }
            
            fs.copyFileSync(localFilePath, targetFilePath);
            fileCopied = true;
            copySuccess = true;
          }
        }
        
        // Final fallback to download
        if (!fileCopied) {
          await downloadFile(configFile, file);
          copySuccess = true;
        }
      } catch {
        console.log(`⚠️  Could not copy ${file} automatically.`);
        console.log(`   Please copy it manually from: ${BASE_URL}/${file}`);
      }
    }

    // Update index.ts
    await updateIndexFile();

    if (copySuccess) {
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

async function downloadFile(localFilePath, sourceFilePath = null) {
  const downloadPath = sourceFilePath || localFilePath;
  const url = `${BASE_URL}/${downloadPath}`;
  const localPath = path.join(process.cwd(), localFilePath);

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
            new Error(`Failed to download ${downloadPath}: ${response.statusCode}`)
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

async function removeComponent(componentName) {
  const component = components[componentName.toLowerCase()];

  if (!component) {
    console.error(`❌ Component "${componentName}" not found.`);
    console.log(`Available components: ${Object.keys(components).join(', ')}`);
    throw new Error(`Component "${componentName}" not found`);
  }

  try {
    console.log(`🗑️  Removing ${component.name} component...`);

    // Load configuration and resolve paths
    const config = loadConfig();

    // Remove component files
    for (const file of component.files) {
      let configFile;
      if (file.includes('lib/components/')) {
        configFile = file.replace('lib/components/', `${config.componentsFolder}/`);
      } else if (file.includes('lib/hooks/')) {
        configFile = file.replace('lib/hooks/', `${config.componentsFolder}/hooks/`);
      } else {
        configFile = file;
      }
      
      const filePath = path.join(process.cwd(), configFile);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️  Removed ${configFile}`);
      }
    }

    // Update index.ts
    await updateIndexFile();

    console.log(`✅ Successfully removed ${component.name} component!`);
  } catch (error) {
    console.error(`❌ Failed to remove ${component.name}:`, error.message);
    throw error;
  }
}

async function updateIndexFile() {
  // Load configuration and resolve paths
  const config = loadConfig();
  const uiDir = path.join(process.cwd(), config.componentsFolder, 'ui');
  const hooksDir = path.join(process.cwd(), config.componentsFolder, 'hooks');
  const uiIndexPath = path.join(uiDir, 'index.ts');
  const hooksIndexPath = path.join(hooksDir, 'index.ts');

  // Update UI components index
  const existingComponentFiles = [];
  if (fs.existsSync(uiDir)) {
    const files = fs.readdirSync(uiDir);
    existingComponentFiles.push(...files.filter(file => 
      file.endsWith('.tsx') && file !== 'index.ts'
    ));
  }

  // Map component files to proper exports (using simpler export * format)
  const componentExports = {
    'Avatar.tsx': "export * from './Avatar';",
    'Badge.tsx': "export * from './Badge';", 
    'Button.tsx': "export * from './Button';",
    'Card.tsx': "export * from './Card';",
    'Checkbox.tsx': "export * from './Checkbox';",
    'Dialog.tsx': "export * from './Dialog';",
    'Input.tsx': "export * from './Input';",
    'OTPInput.tsx': "export * from './OTPInput';",
    'Radio.tsx': "export * from './Radio';",
    'Switch.tsx': "export * from './Switch';",
    'Typography.tsx': "export * from './Typography';",
  };

  // Generate exports only for components that actually exist
  const componentExportsContent = existingComponentFiles
    .map(file => componentExports[file])
    .filter(Boolean)
    .join('\n');

  const uiIndexContent = `// UNICRN Component Library
// Components are automatically exported when added via: npx unicrn add <component>

${componentExportsContent}`;

  if (fs.existsSync(uiDir)) {
    fs.writeFileSync(uiIndexPath, uiIndexContent);
  }

  // Update hooks index
  const existingHookFiles = [];
  if (fs.existsSync(hooksDir)) {
    const files = fs.readdirSync(hooksDir);
    existingHookFiles.push(...files.filter(file => 
      file.endsWith('.ts') && file !== 'index.ts'
    ));
  }

  // Map hook files to proper exports
  const hookExports = {
    'useDisclose.ts': "export * from './useDisclose';",
  };

  // Generate exports only for hooks that actually exist
  const hookExportsContent = existingHookFiles
    .map(file => hookExports[file])
    .filter(Boolean)
    .join('\n');

  const hooksIndexContent = `// UNICRN Hooks Library
// Hooks are automatically exported when added via: npx unicrn add <hook>

${hookExportsContent}`;

  if (fs.existsSync(hooksDir)) {
    fs.writeFileSync(hooksIndexPath, hooksIndexContent);
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
    // Load configuration and resolve paths
    const config = loadConfig();
    const unistylesPath = `${config.componentsFolder}/unistyles.ts`;
    
    // Download unistyles.ts with the selected theme to the components folder
    await downloadFile(unistylesPath, 'lib/unistyles.ts');

    console.log(`✅ Successfully set theme to "${theme.name}"!`);
    console.log(`📁 Updated: ${unistylesPath}`);
  } catch (error) {
    console.error(`❌ Failed to set theme:`, error.message);
    throw error;
  }
}

// Default configuration
const defaultConfig = {
  "componentsFolder": "components"
};

// Load configuration from unicrn.config.json
function loadConfig() {
  const configPath = path.join(process.cwd(), 'unicrn.config.json');
  
  if (fs.existsSync(configPath)) {
    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      return { ...defaultConfig, ...JSON.parse(configContent) };
    } catch {
      console.warn('⚠️  Failed to parse unicrn.config.json, using defaults');
      return defaultConfig;
    }
  }
  
  return defaultConfig;
}

program.parse();
