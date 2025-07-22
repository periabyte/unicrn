import React from 'react';
import {
  Image,
  type ImageProps,
  Text,
  View,
  type ViewProps,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    variants: {
      size: {
        sm: {
          width: 32,
          height: 32,
        },
        md: {
          width: 40,
          height: 40,
        },
        lg: {
          width: 48,
          height: 48,
        },
        xl: {
          width: 64,
          height: 64,
        },
      },
    },
  },

  image: {
    width: '100%',
    height: '100%',
  },

  fallback: {
    color: theme.colors.mutedForeground,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
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
        xl: {
          fontSize: theme.fontSize.lg,
        },
      },
    },
  },
}));

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewProps['style'];
  imageStyle?: ImageProps['style'];
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  style,
  imageStyle,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  styles.useVariants({
    size,
  });

  const showFallback = !src || imageError;

  return (
    <View style={[styles.container, style]}>
      {!showFallback ? (
        <Image
          source={{ uri: src }}
          style={[styles.image, imageStyle]}
          onError={() => setImageError(true)}
          accessibilityLabel={alt}
        />
      ) : (
        <Text style={styles.fallback}>{fallback || '?'}</Text>
      )}
    </View>
  );
}
