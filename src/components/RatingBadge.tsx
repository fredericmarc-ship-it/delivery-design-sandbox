import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BoltIcon } from './Icon';
import { C, F } from './tokens';

interface RatingBadgeProps {
  rating: string;
  reviews: string;
  size?: 'small' | 'medium';
}

export function RatingBadge({ rating, reviews, size = 'small' }: RatingBadgeProps) {
  const isGolden = parseFloat(rating) >= 4.6;
  const isSmall = size === 'small';

  return (
    <View style={styles.outer}>
      <View style={[styles.inner, isGolden && styles.innerGolden]}>
        <BoltIcon
          name="star-filled"
          size={isSmall ? 12 : 16}
          color={isGolden ? C.bgActiveWarningPrimary : C.staticKeyDark}
        />
        <Text
          style={[
            isSmall ? F.BodyXSAccent : F.BodySAccent,
            styles.ratingText,
          ]}
          accessibilityLabel={`Rating ${rating}`}
        >
          {rating}
        </Text>
        <Text
          style={[
            isSmall ? F.BodyXSRegular : F.BodySRegular,
            styles.countText,
          ]}
        >
          ({reviews})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 4,
    backgroundColor: C.staticBgKeyLight,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: C.staticBgKeyLight,
  },
  innerGolden: {
    backgroundColor: C.bgWarningSecondary,
  },
  ratingText: {
    color: C.staticKeyDark,
    marginLeft: 4,
  },
  countText: {
    color: C.staticKeyDark,
    marginLeft: 2,
  },
});
