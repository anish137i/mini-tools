import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

/**
 * Input field with label
 */
export const InputGroup = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'numeric',
  unit,
  disabled = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  unit?: string;
  disabled?: boolean;
}) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputContainer, disabled && styles.inputDisabled]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={!disabled}
        placeholderTextColor={Theme.colors.textSecondary}
      />
      {unit && (
        <View style={styles.unitContainer}>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
      )}
    </View>
  </View>
);

/**
 * Result display card
 */
export const ResultCard = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <View style={styles.resultCard}>
    {title && <Text style={styles.resultTitle}>{title}</Text>}
    {children}
  </View>
);

/**
 * Single row in the result section
 */
export const ResultRow = ({
  label,
  value,
  highlight = false,
  color = Theme.colors.text,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  color?: string;
}) => (
  <View style={styles.resultRow}>
    <Text style={styles.resultLabel}>{label}</Text>
    <Text
      style={[
        styles.resultValue,
        highlight && styles.resultValueHighlight,
        { color },
      ]}
    >
      {value}
    </Text>
  </View>
);

/**
 * Main action button
 */
export const ActionButton = ({
  title,
  onPress,
  icon,
  style,
  textStyle,
  color = Theme.colors.primary,
}: {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {icon && <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 8 }} />}
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

/**
 * Segmented options picker (Sex, Frequency, etc)
 */
export const SegmentedControl = ({
  options,
  selected,
  onSelect,
  label,
}: {
  options: { label: string; value: any }[];
  selected: any;
  onSelect: (value: any) => void;
  label?: string;
}) => (
  <View style={styles.inputWrapper}>
    {label && <Text style={styles.label}>{label}</Text>}
    <View style={styles.segmentedContainer}>
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segmentOption,
              isSelected && styles.segmentOptionActive,
            ]}
            onPress={() => onSelect(option.value)}
          >
            <Text
              style={[
                styles.segmentText,
                isSelected && styles.segmentTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    height: 54,
    ...Theme.shadows.sm,
  },
  inputDisabled: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Theme.colors.text,
    fontWeight: '500',
    paddingVertical: 10,
  },
  unitContainer: {
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: Theme.colors.border,
    marginLeft: 10,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
  },
  resultCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginTop: Theme.spacing.xl,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.md,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  resultLabel: {
    fontSize: 15,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  resultValueHighlight: {
    fontSize: 20,
    fontWeight: '800',
  },
  button: {
    height: 56,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...Theme.shadows.sm,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    padding: 3,
  },
  segmentOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md - 3,
  },
  segmentOptionActive: {
    backgroundColor: Theme.colors.surface,
    ...Theme.shadows.sm,
  },
  segmentText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: Theme.colors.primary,
  },
});
