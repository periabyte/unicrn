import React from 'react';
import { Pressable, type ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
  size = 'md',
  style,
}: SwitchProps) {
  const animatedValue = useSharedValue(value ? 1 : 0);
  const theme = useAnimatedTheme();

  // Memoize the calculations to avoid recalculating on every render
  const dimensions = React.useMemo(() => {
    const trackWidth = size === 'sm' ? 32 : 40;
    const thumbWidth = size === 'sm' ? 14 : 18;
    const padding = 2;
    const maxTranslateX = trackWidth - thumbWidth - padding * 2;
    return { trackWidth, thumbWidth, padding, maxTranslateX };
  }, [size]);

  // Use variants for the thumb styling
  styles.useVariants({
    disabled,
  });

  React.useEffect(() => {
    animatedValue.value = withSpring(value ? 1 : 0, {
      damping: 20,
      stiffness: 200,
      mass: 0.8,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
  }, [value, animatedValue]);

  const trackStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [theme.value.colors.input, theme.value.colors.primary]
      ),
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateX: animatedValue.value * dimensions.maxTranslateX,
        },
      ],
    };
  });

  const handlePress = React.useCallback(() => {
    if (!disabled) {
      onValueChange(!value);
    }
  }, [disabled, onValueChange, value]);

  return (
    <Pressable onPress={handlePress} disabled={disabled} style={style}>
      <Animated.View
        style={[
          styles.track,
          styles[`track_${size}`],
          trackStyle,
          disabled && styles.disabled,
        ]}
      >
        <Animated.View
          style={[styles.thumb, styles[`thumb_${size}`], thumbStyle]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  track: {
    borderRadius: theme.borderRadius.full,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },

  track_sm: {
    width: 32,
    height: 18,
  },

  track_md: {
    width: 40,
    height: 22,
  },

  thumb: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
    position: 'absolute',
    top: 2,
    left: 2,
    variants: {
      disabled: {
        true: {
          shadowOpacity: 0,
          elevation: 0,
          backgroundColor: theme.colors.muted,
        },
        false: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 1,
          elevation: 2,
        },
      },
    },
  },

  thumb_sm: {
    width: 14,
    height: 14,
  },

  thumb_md: {
    width: 18,
    height: 18,
  },

  disabled: {
    opacity: 0.6,
  },
}));
