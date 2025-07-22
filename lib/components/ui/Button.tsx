import type React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

type ButtonProps = UnistylesVariants<typeof styles> & {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
};

export function Button({
  title,
  onPress,
  variant = undefined,
  size = undefined,
  disabled = false,
  loading = false,
  children,
}: ButtonProps) {
  styles.useVariants({
    variant,
    size,
    disabled,
  });

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color="#ffffff"
          style={styles.loading}
        />
      )}
      {children || <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: theme.borderWidth.xs,
    borderColor: 'transparent',
    variants: {
      variant: {
        default: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        destructive: {
          backgroundColor: theme.colors.destructive,
          borderColor: theme.colors.destructive,
        },
        outline: {
          backgroundColor: 'transparent',
          borderColor: theme.colors.border,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.secondary,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
        link: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
      },
      size: {
        default: {
          height: 40,
          paddingHorizontal: theme.spacing.md,
        },
        sm: {
          height: 36,
          paddingHorizontal: theme.spacing.sm,
        },
        lg: {
          height: 44,
          paddingHorizontal: theme.spacing.lg,
        },
        icon: {
          height: 40,
          width: 40,
          paddingHorizontal: 0,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },

  text: {
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
    variants: {
      variant: {
        default: {
          color: theme.colors.primaryForeground,
        },
        destructive: {
          color: theme.colors.destructiveForeground,
        },
        outline: {
          color: theme.colors.foreground,
        },
        secondary: {
          color: theme.colors.secondaryForeground,
        },
        ghost: {
          color: theme.colors.foreground,
        },
        link: {
          color: theme.colors.foreground,
          textDecorationLine: 'underline',
        },
      },
      size: {
        default: {
          fontSize: theme.fontSize.sm,
        },
        sm: {
          fontSize: theme.fontSize.xs,
        },
        lg: {
          fontSize: theme.fontSize.base,
        },
        icon: {
          fontSize: theme.fontSize.sm,
        },
      },
    },
  },

  loading: {
    marginRight: theme.spacing.xs,
  },
}));
