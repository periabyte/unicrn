import { Check } from "lucide-react-native";
import {
	Pressable,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface CheckboxProps {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	label?: string;
	size?: "sm" | "default" | "lg";
	variant?: "default" | "destructive";
	style?: ViewStyle;
	labelStyle?: TextStyle;
}

export function Checkbox({
	checked = false,
	onCheckedChange,
	disabled = false,
	label,
	size = "default",
	variant = "default",
	style,
	labelStyle,
}: CheckboxProps) {
	styles.useVariants({
		size: size === "default" ? undefined : size,
		variant: variant === "default" ? undefined : variant,
		checked,
		disabled,
	});

	const handlePress = () => {
		if (!disabled) {
			onCheckedChange?.(!checked);
		}
	};

	const iconSize = size === "sm" ? 10 : size === "lg" ? 14 : 12;
	const iconColor = variant === "destructive" ? "#fafafa" : "#fafafa";

	return (
		<Pressable
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="checkbox"
			accessibilityState={{ checked }}
			style={({ pressed }) => [
				styles.container,
				pressed && !disabled && { opacity: 0.7 },
				style,
			]}
		>
			<View style={styles.checkbox}>
				{checked && (
					<Check size={iconSize} color={iconColor} strokeWidth={2.5} />
				)}
			</View>
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
		</Pressable>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.sm,
	},

	checkbox: {
		borderWidth: theme.borderWidth.xs,
		borderRadius: theme.borderRadius.xs,
		alignItems: "center",
		justifyContent: "center",
		variants: {
			size: {
				default: {
					width: 16,
					height: 16,
				},
				sm: {
					width: 14,
					height: 14,
				},
				lg: {
					width: 20,
					height: 20,
				},
			},
			variant: {
				default: {
					borderColor: theme.colors.border,
				},
				destructive: {
					borderColor: theme.colors.destructive,
				},
			},
			checked: {
				true: {
					backgroundColor: theme.colors.primary,
					borderColor: theme.colors.primary,
				},
				false: {
					backgroundColor: "transparent",
				},
			},
			disabled: {
				true: {
					opacity: 0.5,
				},
			},
		},
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
