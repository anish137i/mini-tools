import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Theme } from '@/constants/theme';
import { InputGroup, ResultCard, ResultRow, SegmentedControl } from '@/components/CalculatorUI';

const sexOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

export default function BMICalculator() {
  const [sex, setSex] = useState('male');
  const [age, setAge] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [results, setResults] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    const kg = parseFloat(weight) || 0;

    if ((ft > 0 || inch > 0) && kg > 0) {
      const height_m = ft * 0.3048 + inch * 0.0254;
      const bmi = kg / (height_m * height_m);

      let category = '';
      let color = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3b82f6'; // Blue
      } else if (bmi < 25) {
        category = 'Normal';
        color = Theme.colors.success;
      } else if (bmi < 30) {
        category = 'Overweight';
        color = '#fbbf24'; // Yellow/Amber
      } else {
        category = 'Obese';
        color = Theme.colors.danger;
      }

      setResults({ bmi, category, color });
    } else {
      setResults(null);
    }
  }, [heightFt, heightIn, weight]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <SegmentedControl
          label="Sex"
          options={sexOptions}
          selected={sex}
          onSelect={setSex}
        />

        <InputGroup
          label="Age (Years)"
          value={age}
          onChangeText={setAge}
          placeholder="e.g. 25"
          unit="Years"
        />

        <View style={styles.heightRow}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <InputGroup
              label="Height (Ft)"
              value={heightFt}
              onChangeText={setHeightFt}
              placeholder="Ft"
              unit="Ft"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <InputGroup
              label="Height (In)"
              value={heightIn}
              onChangeText={setHeightIn}
              placeholder="In"
              unit="In"
            />
          </View>
        </View>

        <InputGroup
          label="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g. 70"
          unit="kg"
        />
      </View>

      {results && (
        <ResultCard title="BMI Analysis">
          <ResultRow
            label="BMI Value"
            value={results.bmi.toFixed(1)}
            highlight
            color={results.color}
          />
          <ResultRow
            label="Category"
            value={results.category}
            color={results.color}
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              A healthy BMI for adults ranges from 18.5 to 24.9.
            </Text>
          </View>
        </ResultCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  form: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.sm,
  },
  heightRow: {
    flexDirection: 'row',
  },
  infoBox: {
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: '#f8fafc',
    borderRadius: Theme.borderRadius.sm,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.primary,
  },
  infoText: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    lineHeight: 18,
  },
});
