// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import '../global.css';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'; // Import Montserrat fonts
// import { Text, TextStyle } from 'react-native';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   const [fontsLoaded] = useFonts({
//     Montserrat_400Regular,
//     Montserrat_700Bold,
//   });

//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';

  
//   const globalTextStyle: TextStyle = {
//     fontFamily: 'Montserrat_400Regular',
//   };

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

//       <Stack>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>

      
//       <StatusBar style={statusBarStyle} backgroundColor="#4B5320" />
//     </ThemeProvider>
//   );
// }

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Text, TextStyle } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  async function registerForPushNotifications() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      // Get the token
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      console.log('Expo Push Token:', token);

    } catch (error) {
      console.error('Error registering for push:', error);
    }
  }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    // Register for push notifications
    registerForPushNotifications();

    // Set up notification listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received notification:', notification);
      // Handle incoming notification
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User interacted with notification:', response);
      // Handle user interaction with notification
    });

    // Cleanup
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';
  
  const globalTextStyle: TextStyle = {
    fontFamily: 'Montserrat_400Regular',
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={statusBarStyle} backgroundColor="#4B5320" />
    </ThemeProvider>
  );
}
