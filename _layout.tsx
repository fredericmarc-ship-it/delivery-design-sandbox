import { Stack } from 'expo-router';
import { IntlProvider } from 'react-intl';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <IntlProvider locale="en" messages={{}}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#2B8659' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '600' },
          }}
        />
      </IntlProvider>
    </SafeAreaProvider>
  );
}
