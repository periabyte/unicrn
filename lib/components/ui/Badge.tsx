import type React from 'react';
import { Text, type TextProps, View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  container: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    variants: {
      variant: {
        solid: {},
        outline: {
          backgroundColor: 'transparent',
        },
      },
      size: {
        sm: {
          paddingHorizontal: theme.spacing.xs,
          paddingVertical: 1,
        },
        md: {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: 2,
        },
        lg: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: 4,
        },
      },
      theme: {
        primary: {},
        secondary: {},
        destructive: {},
      },
      shape: {
        pill: {
          borderRadius: theme.borderRadius.full,
        },
        rounded: {
          borderRadius: theme.borderRadius.md,
        },
        square: {
          borderRadius: 0,
        },
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        theme: 'primary',
        styles: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
      },
      {
        variant: 'solid',
        theme: 'secondary',
        styles: {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.secondary,
        },
      },
      {
        variant: 'solid',
        theme: 'destructive',
        styles: {
          backgroundColor: theme.colors.destructive,
          borderColor: theme.colors.destructive,
        },
      },
      {
        variant: 'outline',
        theme: 'primary',
        styles: {
          borderColor: theme.colors.primary,
        },
      },
      {
        variant: 'outline',
        theme: 'secondary',
        styles: {
          borderColor: theme.colors.secondary,
        },
      },
      {
        variant: 'outline',
        theme: 'destructive',
        styles: {
          borderColor: theme.colors.destructive,
        },
      },
    ],
  },

  text: {
    fontWeight: theme.fontWeight.medium,
    variants: {
      size: {
        sm: {
          fontSize: theme.fontSize.xs,
        },
        md: {
          fontSize: theme.fontSize.sm,
        },
        lg: {
          fontSize: theme.fontSize.base,
        },
      },
      variant: {
        solid: {},
        outline: {},
      },
      theme: {
        primary: {},
        secondary: {},
        destructive: {},
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        theme: 'primary',
        styles: {
          color: theme.colors.primaryForeground,
        },
      },
      {
        variant: 'solid',
        theme: 'secondary',
        styles: {
          color: theme.colors.secondaryForeground,
        },
      },
      {
        variant: 'solid',
        theme: 'destructive',
        styles: {
          color: theme.colors.destructiveForeground,
        },
      },
      {
        variant: 'outline',
        theme: 'primary',
        styles: {
          color: theme.colors.primary,
        },
      },
      {
        variant: 'outline',
        theme: 'secondary',
        styles: {
          color: theme.colors.secondary,
        },
      },
      {
        variant: 'outline',
        theme: 'destructive',
        styles: {
          color: theme.colors.destructive,
        },
      },
    ],
  },
}));

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'primary' | 'secondary' | 'destructive';
  shape?: 'pill' | 'rounded' | 'square';
  bg?: string;
  color?: string;
  style?: ViewProps['style'];
  textStyle?: TextProps['style'];
};

export function Badge({
  children,
  variant = 'solid',
  size = 'md',
  theme = 'primary',
  shape = 'pill',
  bg,
  color,
  style,
  textStyle,
}: BadgeProps) {
  styles.useVariants({
    variant,
    size,
    theme,
    shape,
  });

  const containerStyle = [
    styles.container,
    bg && {
      backgroundColor: variant === 'solid' ? bg : 'transparent',
      borderColor: bg,
    },
    style,
  ];

  const finalTextStyle = [styles.text, color && { color }, textStyle];

  return (
    <View style={containerStyle}>
      <Text style={finalTextStyle}>{children}</Text>
    </View>
  );
}
