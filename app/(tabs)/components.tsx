import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  Input,
  Badge,
  Avatar,
  Switch
} from '@/components/ui';

export default function ComponentsScreen() {
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Components</Text>
          <Text style={styles.subtitle}>
            Interactive examples of all available components
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button</Text>
          <Card>
            <CardContent>
              <View style={styles.componentGrid}>
                <Button title="Default" />
                <Button title="Secondary" variant="secondary" />
                <Button title="Outline" variant="outline" />
                <Button title="Destructive" variant="destructive" />
                <Button title="Ghost" variant="ghost" />
                <Button title="Link" variant="link" />
              </View>
              <View style={styles.componentGrid}>
                <Button title="Small" size="sm" />
                <Button title="Large" size="lg" />
                <Button title="Loading" loading={isLoading} onPress={handleLoadingDemo} />
                <Button title="Disabled" disabled />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card</Text>
          <Card>
            <CardHeader>
              <Text style={styles.cardTitle}>Card Title</Text>
              <Text style={styles.cardDescription}>
                This is a card component with header, content, and footer sections.
              </Text>
            </CardHeader>
            <CardContent>
              <Text style={styles.cardContent}>
                Cards are used to group related content and actions. They provide a flexible container for displaying information.
              </Text>
            </CardContent>
            <CardFooter>
              <Button title="Action" size="sm" />
              <Button title="Cancel" variant="outline" size="sm" />
            </CardFooter>
          </Card>
        </View>

        {/* Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input</Text>
          <Card>
            <CardContent>
              <Input
                label="Username"
                placeholder="Enter your username"
                value={inputValue}
                onChangeText={setInputValue}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
              />
              <Input
                label="Description"
                placeholder="Enter description"
                multiline
                numberOfLines={3}
              />
              <Input
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
              />
            </CardContent>
          </Card>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badge</Text>
          <Card>
            <CardContent>
              <View style={styles.badgeGrid}>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Avatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avatar</Text>
          <Card>
            <CardContent>
              <View style={styles.avatarGrid}>
                <Avatar
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Profile"
                  size="sm"
                />
                <Avatar
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Profile"
                  size="md"
                />
                <Avatar
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Profile"
                  size="lg"
                />
                <Avatar fallback="JD" size="xl" />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Switch */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Switch</Text>
          <Card>
            <CardContent>
              <View style={styles.switchContainer}>
                <Text>Notifications</Text>
                <Switch value={switchValue} onValueChange={setSwitchValue} />
              </View>
              <View style={styles.switchContainer}>
                <Text>Small Switch</Text>
                <Switch value={false} onValueChange={() => {}} size="sm" />
              </View>
              <View style={styles.switchContainer}>
                <Text>Disabled</Text>
                <Switch value={false} onValueChange={() => {}} disabled />
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
  componentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#71717a',
  },
  cardContent: {
    fontSize: 14,
    color: '#18181b',
    lineHeight: 20,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avatarGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
});