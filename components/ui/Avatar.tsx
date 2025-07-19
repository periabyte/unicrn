import React from 'react';
import { View, Text, Image } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({ src, alt, fallback, size = 'md' }: AvatarProps) {
  const { styles } = useStyles(stylesheet);
  const [imageError, setImageError] = React.useState(false);
  
  const showFallback = !src || imageError;
  
  return (
    <View style={[styles.base, styles[`size_${size}`]]}>
      {!showFallback ? (
        <Image
          source={{ uri: src }}
          style={styles.image}
          onError={() => setImageError(true)}
          accessibilityLabel={alt}
        />
      ) : (
        <Text style={[styles.fallback, styles[`fallbackText_${size}`]]}>
          {fallback || '?'}
        </Text>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  base: {
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  
  size_sm: {
    width: 32,
    height: 32,
  },
  
  size_md: {
    width: 40,
    height: 40,
  },
  
  size_lg: {
    width: 48,
    height: 48,
  },
  
  size_xl: {
    width: 64,
    height: 64,
  },
  
  image: {
    width: '100%',
    height: '100%',
  },
  
  fallback: {
    color: theme.colors.mutedForeground,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  
  fallbackText_sm: {
    fontSize: theme.fontSize.xs,
  },
  
  fallbackText_md: {
    fontSize: theme.fontSize.sm,
  },
  
  fallbackText_lg: {
    fontSize: theme.fontSize.base,
  },
  
  fallbackText_xl: {
    fontSize: theme.fontSize.lg,
  },
}));