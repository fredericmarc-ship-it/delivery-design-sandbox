import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../src/basket';
import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

const C = {
  floor0: '#fff',
  floor1: '#fff',
  surface: 'rgba(0,45,30,0.07)',
  primary: '#191F1C',
  secondary: 'rgba(0,10,7,0.63)',
  tertiary: 'rgba(0,17,11,0.47)',
  actionPrimary: 'rgba(0,112,66,0.92)',
  bgActionPrimary: '#2B8659',
  bgNeutralPrimary: '#0E1010',
  bgNeutralSecondary: 'rgba(0,45,30,0.07)',
  separator: 'rgba(0,45,30,0.07)',
  primaryInverted: 'rgba(253,255,254,0.93)',
  brand: '#2B8659',
  mapBg: '#E8F0ED',
  mapRoute: '#0F1755',
  mapStart: '#2B8659',
  mapEnd: '#0C2C1C',
  mapMarkerBg: '#0E1010',
  mapMarkerText: '#ECEEEB',
};

const fontStyles: Record<string, TextStyle> = {
  'HeadingS': { fontSize: 24, lineHeight: 30, fontWeight: '600', letterSpacing: -0.304 },
  'HeadingXS': { fontSize: 20, lineHeight: 24, fontWeight: '600', letterSpacing: -0.272 },
  'BodyLAccent': { fontSize: 18, lineHeight: 24, fontWeight: '600', letterSpacing: -0.224 },
  'BodyMRegular': { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: -0.176 },
  'BodyMAccent': { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.176 },
  'BodySRegular': { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.096 },
  'BodySAccent': { fontSize: 14, lineHeight: 20, fontWeight: '600', letterSpacing: -0.096 },
  'BodyTabularMAccent': { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.416, fontVariant: ['tabular-nums'] },
  'BodyTabularSRegular': { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.336, fontVariant: ['tabular-nums'] },
};

function T({ type, color, style, ...props }: TextProps & { type: string; color?: string }) {
  return (
    <RNText
      style={[{ fontFamily: 'System', color: color || C.primary }, fontStyles[type], style]}
      {...props}
    />
  );
}

const trackingSteps = [
  { label: 'Order placed', status: 'complete' as const },
  { label: 'Preparing', status: 'active' as const },
  { label: 'On the way', status: 'upcoming' as const },
  { label: 'Delivered', status: 'upcoming' as const },
];

