import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BoltIcon } from './Icon';
import { C, F, SCREEN_PADDING_H } from './tokens';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, subtitle, onSeeAll }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={[F.HeadingS, { color: C.primary }]}>{title}</Text>
        {subtitle != null && (
          <Text style={[F.BodyXSRegular, { color: C.secondary, marginTop: 2 }]}>{subtitle}</Text>
        )}
      </View>
      {onSeeAll != null && (
        <Pressable
          onPress={onSeeAll}
          style={styles.seeAll}
          accessibilityLabel={`See all ${title}`}
        >
          <Text style={[F.BodySRegular, { color: C.primary }]}>All</Text>
          <BoltIcon name="chevron-right" size={16} color={C.primary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_H,
  },
  left: {
    flex: 1,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
