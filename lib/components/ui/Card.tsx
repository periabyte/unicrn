import type React from 'react';
import type { FC } from 'react';
import { View } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

interface CardProps extends UnistylesVariants<typeof styles> {
  children: React.ReactNode;
}

export const Card: FC<CardProps> = ({
  children,
  variant,
  padding = 'md',
}: CardProps) => {
  styles.useVariants({
    variant,
    padding,
  });

  return <View style={styles.container}>{children}</View>;
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.header}>{children}</View>;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.content}>{children}</View>;
};

export const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: theme.borderWidth.xs,
    borderColor: theme.colors.border,
    variants: {
      variant: {
        elevated: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
      },
      padding: {
        sm: {
          padding: theme.spacing.sm,
        },
        md: {
          padding: theme.spacing.md,
        },
        lg: {
          padding: theme.spacing.lg,
        },
      },
    },
  },

  header: {
    marginBottom: theme.spacing.md,
  },

  content: {
    flex: 1,
  },

  footer: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
}));
