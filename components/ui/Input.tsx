import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  disabled = false,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
}: InputProps) {
  const { styles, theme } = useStyles(stylesheet);
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          multiline && styles.inputMultiline,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mutedForeground}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
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
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    color: theme.colors.foreground,
    backgroundColor: theme.colors.background,
  },
  
  inputFocused: {
    borderColor: theme.colors.ring,
    // shadowColor: theme.colors.ring,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 2,
  },
  
  inputError: {
    borderColor: theme.colors.destructive,
  },
  
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: theme.colors.muted,
  },
  
  inputMultiline: {
    height: 'auto',
    minHeight: 80,
    paddingTop: theme.spacing.sm,
    textAlignVertical: 'top',
  },
  
  error: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.destructive,
    marginTop: theme.spacing.xs,
  },
}));