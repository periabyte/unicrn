import type React from 'react';
import { Text as RNText, type TextProps } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

type TypographyProps = UnistylesVariants<typeof styles> & {
  children: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
  style?: TextProps['style'];
};

export function Typography({
  children,
  variant = 'p',
  size,
  textAlign = 'left',
  color = 'foreground',
  numberOfLines,
  ellipsizeMode,
  onPress,
  style,
}: TypographyProps) {
  styles.useVariants({
    variant,
    size,
    textAlign,
    color,
  });

  return (
    <RNText
      // Use body variant for all typography
      style={[styles.typography, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
}

// Convenience components for each typography variant
export function H1(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h1" {...props} />;
}

export function H2(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h2" {...props} />;
}

export function H3(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h3" {...props} />;
}

export function H4(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h4" {...props} />;
}

export function H5(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h5" {...props} />;
}

export function H6(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="h6" {...props} />;
}

export function Text(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="p" {...props} />;
}

export function Lead(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="lead" {...props} />;
}

export function Muted(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="muted" {...props} />;
}

export function Blockquote(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="blockquote" {...props} />;
}

export function Code(props: Omit<TypographyProps, 'variant'>) {
  return <Typography variant="code" {...props} />;
}

const styles = StyleSheet.create((theme) => ({
  typography: {
    color: theme.colors.foreground,
    variants: {
      variant: {
        h1: {
          fontSize: theme.fontSize['4xl'],
          fontWeight: theme.fontWeight.bold,
          marginBottom: theme.spacing.lg,
          lineHeight: theme.fontSize['4xl'] * 1.1,
        },
        h2: {
          fontSize: theme.fontSize['3xl'],
          fontWeight: theme.fontWeight.bold,
          marginBottom: theme.spacing.md,
          lineHeight: theme.fontSize['3xl'] * 1.2,
        },
        h3: {
          fontSize: theme.fontSize['2xl'],
          fontWeight: theme.fontWeight.semibold,
          marginBottom: theme.spacing.md,
          lineHeight: theme.fontSize['2xl'] * 1.25,
        },
        h4: {
          fontSize: theme.fontSize.xl,
          fontWeight: theme.fontWeight.semibold,
          marginBottom: theme.spacing.sm,
          lineHeight: theme.fontSize.xl * 1.3,
        },
        h5: {
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.medium,
          marginBottom: theme.spacing.sm,
          lineHeight: theme.fontSize.lg * 1.35,
        },
        h6: {
          fontSize: theme.fontSize.base,
          fontWeight: theme.fontWeight.medium,
          marginBottom: theme.spacing.xs,
          lineHeight: theme.fontSize.base * 1.4,
        },
        p: {
          fontSize: theme.fontSize.base,
          fontWeight: theme.fontWeight.normal,
          marginBottom: theme.spacing.md,
          lineHeight: theme.fontSize.base * 1.6,
        },
        lead: {
          fontSize: theme.fontSize.xl,
          fontWeight: theme.fontWeight.normal,
          marginBottom: theme.spacing.lg,
          lineHeight: theme.fontSize.xl * 1.5,
          color: theme.colors.mutedForeground,
        },
        large: {
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.semibold,
          lineHeight: theme.fontSize.lg * 1.4,
        },
        small: {
          fontSize: theme.fontSize.sm,
          fontWeight: theme.fontWeight.normal,
          lineHeight: theme.fontSize.sm * 1.4,
        },
        muted: {
          fontSize: theme.fontSize.sm,
          fontWeight: theme.fontWeight.normal,
          color: theme.colors.mutedForeground,
          lineHeight: theme.fontSize.sm * 1.5,
        },
        blockquote: {
          fontSize: theme.fontSize.base,
          fontWeight: theme.fontWeight.normal,
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          paddingLeft: theme.spacing.lg,
          borderLeftWidth: theme.borderWidth.sm,
          borderLeftColor: theme.colors.border,
          fontStyle: 'italic',
          lineHeight: theme.fontSize.base * 1.6,
        },
        code: {
          fontSize: theme.fontSize.sm,
          fontWeight: theme.fontWeight.medium,
          backgroundColor: theme.colors.muted,
          paddingHorizontal: theme.spacing.xs,
          paddingVertical: 2,
          borderRadius: theme.borderRadius.xs,
          fontFamily: 'monospace',
          lineHeight: theme.fontSize.sm * 1.4,
        },
      },
      size: {
        xs: {
          fontSize: theme.fontSize.xs,
          lineHeight: theme.fontSize.xs * 1.4,
        },
        default: {
          // No size modifications for default
        },
        sm: {
          fontSize: theme.fontSize.sm,
          lineHeight: theme.fontSize.sm * 1.4,
        },
        md: {
          fontSize: theme.fontSize.base,
          lineHeight: theme.fontSize.base * 1.6,
        },
        lg: {
          fontSize: theme.fontSize.lg,
          lineHeight: theme.fontSize.lg * 1.4,
        },
        xl: {
          fontSize: theme.fontSize.xl,
          lineHeight: theme.fontSize.xl * 1.3,
        },
      },
      textAlign: {
        left: {
          textAlign: 'left',
        },
        center: {
          textAlign: 'center',
        },
        right: {
          textAlign: 'right',
        },
      },
      color: {
        foreground: {
          color: theme.colors.foreground,
        },
        primary: {
          color: theme.colors.primary,
        },
        secondary: {
          color: theme.colors.secondaryForeground,
        },
        muted: {
          color: theme.colors.mutedForeground,
        },
        accent: {
          color: theme.colors.accentForeground,
        },
        destructive: {
          color: theme.colors.destructive,
        },
      },
    },
  },
}));
