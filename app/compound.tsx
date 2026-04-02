import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Theme } from '@/constants/theme';
import { InputGroup, ResultCard, ResultRow, SegmentedControl } from '@/components/CalculatorUI';

const compoundingOptions = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-Annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
];

export default function CompoundInterestCalculator() {
  const [pv, setPv] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compounding, setCompounding] = useState(1);
  const [results, setResults] = useState<{
    futureValue: number;
    totalInterest: number;
  } | null>(null);

  useEffect(() => {
    const P = parseFloat(pv) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;
    const n = compounding;

    if (P > 0 && r > 0 && t > 0) {
      const futureValue = P * Math.pow(1 + r / n, n * t);
      const totalInterest = futureValue - P;

      setResults({ futureValue, totalInterest });
    } else {
      setResults(null);
    }
  }, [pv, rate, time, compounding]);

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <InputGroup
          label="Present Value (₹)"
          value={pv}
          onChangeText={setPv}
          placeholder="Principal Amount"
          unit="INR"
        />
        <InputGroup
          label="Interest Rate (%)"
          value={rate}
          onChangeText={setRate}
          placeholder="Annual Interest"
          unit="%"
        />
        <InputGroup
          label="Time (Years)"
          value={time}
          onChangeText={setTime}
          placeholder="Duration"
          unit="Years"
        />

        <SegmentedControl
          label="Compounding Frequency"
          options={compoundingOptions}
          selected={compounding}
          onSelect={setCompounding}
        />
      </View>

      {results && (
        <ResultCard title="Investment Value">
          <ResultRow
            label="Future Value"
            value={formatCurrency(results.futureValue)}
            highlight
            color={Theme.colors.success}
          />
          <ResultRow label="Total Interest" value={formatCurrency(results.totalInterest)} color={Theme.colors.primary} />
          <ResultRow label="Principal (Original)" value={formatCurrency(parseFloat(pv) || 0)} />
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
});
