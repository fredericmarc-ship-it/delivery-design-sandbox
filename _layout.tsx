import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BasketProvider } from '../src/basket';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <BasketProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#fff' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="provider/[id]" />
          <Stack.Screen name="checkout" options={{ presentation: 'modal' }} />
          <Stack.Screen name="tracking" options={{ gestureEnabled: false }} />
        </Stack>
      </BasketProvider>
    </SafeAreaProvider>
  );
}
