import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { BoltIcon } from './Icon';
import { RatingBadge } from './RatingBadge';
import { DeliveryInfo } from './DeliveryInfo';
import { C, F, DEFAULT_BORDER_RADIUS } from './tokens';
import type { Restaurant } from '../data';

interface ProviderCardProps {
  restaurant: Restaurant;
  size?: 'M' | 'L';
  onPress?: () => void;
}

export function ProviderCard({ restaurant, size = 'L', onPress }: ProviderCardProps) {
  const isLarge = size === 'L';
  const margin = isLarge ? 12 : 8;
  const heartSize = isLarge ? 28 : 24;

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
      accessibilityLabel={`${restaurant.name}, ${restaurant.cuisine}`}
    >
      {/* Image area */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: restaurant.image }}
          style={[styles.image, { borderRadius: DEFAULT_BORDER_RADIUS }]}
          contentFit="cover"
          accessibilityLabel={`${restaurant.name} photo`}
        />

        {/* Campaign badge */}
        {restaurant.promo != null && (
          <View
            style={[
              styles.campaignBadge,
              { top: margin, left: margin },
              isLarge ? styles.campaignBadgeL : styles.campaignBadgeM,
            ]}
          >
            <Text style={isLarge ? F.BodySAccent : F.BodyXSAccent} numberOfLines={1}>
              <Text style={styles.campaignText}>{restaurant.promo}</Text>
            </Text>
          </View>
        )}

        {/* Heart button */}
        <Pressable
          style={[
            styles.heartButton,
            { top: margin, right: margin, width: heartSize, height: heartSize, borderRadius: heartSize / 2 },
          ]}
          accessibilityLabel="Save to favourites"
        >
          <BoltIcon name="heart-outlined" size={isLarge ? 16 : 14} color={C.primary} />
        </Pressable>

        {/* Rating badge */}
        <View style={[styles.ratingPosition, { bottom: margin, right: margin }]}>
          <RatingBadge
            rating={restaurant.rating}
            reviews={restaurant.reviews}
            size={isLarge ? 'medium' : 'small'}
          />
        </View>
      </View>

      {/* Details below image */}
      <View style={{ marginTop: isLarge ? 8 : 4 }}>
        {/* Name row */}
        <View style={styles.nameRow}>
          <Text
            style={[isLarge ? F.BodyLAccent : F.BodyMAccent, { color: C.primary }]}
            numberOfLines={1}
          >
            {restaurant.name}
          </Text>
          {restaurant.boltPlus && (
            <View style={[styles.boltPlusBadge, { width: isLarge ? 18 : 16, height: isLarge ? 18 : 16 }]}>
              <Text style={styles.boltPlusIcon}>+</Text>
            </View>
          )}
        </View>

        {/* Delivery info */}
        <View style={{ marginTop: 4 }}>
          <DeliveryInfo
            deliveryFee={restaurant.deliveryFee}
            originalFee={restaurant.originalFee}
            eta={restaurant.eta}
            size={size}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    backgroundColor: C.bgNeutralSecondary,
  },
  campaignBadge: {
    position: 'absolute',
    backgroundColor: '#DE1929',
    borderRadius: 4,
  },
  campaignBadgeL: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  campaignBadgeM: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  campaignText: {
    color: '#FFFFFF',
  },
  heartButton: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingPosition: {
    position: 'absolute',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boltPlusBadge: {
    backgroundColor: '#2B8659',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  boltPlusIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },
});
