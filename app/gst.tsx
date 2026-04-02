import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Theme } from '@/constants/theme';
import { InputGroup, ResultCard, ResultRow, ActionButton } from '@/components/CalculatorUI';

export default function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');
  const [results, setResults] = useState<{
    net: number;
    gstRate: number;
    gstAmount: number;
    gross: number;
  } | null>(null);

  const calculateAdd = () => {
    const net = parseFloat(amount) || 0;
    const gstRate = parseFloat(rate) || 0;
    if (net <= 0) return;

    const gstAmount = (gstRate / 100) * net;
    const gross = net + gstAmount;

    setResults({ net, gstRate, gstAmount, gross });
  };

  const calculateSubtract = () => {
    const gross = parseFloat(amount) || 0;
    const gstRate = parseFloat(rate) || 0;
    if (gross <= 0) return;

    const net = gross / (1 + gstRate / 100);
    const gstAmount = gross - net;

    setResults({ net, gstRate, gstAmount, gross });
  };

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <InputGroup
          label="Amount (₹)"
          value={amount}
          onChangeText={setAmount}
          placeholder="e.g. 1000"
          unit="INR"
        />
        <InputGroup
          label="GST Rate (%)"
          value={rate}
          onChangeText={setRate}
          placeholder="e.g. 18"
          unit="%"
        />

        <View style={styles.buttonRow}>
          <ActionButton
            title="Add GST"
            onPress={calculateAdd}
            style={{ flex: 1, marginRight: 8 }}
            color={Theme.colors.success}
            icon="add-circle-outline"
          />
          <ActionButton
            title="Subtract GST"
            onPress={calculateSubtract}
            style={{ flex: 1, marginLeft: 8 }}
            color={Theme.colors.danger}
            icon="remove-circle-outline"
          />
        </View>
      </View>

      {results && (
        <ResultCard title="Calculation Result">
          <ResultRow label="Net Amount" value={formatCurrency(results.net)} />
          <ResultRow label="GST Rate" value={`${results.gstRate}%`} />
          <ResultRow label="GST Amount" value={formatCurrency(results.gstAmount)} />
          <ResultRow
            label="Gross Amount"
            value={formatCurrency(results.gross)}
            highlight
            color={Theme.colors.primary}
          />
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
  buttonRow: {
    flexDirection: 'row',
    marginTop: Theme.spacing.sm,
  },
});
