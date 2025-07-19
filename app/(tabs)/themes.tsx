import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { cli } from '@/lib/cli';
import { Check } from 'lucide-react-native';

interface ThemeConfig {
  name: string;
  colors: Record<string, string>;
}

export default function ThemesScreen() {
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [activeTheme, setActiveTheme] = useState<string>('default');

  useEffect(() => {
    loadThemes();
    loadActiveTheme();
  }, []);

  const loadThemes = async () => {
    const availableThemes = await cli.getThemes();
    setThemes(availableThemes);
  };

  const loadActiveTheme = async () => {
    const active = await cli.getActiveTheme();
    setActiveTheme(active);
  };

  const handleSetTheme = async (themeName: string) => {
    const result = await cli.setTheme(themeName);
    if (result.success) {
      setActiveTheme(themeName);
    }
  };

  const renderColorPalette = (colors: Record<string, string>) => {
    const mainColors = ['primary', 'secondary', 'destructive', 'background', 'foreground'];
    
    return (
      <View style={styles.colorPalette}>
        {mainColors.map((colorKey) => (
          <View key={colorKey} style={styles.colorItem}>
            <View 
              style={[
                styles.colorSwatch, 
                { backgroundColor: colors[colorKey] || '#000' }
              ]} 
            />
            <Text style={styles.colorLabel}>{colorKey}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Themes</Text>
          <Text style={styles.subtitle}>
            Choose from our collection of beautiful themes
          </Text>
          <Badge variant="secondary">Current: {activeTheme}</Badge>
        </View>

        {/* Themes Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Themes</Text>
          
          {themes.map((theme) => (
            <Pressable
              key={theme.name.toLowerCase()}
              onPress={() => handleSetTheme(theme.name.toLowerCase())}
            >
              <Card>
                <CardContent>
                  <View style={styles.themeHeader}>
                    <View>
                      <Text style={styles.themeName}>{theme.name}</Text>
                      <Text style={styles.themeDescription}>
                        {theme.name} color scheme for your application
                      </Text>
                    </View>
                    {activeTheme === theme.name.toLowerCase() && (
                      <View style={styles.activeIndicator}>
                        <Check size={20} color="#22c55e" />
                      </View>
                    )}
                  </View>
                  
                  {renderColorPalette(theme.colors)}
                  
                  <View style={styles.themeActions}>
                    <Button
                      title={activeTheme === theme.name.toLowerCase() ? "Active" : "Apply Theme"}
                      size="sm"
                      variant={activeTheme === theme.name.toLowerCase() ? "secondary" : "default"}
                      disabled={activeTheme === theme.name.toLowerCase()}
                      onPress={() => handleSetTheme(theme.name.toLowerCase())}
                    />
                  </View>
                </CardContent>
              </Card>
            </Pressable>
          ))}
        </View>

        {/* Theme Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme Preview</Text>
          <Card>
            <CardContent>
              <Text style={styles.previewTitle}>Sample Components</Text>
              <View style={styles.previewGrid}>
                <Button title="Primary" size="sm" />
                <Button title="Secondary" variant="secondary" size="sm" />
                <Button title="Outline" variant="outline" size="sm" />
              </View>
              <View style={styles.previewGrid}>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Custom Theme Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Themes</Text>
          <Card>
            <CardContent>
              <Text style={styles.customThemeTitle}>Create Your Own Theme</Text>
              <Text style={styles.customThemeDescription}>
                You can create custom themes by modifying the theme configuration in your unistyles.config.ts file. 
                Define your color palette, spacing, and other design tokens to match your brand.
              </Text>
              <View style={styles.codeExample}>
                <Text style={styles.codeText}>
{`const customTheme = {
  colors: {
    primary: '#your-color',
    secondary: '#your-color',
    // ... more colors
  },
  spacing: {
    // ... spacing values
  }
};`}
                </Text>
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
    lineHeight: 24,
    marginBottom: 16,
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
  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
    color: '#71717a',
  },
  activeIndicator: {
    backgroundColor: '#dcfce7',
    borderRadius: 20,
    padding: 8,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  colorItem: {
    alignItems: 'center',
    gap: 4,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  colorLabel: {
    fontSize: 10,
    color: '#71717a',
    textAlign: 'center',
  },
  themeActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 12,
  },
  previewGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  customThemeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 8,
  },
  customThemeDescription: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
    marginBottom: 16,
  },
  codeExample: {
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
    padding: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#18181b',
    lineHeight: 16,
  },
});