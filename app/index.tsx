import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

type Tool = {
  name: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const tools: Tool[] = [
  {
    name: "GST Calculator",
    route: "/gst",
    icon: "receipt-outline",
    color: "#6366f1",
  },
  {
    name: "EMI Calculator",
    route: "/emi",
    icon: "calendar-outline",
    color: "#0ea5e9",
  },
  {
    name: "Compound Interest",
    route: "/compound",
    icon: "trending-up-outline",
    color: "#10b981",
  },
  {
    name: "BMI Calculator",
    route: "/bmi",
    icon: "body-outline",
    color: "#f43f5e",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>All Tools</Text>
        <Text style={styles.subtitle}>Select a calculator to get started</Text>
      </View>

      <View style={styles.grid}>
        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.route}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push(tool.route as any)}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: tool.color + "15" },
              ]}
            >
              <Ionicons name={tool.icon} size={32} color={tool.color} />
            </View>
            <Text style={styles.cardTitle}>{tool.name}</Text>
            <Text style={styles.cardAction}>
              Start <Ionicons name="chevron-forward" size={14} />
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => Linking.openURL("https://anishmandal.in")}
        style={styles.footer}
      >
        <Text style={styles.footerText}>
          Created by <Text style={styles.footerLink}>Anish Mandal</Text>
        </Text>
      </TouchableOpacity>
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
  header: {
    marginBottom: Theme.spacing.xl,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.md,
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.md,
    marginBottom: Theme.spacing.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: Theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: 8,
  },
  cardAction: {
    fontSize: 14,
    color: Theme.colors.primary,
    fontWeight: "600",
  },
  footer: {
    marginTop: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    fontWeight: "500",
  },
  footerLink: {
    color: Theme.colors.primary,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
