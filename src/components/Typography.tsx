import React from 'react';
import { Text, TextProps } from 'react-native';
import { C, F } from './tokens';

/**
 * Token-aware Text component for the prototyping sandbox.
 *
 * Usage:
 *   <T type="BodyMAccent">Restaurant Name</T>
 *   <T type="BodySRegular" color={C.secondary}>Description</T>
 *   <T type="TabXSRegular" color={C.actionPrimary}>0,00 €</T>
 */

interface TProps extends TextProps {
  type: string;
  color?: string;
}

export function T({ type, color, style, ...rest }: TProps) {
  return (
    <Text
      style={[{ color: color ?? C.primary }, F[type], style]}
      {...rest}
    />
  );
}
