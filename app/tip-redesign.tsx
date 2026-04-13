import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { C, SCREEN_PADDING_H } from '../src/components/tokens';
import { T } from '../src/components/Typography';
import { BoltIcon } from '../src/components/Icon';

// ---------- Mock data (matches production TipOption shape) ----------
const TIP_OPTIONS = [
  { level: 'none', amount: 0, label: 'No tip', isSelected: false },
  { level: 'low', amount: 1, label: '1,00 €', isSelected: false },
  { level: 'medium', amount: 2, label: '2,00 €', isSelected: false },
  { level: 'high', amount: 3, label: '3,00 €', isSelected: true },
  { level: 'custom', amount: 0, label: 'Custom', isSelected: false },
];

// ====================================================================
// CURRENT DESIGN — faithful reproduction of production CourierTips
// ====================================================================
function CurrentTipSection() {
  const [selected, setSelected] = useState(3); // index of pre-selected "3,00 €"

  return (
    <View style={currentStyles.wrapper}>
      {/* Header: icon + text row */}
      <View style={currentStyles.header}>
        {/* Placeholder for courier illustration (96x96 in production) */}
        <View style={currentStyles.iconPlaceholder}>
          <BoltIcon name="bicycle" size={32} color={C.actionPrimary} />
        </View>
        <View style={currentStyles.headerContent}>
          <T type="BodyMAccent" color={C.primary}>
            Tip the courier?
          </T>
          <T type="BodySRegular" color={C.secondary}>
            Couriers get 100% of the tips
          </T>
        </View>
      </View>

      {/* Horizontal chip list — production uses FlatList horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={currentStyles.optionsList}
        contentContainerStyle={currentStyles.optionsContent}
      >
        {TIP_OPTIONS.map((opt, i) => (
          <Pressable
            key={opt.level + opt.amount}
            style={[
              currentStyles.chip,
              selected === i && currentStyles.chipSelected,
            ]}
            onPress={() => setSelected(i)}
            accessibilityRole="button"
            accessibilityLabel={`Tip ${opt.label}`}
          >
            <T
              type="BodySAccent"
              color={selected === i ? C.primaryInverted : C.primary}
            >
              {opt.label}
            </T>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const currentStyles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
  },
  header: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: C.bgActionSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    marginLeft: 12,
    flexShrink: 1,
    justifyContent: 'center',
    gap: 4,
  },
  optionsList: {
    marginTop: 16,
  },
  optionsContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: C.bgNeutralSecondary,
  },
  chipSelected: {
    backgroundColor: C.bgNeutralPrimary,
  },
});

// ====================================================================
// REDESIGNED — prominent tips with larger targets, clear hierarchy
// ====================================================================
function RedesignedTipSection() {
  const [selected, setSelected] = useState(3);

  return (
    <View style={redesignStyles.wrapper}>
      {/* Simplified header — no large icon, cleaner hierarchy */}
      <View style={redesignStyles.header}>
        <View style={redesignStyles.titleRow}>
          <T type="HeadingXSAccent" color={C.primary}>
            Tip your courier
          </T>
          <View style={redesignStyles.badge}>
            <T type="BodyXSAccent" color={C.actionPrimary}>
              100% goes to them
            </T>
          </View>
        </View>
      </View>

      {/* Grid of tip amounts — larger touch targets, clear selected state */}
      <View style={redesignStyles.optionsGrid}>
        {TIP_OPTIONS.filter((o) => o.level !== 'custom').map((opt, i) => {
          const isActive = selected === i;
          return (
            <Pressable
              key={opt.level + opt.amount}
              style={[
                redesignStyles.optionCard,
                isActive && redesignStyles.optionCardSelected,
              ]}
              onPress={() => setSelected(i)}
              accessibilityRole="button"
              accessibilityLabel={`Tip ${opt.label}`}
              accessibilityState={{ selected: isActive }}
            >
              {/* Amount */}
              <T
                type={isActive ? 'HeadingXSAccent' : 'BodyLAccent'}
                color={isActive ? C.actionPrimary : C.primary}
              >
                {opt.amount === 0 ? '—' : `${opt.amount},00 €`}
              </T>
              {/* Label */}
              <T
                type="BodyXSRegular"
                color={isActive ? C.actionPrimary : C.secondary}
              >
                {opt.amount === 0 ? 'No tip' : opt.level === 'low' ? 'Small' : opt.level === 'medium' ? 'Medium' : 'Generous'}
              </T>
              {/* Selected indicator */}
              {isActive && (
                <View style={redesignStyles.checkmark}>
                  <BoltIcon name="check" size={14} color={C.primaryInverted} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Custom tip option — full width, secondary treatment */}
      <Pressable
        style={[
          redesignStyles.customOption,
          selected === 4 && redesignStyles.customOptionSelected,
        ]}
        onPress={() => setSelected(4)}
        accessibilityRole="button"
        accessibilityLabel="Enter custom tip amount"
      >
        <BoltIcon
          name="plus"
          size={16}
          color={selected === 4 ? C.actionPrimary : C.secondary}
        />
        <T
          type="BodySAccent"
          color={selected === 4 ? C.actionPrimary : C.secondary}
        >
          Custom amount
        </T>
      </Pressable>
    </View>
  );
}

const redesignStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: C.bgActionSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  optionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: C.bgNeutralSecondary,
    gap: 4,
    minHeight: 80,
    position: 'relative',
  },
  optionCardSelected: {
    backgroundColor: C.bgActionSecondary,
    borderWidth: 2,
    borderColor: C.borderActionPrimary,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.bgActionPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: C.bgNeutralSecondary,
  },
  customOptionSelected: {
    backgroundColor: C.bgActionSecondary,
    borderWidth: 2,
    borderColor: C.borderActionPrimary,
  },
});

// ====================================================================
// SCREEN — Toggle between current and redesigned
// ====================================================================
export default function TipRedesignScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showRedesign, setShowRedesign] = useState(false);

  const topPad = Math.max(insets.top, 54);
  const bottomPad = Math.max(insets.bottom, 34);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Go back">
            <BoltIcon name="arrow-left" size={24} color={C.primary} />
          </Pressable>
          <T type="HeadingL">Tip Redesign</T>
        </View>

        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <Pressable
            style={[styles.toggleButton, !showRedesign && styles.toggleActive]}
            onPress={() => setShowRedesign(false)}
            accessibilityRole="button"
            accessibilityLabel="Show current design"
          >
            <T
              type="BodySAccent"
              color={!showRedesign ? C.primaryInverted : C.primary}
            >
              Current
            </T>
          </Pressable>
          <Pressable
            style={[styles.toggleButton, showRedesign && styles.toggleActive]}
            onPress={() => setShowRedesign(true)}
            accessibilityRole="button"
            accessibilityLabel="Show redesigned version"
          >
            <T
              type="BodySAccent"
              color={showRedesign ? C.primaryInverted : C.primary}
            >
              Redesign
            </T>
          </Pressable>
        </View>

        {/* Checkout context — minimal, to frame the tip section */}
        <View style={styles.checkoutFrame}>
          {/* Order summary (abbreviated) */}
          <View style={styles.section}>
            <T type="HeadingXSAccent">Kalamaja Burger</T>
            <View style={styles.itemRow}>
              <View style={styles.quantityBadge}>
                <T type="BodySAccent" color={C.primaryInverted}>2</T>
              </View>
              <T type="BodyMRegular" style={{ flex: 1 }}>Classic Smash Burger</T>
              <T type="TabularMAccent">17,80 €</T>
            </View>
            <View style={styles.itemRow}>
              <View style={styles.quantityBadge}>
                <T type="BodySAccent" color={C.primaryInverted}>1</T>
              </View>
              <T type="BodyMRegular" style={{ flex: 1 }}>Sweet Potato Fries</T>
              <T type="TabularMAccent">4,90 €</T>
            </View>
          </View>

          <View style={styles.divider} />

          {/* === THE TIP SECTION === */}
          {showRedesign ? <RedesignedTipSection /> : <CurrentTipSection />}

          <View style={styles.divider} />

          {/* Price breakdown */}
          <View style={styles.section}>
            <View style={styles.priceRow}>
              <T type="BodyMRegular">Subtotal</T>
              <T type="TabularM">22,70 €</T>
            </View>
            <View style={styles.priceRow}>
              <T type="BodyMRegular">Delivery</T>
              <T type="TabularM">1,90 €</T>
            </View>
            <View style={styles.priceRow}>
              <T type="BodyMRegular">Courier tip</T>
              <T type="TabularM" color={C.actionPrimary}>3,00 €</T>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <T type="BodyLAccent">Total</T>
              <T type="TabularLAccent">27,60 €</T>
            </View>
          </View>
        </View>

        <View style={{ height: bottomPad + 80 }} />
      </ScrollView>

      {/* CTA */}
      <View style={[styles.cta, { paddingBottom: bottomPad }]}>
        <View style={styles.ctaButton}>
          <T type="BodyLAccent" color={C.primaryInverted}>
            Place order · 27,60 €
          </T>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.floor0,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_PADDING_H,
    marginBottom: 20,
    backgroundColor: C.bgNeutralSecondary,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleActive: {
    backgroundColor: C.bgNeutralPrimary,
  },
  checkoutFrame: {
    backgroundColor: C.floor0,
  },
  section: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: 16,
  },
  divider: {
    height: 8,
    backgroundColor: C.surface,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  quantityBadge: {
    backgroundColor: C.bgNeutralPrimary,
    borderRadius: 6,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.separator,
  },
  cta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 12,
    backgroundColor: C.floor0,
    borderTopWidth: 1,
    borderTopColor: C.separator,
  },
  ctaButton: {
    backgroundColor: C.bgNeutralPrimary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
