import React from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolateColor 
} from 'react-native-reanimated';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function Switch({ value, onValueChange, disabled = false, size = 'md' }: SwitchProps) {
  const { styles, theme } = useStyles(stylesheet);
  const animatedValue = useSharedValue(value ? 1 : 0);
  
  React.useEffect(() => {
    animatedValue.value = withSpring(value ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [value, animatedValue]);
  
  const trackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [theme.colors.input, theme.colors.primary]
      ),
    };
  });
  
  const thumbStyle = useAnimatedStyle(() => {
    const translateX = size === 'sm' ? 14 : 18;
    return {
      transform: [{
        translateX: animatedValue.value * translateX
      }],
    };
  });
  
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };
  
  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <Animated.View style={[
        styles.track,
        styles[`track_${size}`],
        trackStyle,
        disabled && styles.disabled
      ]}>
        <Animated.View style={[
          styles.thumb,
          styles[`thumb_${size}`],
          thumbStyle
        ]} />
      </Animated.View>
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  track: {
    borderRadius: theme.borderRadius.full,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
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
    top: 1,
    left: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 2,
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
    opacity: 0.5,
  },
}));