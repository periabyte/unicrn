import { useState } from 'react';
import { Text, TextInput, View, type ViewProps } from 'react-native';
import {
  StyleSheet,
  UnistylesRuntime,
  type UnistylesVariants,
} from 'react-native-unistyles';

type InputProps = UnistylesVariants<typeof styles> & {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  error?: string;
  invalid?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  style?: ViewProps['style'];
};

export function Input({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  invalid = false,
  disabled = false,
  multiline = false,
  variant,
  size,
  secureTextEntry = false,
  numberOfLines = 1,
  style,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  styles.useVariants({
    variant,
    size,
    disabled,
    isFocused,
    invalid,
    multiline,
  });

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={
          UnistylesRuntime.getTheme(UnistylesRuntime.themeName).colors
            .mutedForeground
        }
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        multiline={variant === 'multiline'}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },

  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    color: theme.colors.foreground,
    backgroundColor: theme.colors.background,
    height: 40,
    variants: {
      variant: {
        default: {},
      },

      size: {
        default: {
          height: 40,
          paddingHorizontal: theme.spacing.sm,
          fontSize: theme.fontSize.sm,
        },
        sm: {
          height: 36,
          paddingHorizontal: theme.spacing.xs,
          fontSize: theme.fontSize.xs,
        },
        lg: {
          height: 44,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.fontSize.base,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
          backgroundColor: theme.colors.muted,
        },
      },
      isFocused: {
        true: {
          borderColor: theme.colors.ring,
        },
        false: {},
      },
      invalid: {
        true: {
          borderColor: theme.colors.destructive,
        },
        false: {},
      },
      multiline: {
        true: {
          height: 'auto',
          minHeight: 80,
          paddingTop: theme.spacing.sm,
          textAlignVertical: 'top',
        },
      },
    },
  },

  error: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.destructive,
    marginTop: theme.spacing.xs,
  },
}));
