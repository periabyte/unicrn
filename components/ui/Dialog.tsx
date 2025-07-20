import { X } from 'lucide-react-native';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType>({
  open: false,
  setOpen: () => {},
});

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ children, open = false, onOpenChange }: DialogProps) {
  const [isOpen, setIsOpen] = useState(open);

  // Sync internal state with external open prop
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export function DialogTrigger({ children, onPress }: DialogTriggerProps) {
  const { setOpen } = useContext(DialogContext);

  const handlePress = () => {
    setOpen(true);
    onPress?.();
  };

  return <Pressable onPress={handlePress}>{children}</Pressable>;
}

interface DialogContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function DialogContent({ children, style }: DialogContentProps) {
  const { open, setOpen } = useContext(DialogContext);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.overlayPressable}
          onPress={() => setOpen(false)}
        />
        <View style={[styles.content, style]}>{children}</View>
      </View>
    </Modal>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function DialogHeader({ children, style }: DialogHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

interface DialogTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function DialogTitle({ children, style }: DialogTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function DialogDescription({ children, style }: DialogDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

interface DialogFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function DialogFooter({ children, style }: DialogFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

interface DialogCloseProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export function DialogClose({ children, style, onPress }: DialogCloseProps) {
  const { setOpen } = useContext(DialogContext);

  const handlePress = () => {
    setOpen(false);
    onPress?.();
  };

  return (
    <Pressable style={[styles.closeButton, style]} onPress={handlePress}>
      {children || <X size={16} color="#71717a" />}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },

  overlayPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  content: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    minWidth: 280,
    maxWidth: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },

  header: {
    marginBottom: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },

  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mutedForeground,
    lineHeight: theme.fontSize.sm * 1.5,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },

  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
