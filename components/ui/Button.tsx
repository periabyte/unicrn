import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'default', 
  size = 'default', 
  disabled = false,
  loading = false,
  children 
}: ButtonProps) {
  const { styles } = useStyles(stylesheet);
  
  const variantStyle = styles[`variant_${variant}`];
  const sizeStyle = styles[`size_${size}`];
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        sizeStyle,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? styles.variant_outline.color : '#ffffff'} 
          style={styles.loading}
        />
      )}
      {children || (
        <Text style={[
          styles.text,
          styles[`text_${variant}`],
          styles[`textSize_${size}`],
        ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Variants
  variant_default: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  variant_destructive: {
    backgroundColor: theme.colors.destructive,
    borderColor: theme.colors.destructive,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
  },
  variant_secondary: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  variant_link: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  
  // Sizes
  size_default: {
    height: 40,
    paddingHorizontal: theme.spacing.md,
  },
  size_sm: {
    height: 36,
    paddingHorizontal: theme.spacing.sm,
  },
  size_lg: {
    height: 44,
    paddingHorizontal: theme.spacing.lg,
  },
  size_icon: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
  },
  
  // Text styles
  text: {
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  text_default: {
    color: theme.colors.primaryForeground,
  },
  text_destructive: {
    color: theme.colors.destructiveForeground,
  },
  text_outline: {
    color: theme.colors.foreground,
  },
  text_secondary: {
    color: theme.colors.secondaryForeground,
  },
  text_ghost: {
    color: theme.colors.foreground,
  },
  text_link: {
    color: theme.colors.foreground,
    textDecorationLine: 'underline',
  },
  
  // Text sizes
  textSize_default: {
    fontSize: theme.fontSize.sm,
  },
  textSize_sm: {
    fontSize: theme.fontSize.xs,
  },
  textSize_lg: {
    fontSize: theme.fontSize.base,
  },
  textSize_icon: {
    fontSize: theme.fontSize.sm,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  loading: {
    marginRight: theme.spacing.xs,
  },
}));