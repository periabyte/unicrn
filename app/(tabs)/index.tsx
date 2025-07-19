import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, CardHeader, CardContent, Badge } from '@/components/ui';
import { Package, Zap, Code, Palette } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>React Native UI</Text>
          <Text style={styles.subtitle}>
            Beautiful and customizable components built with React Native and Unistyles
          </Text>
          <Badge variant="secondary">v1.0.0</Badge>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <Card>
            <CardHeader>
              <View style={styles.featureHeader}>
                <Package size={24} color="#18181b" />
                <Text style={styles.featureTitle}>Component Library</Text>
              </View>
            </CardHeader>
            <CardContent>
              <Text style={styles.featureDescription}>
                Over 20+ professionally designed components ready to use in your React Native applications.
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <View style={styles.featureHeader}>
                <Palette size={24} color="#18181b" />
                <Text style={styles.featureTitle}>Theming System</Text>
              </View>
            </CardHeader>
            <CardContent>
              <Text style={styles.featureDescription}>
                Powerful theming with React Native Unistyles. Switch between light, dark, and custom themes instantly.
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <View style={styles.featureHeader}>
                <Code size={24} color="#18181b" />
                <Text style={styles.featureTitle}>CLI Tool</Text>
              </View>
            </CardHeader>
            <CardContent>
              <Text style={styles.featureDescription}>
                Install components individually with our CLI tool. Add only what you need to keep your bundle size small.
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <View style={styles.featureHeader}>
                <Zap size={24} color="#18181b" />
                <Text style={styles.featureTitle}>Performance</Text>
              </View>
            </CardHeader>
            <CardContent>
              <Text style={styles.featureDescription}>
                Built with performance in mind using React Native Reanimated and optimized rendering techniques.
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Getting Started */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Card>
            <CardContent>
              <Text style={styles.codeBlock}>
                {`# Install dependencies
npm install react-native-unistyles

# Add a component
rnui add button

# Set theme
rnui theme dark`}
              </Text>
              <View style={styles.buttonGroup}>
                <Button title="View Components" size="sm" />
                <Button title="CLI Documentation" variant="outline" size="sm" />
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#18181b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#71717a',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 16,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
  },
  featureDescription: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },
  codeBlock: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#18181b',
    backgroundColor: '#f4f4f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
});