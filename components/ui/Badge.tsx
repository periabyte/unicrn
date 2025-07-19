import React from 'react';
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const { styles } = useStyles(stylesheet);
  
  return (
    <View style={[styles.base, styles[`variant_${variant}`]]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>
        {children}
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  base: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  
  variant_default: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  
  variant_secondary: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  
  variant_destructive: {
    backgroundColor: theme.colors.destructive,
    borderColor: theme.colors.destructive,
  },
  
  variant_outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
  },
  
  text: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  
  text_default: {
    color: theme.colors.primaryForeground,
  },
  
  text_secondary: {
    color: theme.colors.secondaryForeground,
  },
  
  text_destructive: {
    color: theme.colors.destructiveForeground,
  },
  
  text_outline: {
    color: theme.colors.foreground,
  },
}));