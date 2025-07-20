import { createContext, useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface RadioGroupContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

const RadioGroupContext = createContext<RadioGroupContextType>({});

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export function RadioGroup({
  children,
  value,
  onValueChange,
  disabled = false,
  size = 'default',
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange, disabled, size }}
    >
      <View style={styles.group}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

interface RadioItemProps {
  value: string;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export function RadioItem({
  value,
  label,
  disabled: itemDisabled = false,
}: RadioItemProps) {
  const {
    value: selectedValue,
    onValueChange,
    disabled: groupDisabled,
    size,
  } = useContext(RadioGroupContext);

  const isSelected = selectedValue === value;
  const isDisabled = groupDisabled || itemDisabled;

  styles.useVariants({
    size: size === 'default' ? undefined : size,
    selected: isSelected,
    disabled: isDisabled,
  });

  const handlePress = () => {
    if (!isDisabled && onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      style={({ pressed }) => [
        styles.container,
        pressed && !isDisabled && { opacity: 0.7 },
      ]}
    >
      <View style={styles.radio}>
        {isSelected && <View style={styles.indicator} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

// Compound export
export const Radio = {
  Group: RadioGroup,
  Item: RadioItem,
};

const styles = StyleSheet.create((theme) => ({
  group: {
    gap: theme.spacing.sm,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  radio: {
    borderWidth: theme.borderWidth.xs,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      size: {
        sm: {
          width: 14,
          height: 14,
        },
        lg: {
          width: 20,
          height: 20,
        },
      },
      selected: {
        true: {
          borderColor: theme.colors.primary,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
    // Default size
    width: 16,
    height: 16,
  },

  indicator: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    variants: {
      size: {
        sm: {
          width: 6,
          height: 6,
        },
        lg: {
          width: 10,
          height: 10,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
    // Default size
    width: 8,
    height: 8,
  },

  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.foreground,
    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },
}));
