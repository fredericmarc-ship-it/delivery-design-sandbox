import { Link } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Colors, Text } from '@bolteu/rnc-react-uikit';

/**
 * Add your prototype screens here.
 *
 * Each entry needs:
 *   - href: the filename in app/ (without .tsx), e.g. 'checkout' for app/checkout.tsx
 *   - title: what shows on the home screen
 *   - author: your name
 *
 * Claude Code: when creating a new prototype, add an entry here and create the
 * corresponding file in app/. Don't modify _layout.tsx.
 */
const prototypes: { href: string; title: string; author: string }[] = [
  // Add your prototypes here. Example:
  { href: '/merchant-list', title: 'Merchant List', author: 'Frederic' },
  // { href: '/checkout', title: 'Checkout Flow', author: 'Sofia' },
  // { href: '/order-tracking', title: 'Order Tracking', author: 'Tomaš' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text type="Heading2XL">Delivery</Text>
        <Text type="HeadingXS">Design Sandbox</Text>
        <Text type="BodyMRegular" color={Colors.content.secondary} style={styles.subtitle}>
          Prototype screens using Bolt's UIKit components and Claude Code.
        </Text>
      </View>

      {prototypes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text type="BodyLRegular" color={Colors.content.secondary}>
            No prototypes yet. Open Claude Code and ask it to build a screen.
          </Text>
          <Text type="BodySRegular" color={Colors.content.tertiary} style={styles.hint}>
            Try: "Create a merchant list screen with three restaurants"
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {prototypes.map((proto) => (
            <Link key={proto.href} href={proto.href as any} style={styles.card}>
              <View style={styles.cardContent}>
                <Text type="HeadingXS">{proto.title}</Text>
                <Text type="BodySRegular" color={Colors.content.secondary}>
                  {proto.author}
                </Text>
              </View>
              <Text type="BodyMRegular" color={Colors.content.actionPrimary}>
                →
              </Text>
            </Link>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.layer.floor0,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  emptyState: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: 'center',
  },
  hint: {
    marginTop: 12,
    fontStyle: 'italic',
  },
  list: {
    paddingHorizontal: 24,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.layer.surface,
    borderRadius: 12,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
});
