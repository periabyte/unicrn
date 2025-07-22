import React, { useEffect, useState } from "react";
import {
	Pressable,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface RadioGroupProps {
	children: React.ReactNode;
	value?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	size?: "sm" | "default" | "lg";
	style?: ViewStyle;
	defaultValue?: string;
}

export function RadioGroup({
	children,
	value,
	onValueChange,
	disabled = false,
	size = "default",
	style,
	defaultValue,
}: RadioGroupProps) {
	const [internalValue, setInternalValue] = useState(defaultValue || value || "");

	// Sync internal state with external value prop
	useEffect(() => {
		if (value !== undefined) {
			setInternalValue(value);
		}
	}, [value]);

	const handleValueChange = (newValue: string) => {
		// If controlled (value prop provided), rely on parent to update
		if (value === undefined) {
			setInternalValue(newValue);
		}
		onValueChange?.(newValue);
	};

	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalValue;

	// Clone children and inject props
	const enhancedChildren = React.Children.map(children, (child) => {
		if (React.isValidElement(child) && child.type === RadioItem) {
			return React.cloneElement(child, {
				...child.props,
				_groupValue: currentValue,
				_onGroupValueChange: handleValueChange,
				_groupDisabled: disabled,
				_groupSize: size,
			});
		}
		return child;
	});

	return <View style={[styles.group, style]}>{enhancedChildren}</View>;
}

interface RadioItemProps {
	value: string;
	label?: string;
	disabled?: boolean;
	id?: string;
	style?: ViewStyle;
	labelStyle?: TextStyle;
	// Internal props passed from RadioGroup
	_groupValue?: string;
	_onGroupValueChange?: (value: string) => void;
	_groupDisabled?: boolean;
	_groupSize?: "sm" | "default" | "lg";
}

export function RadioItem({
	value,
	label,
	disabled: itemDisabled = false,
	style,
	labelStyle,
	_groupValue,
	_onGroupValueChange,
	_groupDisabled = false,
	_groupSize = "default",
}: RadioItemProps) {
	const isSelected = _groupValue === value;
	const isDisabled = _groupDisabled || itemDisabled;

	styles.useVariants({
		size: _groupSize === "default" ? undefined : _groupSize,
		selected: isSelected,
		disabled: isDisabled,
	});

	const handlePress = () => {
		if (!isDisabled && _onGroupValueChange) {
			_onGroupValueChange(value);
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
				style,
			]}
		>
			<View style={styles.radio}>
				{isSelected && <View style={styles.indicator} />}
			</View>
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
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
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.sm,
	},

	radio: {
		borderWidth: theme.borderWidth.xs,
		borderColor: theme.colors.border,
		borderRadius: theme.borderRadius.full,
		alignItems: "center",
		justifyContent: "center",
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
