import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { Badge, Colors, Text } from '@bolteu/rnc-react-uikit';

interface Merchant {
  id: string;
  name: string;
  cuisine: string;
  rating: string;
  reviews: string;
  deliveryFee: string;
  eta: string;
  image: string;
  promo?: string;
}

const merchants: Merchant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    cuisine: 'American · Burgers',
    rating: '4.7',
    reviews: '312',
    deliveryFee: '€1.99',
    eta: '20–30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=340&fit=crop',
    promo: '20% OFF',
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    cuisine: 'Japanese · Sushi',
    rating: '4.9',
    reviews: '528',
    deliveryFee: '€2.49',
    eta: '25–35 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=340&fit=crop',
  },
  {
    id: '3',
    name: 'Napoli Express',
    cuisine: 'Italian · Pizza',
    rating: '4.5',
    reviews: '189',
    deliveryFee: 'Free delivery',
    eta: '15–25 min',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=340&fit=crop',
  },
];

function MerchantCard({ merchant }: { merchant: Merchant }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: merchant.image }} style={styles.cardImage} />

      {merchant.promo && (
        <View style={styles.promoBadge}>
          <Text
            type="BodyXSAccent"
            color={Colors.content.promoPrimary}
            style={styles.promoText}
          >
            {merchant.promo}
          </Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <Text type="HeadingXS">{merchant.name}</Text>

        <Text type="BodySRegular" color={Colors.content.secondary}>
          {merchant.cuisine}
        </Text>

        <View style={styles.infoRow}>
          <Text type="BodyTabularSAccent">{merchant.rating}</Text>
          <Text type="BodyTabularSRegular" color={Colors.content.secondary}>
            {' '}
            ({merchant.reviews})
          </Text>

          <Text type="BodySRegular" color={Colors.content.tertiary}>
            {'  ·  '}
          </Text>

          <Text
            type="BodyTabularSRegular"
            color={
              merchant.deliveryFee === 'Free delivery'
                ? Colors.content.actionPrimary
                : Colors.content.secondary
            }
          >
            {merchant.deliveryFee}
          </Text>

          <Text type="BodySRegular" color={Colors.content.tertiary}>
            {'  ·  '}
          </Text>

          <Text type="BodyTabularSRegular" color={Colors.content.secondary}>
            {merchant.eta}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function MerchantListScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text type="HeadingM">Restaurants nearby</Text>
      </View>

      <View style={styles.list}>
        {merchants.map((m) => (
          <MerchantCard key={m.id} merchant={m} />
        ))}
      </View>
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
    paddingTop: 24,
    paddingBottom: 16,
  },
  list: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 48,
  },
  card: {
    backgroundColor: Colors.layer.floor1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.separator,
  },
  cardImage: {
    width: '100%',
    height: 170,
  },
  promoBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.bg.promoSecondary,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  promoText: {
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: 12,
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