export default function TrackingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const basket = useBasket();

  // Simulate order progression
  const [steps, setSteps] = useState(trackingSteps);
  const [eta, setEta] = useState(22);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSteps([
        { label: 'Order placed', status: 'complete' },
        { label: 'Preparing', status: 'complete' },
        { label: 'On the way', status: 'active' },
        { label: 'Delivered', status: 'upcoming' },
      ]);
      setEta(14);
    }, 5000);

    const timer2 = setTimeout(() => {
      setSteps([
        { label: 'Order placed', status: 'complete' },
        { label: 'Preparing', status: 'complete' },
        { label: 'On the way', status: 'complete' },
        { label: 'Delivered', status: 'active' },
      ]);
      setEta(0);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const currentStep = steps.find((s) => s.status === 'active');
  const isDelivered = steps[3].status === 'active' || steps[3].status === 'complete';

  const handleDone = () => {
    basket.clearBasket();
    router.replace('/');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Map Placeholder */}
      <View style={styles.mapArea}>
        {/* Simulated route */}
        <View style={styles.mapRoute} />
        {/* Restaurant marker */}
        <View style={[styles.mapMarker, styles.mapMarkerStart]}>
          <T type="BodySAccent" color={C.primaryInverted}>
            🍕
          </T>
        </View>
        {/* Destination marker */}
        <View style={[styles.mapMarker, styles.mapMarkerEnd]}>
          <T type="BodySAccent" color={C.primaryInverted}>
            📍
          </T>
        </View>
        {/* Courier marker (animated position would go here) */}
        {!isDelivered && (
          <View style={[styles.mapMarker, styles.courierMarker]}>
            <T type="BodySAccent" color={C.mapMarkerText}>
              🛵
            </T>
          </View>
        )}
      </View>

      {/* Status Card */}
      <View style={[styles.statusCard, { paddingBottom: insets.bottom + 24 }]}>
        {/* ETA */}
        <View style={styles.etaSection}>
          {isDelivered ? (
            <T type="HeadingS">Delivered!</T>
          ) : (
            <>
              <T type="HeadingS">
                {eta} min
              </T>
              <T type="BodyMRegular" color={C.secondary}>
                {currentStep?.label || 'Processing'}
              </T>
            </>
          )}
        </View>

        {/* Progress Stepper */}
        <View style={styles.stepper}>
          {steps.map((step, i) => (
            <View key={step.label} style={styles.stepItem}>
              <View
                style={[
                  styles.stepDot,
                  step.status === 'complete' && styles.stepDotComplete,
                  step.status === 'active' && styles.stepDotActive,
                ]}
              />
              {i < steps.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    (step.status === 'complete') && styles.stepLineComplete,
                  ]}
                />
              )}
            </View>
          ))}
        </View>
        <View style={styles.stepLabels}>
          {steps.map((step) => (
            <T
              key={step.label}
              type="BodySRegular"
              color={step.status === 'upcoming' ? C.tertiary : C.primary}
              style={styles.stepLabel}
            >
              {step.label}
            </T>
          ))}
        </View>

        {/* Courier Info */}
        {!isDelivered && (
          <View style={styles.courierSection}>
            <View style={styles.courierAvatar}>
              <T type="BodyLAccent">🧑</T>
            </View>
            <View style={{ flex: 1 }}>
              <T type="BodyMAccent">Andrei K.</T>
              <T type="BodySRegular" color={C.secondary}>
                Bolt courier · Toyota Yaris
              </T>
            </View>
            <Pressable style={styles.chatButton}>
              <T type="BodyMAccent" color={C.primaryInverted}>
                💬
              </T>
            </Pressable>
          </View>
        )}

        {/* Order Summary */}
        <Pressable style={styles.orderSummaryRow}>
          <T type="BodyMRegular">{basket.restaurantName || 'Your order'}</T>
          <View style={styles.orderSummaryRight}>
            <T type="BodyTabularMAccent">
              €{(basket.totalPrice + basket.deliveryFee).toFixed(2)}
            </T>
            <T type="BodyMRegular" color={C.tertiary}>
              {' '}→
            </T>
          </View>
        </Pressable>

        {/* Done Button (shown after delivery) */}
        {isDelivered && (
          <Pressable style={styles.doneButton} onPress={handleDone}>
            <T type="BodyLAccent" color={C.primaryInverted}>
              Done
            </T>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.mapBg,
  },
  mapArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapRoute: {
    position: 'absolute',
    width: '60%',
    height: 3,
    backgroundColor: C.mapRoute,
    borderRadius: 2,
    top: '45%',
  },
  mapMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMarkerStart: {
    backgroundColor: C.mapStart,
    left: '15%',
    top: '38%',
  },
  mapMarkerEnd: {
    backgroundColor: C.mapEnd,
    right: '15%',
    top: '38%',
  },
  courierMarker: {
    backgroundColor: C.mapMarkerBg,
    left: '45%',
    top: '32%',
  },
  statusCard: {
    backgroundColor: C.floor0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  etaSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: C.bgNeutralSecondary,
  },
  stepDotComplete: {
    backgroundColor: C.bgActionPrimary,
  },
  stepDotActive: {
    backgroundColor: C.bgActionPrimary,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: 'rgba(43,134,89,0.25)',
  },
  stepLine: {
    flex: 1,
    height: 3,
    backgroundColor: C.bgNeutralSecondary,
    marginHorizontal: 4,
  },
  stepLineComplete: {
    backgroundColor: C.bgActionPrimary,
  },
  stepLabels: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
  },
  courierSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: C.separator,
  },
  courierAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.bgNeutralSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.bgNeutralPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: C.separator,
  },
  orderSummaryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: C.bgActionPrimary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
});
