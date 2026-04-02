import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Theme } from '@/constants/theme';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Theme.colors.background,
    primary: Theme.colors.primary,
    card: Theme.colors.surface,
    border: Theme.colors.border,
    text: Theme.colors.text,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Theme.colors.surface,
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
            color: Theme.colors.text,
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: Theme.colors.background,
          },
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Mini Tools',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="gst"
          options={{
            title: 'GST Calculator',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="emi"
          options={{
            title: 'EMI Calculator',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="compound"
          options={{
            title: 'Compound Interest',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="bmi"
          options={{
            title: 'BMI Calculator',
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
