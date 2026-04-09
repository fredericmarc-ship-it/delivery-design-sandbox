import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from './tokens';

/**
 * iPhone status bar mockup for prototype fidelity.
 * Renders time, Dynamic Island pill, and signal/wifi/battery indicators.
 * All built from Views — no images required.
 */
export function StatusBarChrome() {
  return (
    <View style={styles.container}>
      {/* Left: Time */}
      <View style={styles.side}>
        <Text style={styles.time}>15:31</Text>
      </View>

      {/* Center: Dynamic Island */}
      <View style={styles.center}>
        <View style={styles.dynamicIsland} />
      </View>

      {/* Right: Signal + Wifi + Battery */}
      <View style={[styles.side, styles.rightSide]}>
        {/* Signal dots */}
        <View style={styles.signalGroup}>
          {[4, 6, 8, 10].map((h, i) => (
            <View
              key={i}
              style={[styles.signalBar, { height: h }]}
            />
          ))}
        </View>

        {/* Wifi arcs (simplified as small filled shape) */}
        <View style={styles.wifiIcon}>
          <View style={[styles.wifiArc, styles.wifiArc3]} />
          <View style={[styles.wifiArc, styles.wifiArc2]} />
          <View style={styles.wifiDot} />
        </View>

        {/* Battery */}
        <View style={styles.batteryOuter}>
          <View style={styles.batteryBody}>
            <View style={styles.batteryFill} />
          </View>
          <View style={styles.batteryTip} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 8,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  side: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: C.primary,
    letterSpacing: 0,
  },
  dynamicIsland: {
    width: 126,
    height: 36,
    backgroundColor: C.staticKeyDark,
    borderRadius: 18,
  },

  // Signal bars
  signalGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1.5,
  },
  signalBar: {
    width: 3,
    backgroundColor: C.primary,
    borderRadius: 1,
  },

  // Wifi
  wifiIcon: {
    width: 16,
    height: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wifiArc: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: C.primary,
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  wifiArc3: {
    width: 14,
    height: 7,
    borderRadius: 7,
    bottom: 4,
  },
  wifiArc2: {
    width: 9,
    height: 5,
    borderRadius: 5,
    bottom: 2,
  },
  wifiDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.primary,
  },

  // Battery
  batteryOuter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBody: {
    width: 24,
    height: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: C.primary,
    padding: 1.5,
    justifyContent: 'center',
  },
  batteryFill: {
    width: '65%',
    height: '100%',
    backgroundColor: '#FFB200',
    borderRadius: 1,
  },
  batteryTip: {
    width: 2,
    height: 5,
    backgroundColor: C.primary,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    marginLeft: 0.5,
  },
});
