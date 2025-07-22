import { RNUI_CLI } from '../lib/cli';

/**
 * Dynamic component registry that only includes installed components
 * This prevents importing components that haven't been added to the project
 */
class ComponentRegistry {
  private static instance: ComponentRegistry;
  private installedComponents: string[] = [];
  private isInitialized = false;

  static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      const cli = RNUI_CLI.getInstance();
      this.installedComponents = await cli.getInstalledComponents();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize component registry:', error);
      // Fallback: export all components if AsyncStorage fails
      this.installedComponents = [
        'avatar', 'badge', 'button', 'card', 'checkbox', 
        'dialog', 'input', 'otpinput', 'radio', 'switch', 'typography'
      ];
      this.isInitialized = true;
    }
  }

  isComponentInstalled(componentName: string): boolean {
    return this.installedComponents.includes(componentName.toLowerCase());
  }

  getInstalledComponents(): string[] {
    return [...this.installedComponents];
  }
}

export const componentRegistry = ComponentRegistry.getInstance();

// Component mapping for conditional exports
export const COMPONENT_EXPORTS = {
  avatar: () => import('./Avatar').then(m => ({ Avatar: m.Avatar })),
  badge: () => import('./Badge').then(m => ({ Badge: m.Badge })),
  button: () => import('./Button').then(m => ({ Button: m.Button })),
  card: () => import('./Card').then(m => ({ 
    Card: m.Card, 
    CardContent: m.CardContent, 
    CardFooter: m.CardFooter, 
    CardHeader: m.CardHeader 
  })),
  checkbox: () => import('./Checkbox').then(m => ({ Checkbox: m.Checkbox })),
  dialog: () => import('./Dialog').then(m => ({
    Dialog: m.Dialog,
    DialogClose: m.DialogClose,
    DialogContent: m.DialogContent,
    DialogDescription: m.DialogDescription,
    DialogFooter: m.DialogFooter,
    DialogHeader: m.DialogHeader,
    DialogTitle: m.DialogTitle,
    DialogTrigger: m.DialogTrigger,
  })),
  input: () => import('./Input').then(m => ({ Input: m.Input })),
  otpinput: () => import('./OTPInput').then(m => ({ OTPInput: m.OTPInput })),
  radio: () => import('./Radio').then(m => ({ RadioGroup: m.RadioGroup, RadioItem: m.RadioItem })),
  switch: () => import('./Switch').then(m => ({ Switch: m.Switch })),
  typography: () => import('./Typography').then(m => ({
    Blockquote: m.Blockquote,
    Code: m.Code,
    H1: m.H1,
    H2: m.H2,
    H3: m.H3,
    H4: m.H4,
    H5: m.H5,
    H6: m.H6,
    Lead: m.Lead,
    Muted: m.Muted,
    Text: m.Text,
    Typography: m.Typography,
  })),
};

/**
 * Dynamically export only installed components
 */
export async function getInstalledComponentExports(): Promise<Record<string, any>> {
  await componentRegistry.initialize();
  const installedComponents = componentRegistry.getInstalledComponents();
  const exports: Record<string, any> = {};

  for (const componentName of installedComponents) {
    const exporter = COMPONENT_EXPORTS[componentName as keyof typeof COMPONENT_EXPORTS];
    if (exporter) {
      try {
        const componentExports = await exporter();
        Object.assign(exports, componentExports);
      } catch (error) {
        console.warn(`Failed to load component ${componentName}:`, error);
      }
    }
  }

  return exports;
}
