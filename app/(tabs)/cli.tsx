import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent, Button, Badge, Input } from '@/components/ui';
import { cli } from '@/lib/cli';
import { Terminal, Download, Package } from 'lucide-react-native';

interface ComponentInfo {
  name: string;
  description: string;
  dependencies: string[];
  files: string[];
}

export default function CLIScreen() {
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [installedComponents, setInstalledComponents] = useState<string[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [commandOutput, setCommandOutput] = useState('');

  useEffect(() => {
    loadComponents();
    loadInstalledComponents();
  }, []);

  const loadComponents = async () => {
    const availableComponents = await cli.getComponents();
    setComponents(availableComponents);
  };

  const loadInstalledComponents = async () => {
    const installed = await cli.getInstalledComponents();
    setInstalledComponents(installed);
  };

  const executeCommand = async () => {
    const parts = commandInput.trim().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case 'help':
        output = await cli.getHelp();
        break;
      
      case 'add':
        if (args.length === 0) {
          output = 'Error: Please specify a component to add.\nUsage: add <component>';
        } else {
          const results = await Promise.all(
            args.map(component => cli.installComponent(component))
          );
          output = results.map(r => r.message).join('\n');
          await loadInstalledComponents();
        }
        break;
      
      case 'theme':
        if (args.length === 0) {
          output = 'Error: Please specify a theme name.\nUsage: theme <name>';
        } else {
          const result = await cli.setTheme(args[0]);
          output = result.message;
        }
        break;
      
      case 'list':
        const componentList = await cli.getComponents();
        output = 'Available components:\n' + 
          componentList.map(c => `  ${c.name.toLowerCase()} - ${c.description}`).join('\n');
        break;
      
      case 'themes':
        const themes = await cli.getThemes();
        output = 'Available themes:\n' + 
          themes.map(t => `  ${t.name.toLowerCase()} - ${t.name} theme`).join('\n');
        break;
      
      case 'installed':
        const installed = await cli.getInstalledComponents();
        output = installed.length > 0 
          ? 'Installed components:\n' + installed.map(c => `  ${c}`).join('\n')
          : 'No components installed yet.';
        break;
      
      default:
        output = `Unknown command: ${command}\nType 'help' for available commands.`;
    }

    setCommandOutput(output);
    setCommandInput('');
  };

  const installComponent = async (componentName: string) => {
    const result = await cli.installComponent(componentName);
    setCommandOutput(result.message);
    if (result.success) {
      await loadInstalledComponents();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Terminal size={48} color="#18181b" />
          <Text style={styles.title}>CLI Tool</Text>
          <Text style={styles.subtitle}>
            Install and manage components with our command-line interface
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Button 
              title="Show Help" 
              variant="outline" 
              size="sm"
              onPress={() => setCommandInput('help')}
            />
            <Button 
              title="List Components" 
              variant="outline" 
              size="sm"
              onPress={() => setCommandInput('list')}
            />
            <Button 
              title="Show Themes" 
              variant="outline" 
              size="sm"
              onPress={() => setCommandInput('themes')}
            />
          </View>
        </View>

        {/* Command Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Command Terminal</Text>
          <Card>
            <CardContent>
              <View style={styles.terminal}>
                <Text style={styles.terminalPrompt}>$ rnui </Text>
                <Input
                  value={commandInput}
                  onChangeText={setCommandInput}
                  placeholder="enter command (e.g., add button)"
                  style={styles.commandInput}
                />
              </View>
              <Button 
                title="Execute" 
                onPress={executeCommand}
                disabled={!commandInput.trim()}
              />
              
              {commandOutput && (
                <View style={styles.output}>
                  <Text style={styles.outputText}>{commandOutput}</Text>
                </View>
              )}
            </CardContent>
          </Card>
        </View>

        {/* Available Components */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Components</Text>
          
          {components.map((component) => {
            const isInstalled = installedComponents.includes(component.name.toLowerCase());
            
            return (
              <Card key={component.name}>
                <CardContent>
                  <View style={styles.componentHeader}>
                    <View style={styles.componentInfo}>
                      <View style={styles.componentTitle}>
                        <Package size={20} color="#18181b" />
                        <Text style={styles.componentName}>{component.name}</Text>
                        {isInstalled && <Badge variant="secondary">Installed</Badge>}
                      </View>
                      <Text style={styles.componentDescription}>
                        {component.description}
                      </Text>
                      <View style={styles.componentMeta}>
                        <Text style={styles.metaLabel}>Dependencies:</Text>
                        <Text style={styles.metaValue}>
                          {component.dependencies.join(', ')}
                        </Text>
                      </View>
                      <View style={styles.componentMeta}>
                        <Text style={styles.metaLabel}>Files:</Text>
                        <Text style={styles.metaValue}>
                          {component.files.join(', ')}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.componentActions}>
                      <Button
                        title={isInstalled ? "Installed" : "Install"}
                        size="sm"
                        variant={isInstalled ? "secondary" : "default"}
                        disabled={isInstalled}
                        onPress={() => installComponent(component.name.toLowerCase())}
                      >
                        <Download size={16} color={isInstalled ? "#18181b" : "#ffffff"} />
                      </Button>
                    </View>
                  </View>
                </CardContent>
              </Card>
            );
          })}
        </View>

        {/* CLI Commands Reference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Command Reference</Text>
          <Card>
            <CardContent>
              <View style={styles.commandRef}>
                <Text style={styles.commandRefTitle}>Basic Commands</Text>
                <View style={styles.commandList}>
                  <Text style={styles.commandItem}>add &lt;component&gt; - Install a component</Text>
                  <Text style={styles.commandItem}>theme &lt;name&gt; - Set active theme</Text>
                  <Text style={styles.commandItem}>list - Show all components</Text>
                  <Text style={styles.commandItem}>themes - Show all themes</Text>
                  <Text style={styles.commandItem}>installed - Show installed components</Text>
                  <Text style={styles.commandItem}>help - Show help information</Text>
                </View>
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
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#71717a',
    textAlign: 'center',
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
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  terminal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  terminalPrompt: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#18181b',
    marginRight: 8,
  },
  commandInput: {
    flex: 1,
    marginBottom: 0,
  },
  output: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#09090b',
    borderRadius: 8,
  },
  outputText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#22c55e',
    lineHeight: 20,
  },
  componentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  componentInfo: {
    flex: 1,
    marginRight: 16,
  },
  componentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  componentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
  },
  componentDescription: {
    fontSize: 14,
    color: '#71717a',
    marginBottom: 12,
    lineHeight: 20,
  },
  componentMeta: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#18181b',
    width: 80,
  },
  metaValue: {
    fontSize: 12,
    color: '#71717a',
    flex: 1,
  },
  componentActions: {
    alignItems: 'flex-end',
  },
  commandRef: {
    padding: 0,
  },
  commandRefTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 12,
  },
  commandList: {
    gap: 8,
  },
  commandItem: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#18181b',
    padding: 8,
    backgroundColor: '#f4f4f5',
    borderRadius: 4,
  },
});