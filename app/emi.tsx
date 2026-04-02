import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Theme } from '@/constants/theme';
import { InputGroup, ResultCard, ResultRow } from '@/components/CalculatorUI';

export default function EMICalculator() {
  const [loan, setLoan] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [results, setResults] = useState<{
    emi: number;
    principal: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  useEffect(() => {
    const P = parseFloat(loan) || 0;
    const annualRate = parseFloat(rate) || 0;
    const years = parseFloat(tenure) || 0;

    if (P > 0 && annualRate > 0 && years > 0) {
      const r = annualRate / 12 / 100;
      const n = years * 12;

      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - P;

      setResults({ emi, principal: P, totalInterest, totalAmount });
    } else {
      setResults(null);
    }
  }, [loan, rate, tenure]);

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <InputGroup
          label="Loan Amount (₹)"
          value={loan}
          onChangeText={setLoan}
          placeholder="e.g. 5,00,000"
          unit="INR"
        />
        <InputGroup
          label="Interest Rate (%) p.a."
          value={rate}
          onChangeText={setRate}
          placeholder="e.g. 8.5"
          unit="%"
        />
        <InputGroup
          label="Loan Tenure (Years)"
          value={tenure}
          onChangeText={setTenure}
          placeholder="e.g. 5"
          unit="Years"
        />
      </View>

      {results && (
        <ResultCard title="EMI Summary">
          <ResultRow label="Monthly EMI" value={formatCurrency(results.emi)} highlight color={Theme.colors.primary} />
          <ResultRow label="Principal Amount" value={formatCurrency(results.principal)} />
          <ResultRow label="Total Interest" value={formatCurrency(results.totalInterest)} color={Theme.colors.danger} />
          <ResultRow label="Total Amount" value={formatCurrency(results.totalAmount)} />
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
