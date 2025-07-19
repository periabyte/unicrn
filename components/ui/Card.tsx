import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  padding?: keyof typeof import('../../unistyles.config').lightTheme.spacing;
}

export function Card({ children, variant = 'default', padding = 'md' }: CardProps) {
  const { styles } = useStyles(stylesheet);
  
  return (
    <View style={[
      styles.base,
      styles[`variant_${variant}`],
      { padding: styles.base.theme.spacing[padding] }
    ]}>
      {children}
    </View>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  const { styles } = useStyles(stylesheet);
  
  return (
    <View style={styles.header}>
      {children}
    </View>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  const { styles } = useStyles(stylesheet);
  
  return (
    <View style={styles.content}>
      {children}
    </View>
  );
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  const { styles } = useStyles(stylesheet);
  
  return (
    <View style={styles.footer}>
      {children}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  base: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    theme,
  },
  
  variant_default: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 1,
  },
  
  variant_elevated: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 4,
  },
  
  header: {
    marginBottom: theme.spacing.md,
  },
  
  content: {
    flex: 1,
  },
  
  footer: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
}));