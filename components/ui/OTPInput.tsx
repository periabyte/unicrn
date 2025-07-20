import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface OTPInputProps {
  length?: number;
  value?: string;
  onComplete?: (otp: string) => void;
  onChangeText?: (otp: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export function OTPInput({
  length = 6,
  value = '',
  onComplete,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  disabled = false,
  autoFocus = true,
  size = 'default',
}: OTPInputProps) {
  const [otp, setOtp] = useState(value);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(
    autoFocus ? 0 : null
  );
  const inputRefs = useRef<(TextInput | null)[]>([]);

  styles.useVariants({
    size: size === 'default' ? undefined : size,
    disabled,
  });

  useEffect(() => {
    setOtp(value);
  }, [value]);

  useEffect(() => {
    if (otp.length === length) {
      onComplete?.(otp);
    }
    onChangeText?.(otp);
  }, [otp, length, onComplete, onChangeText]);

  const handleChangeText = (text: string, index: number) => {
    if (disabled) return;

    const newOtp = otp.split('');

    // Handle backspace
    if (text === '' && index > 0) {
      newOtp[index] = '';
      setOtp(newOtp.join(''));
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
      return;
    }

    // Handle input
    if (text.length === 1 && /^\d$/.test(text)) {
      newOtp[index] = text;
      setOtp(newOtp.join(''));

      // Move to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      } else {
        inputRefs.current[index]?.blur();
        setFocusedIndex(null);
      }
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handlePress = (index: number) => {
    if (!disabled) {
      inputRefs.current[index]?.focus();
      setFocusedIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, index) => (
        <Pressable
          key={`otp-input-${index}-${length}-${placeholder}`}
          onPress={() => handlePress(index)}
          style={[
            styles.inputContainer,
            focusedIndex === index && styles.inputFocused,
            disabled && styles.inputDisabled,
          ]}
        >
          <TextInput
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={styles.input}
            value={secureTextEntry ? (otp[index] ? '•' : '') : otp[index] || ''}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            placeholder={placeholder}
            keyboardType="numeric"
            maxLength={1}
            editable={!disabled}
            selectTextOnFocus
            textAlign="center"
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },

  inputContainer: {
    borderWidth: theme.borderWidth.xs,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    variants: {
      size: {
        sm: {
          width: 36,
          height: 36,
        },
        lg: {
          width: 56,
          height: 56,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
          backgroundColor: theme.colors.muted,
        },
      },
    },
    // Default size
    width: 48,
    height: 48,
  },

  inputFocused: {
    borderColor: theme.colors.ring,
    borderWidth: theme.borderWidth.sm,
  },

  inputDisabled: {
    opacity: 0.5,
    backgroundColor: theme.colors.muted,
  },

  input: {
    flex: 1,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.foreground,
    textAlign: 'center',
    variants: {
      size: {
        sm: {
          fontSize: theme.fontSize.base,
        },
        lg: {
          fontSize: theme.fontSize.xl,
        },
      },
    },
  },
}));
