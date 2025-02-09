import React, { useState, useEffect } from 'react';
import { View, Image, Text, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location'; // Import Location API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const SplashScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [powerByText, setPowerByText] = useState('');
  const [casaText, setCasaText] = useState('');
  const fullPowerByText = "Powered by ";
  const fullCasaText = "Casa";
  const typingSpeed = 150;

  useEffect(() => {
    // Show modal after 5 seconds
    const modalTimer = setTimeout(() => {
      setModalVisible(true);
    }, 5000);

    // Typing animation
    let currentIndex = 0;
    const textTimer = setInterval(() => {
      if (currentIndex < fullPowerByText.length) {
        setPowerByText(fullPowerByText.slice(0, currentIndex + 1));
        currentIndex++;
      } else if (currentIndex < fullPowerByText.length + fullCasaText.length) {
        const casaIndex = currentIndex - fullPowerByText.length;
        setCasaText(fullCasaText.slice(0, casaIndex + 1));
        currentIndex++;
      } else {
        clearInterval(textTimer);
      }
    }, typingSpeed);

    // Cleanup both timers
    return () => {
      clearTimeout(modalTimer);
      clearInterval(textTimer);
    };
  }, []);

  const handleAllow = async () => {
    setModalVisible(false);

    // Request for location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      // If permission granted, get the GPS location
      const location = await Location.getCurrentPositionAsync({});
      console.log("User's location:", location);

      // Save the coordinates in AsyncStorage
      try {
        const locationData = JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        await AsyncStorage.setItem('userLocation', locationData); // Save to AsyncStorage
        console.log("Location saved to AsyncStorage");

        // After getting the location, navigate to the next screen
        router.push('/reg/phone');
      } catch (error) {
        console.error("Error saving location to AsyncStorage:", error);
      }
    } else {
      // Handle the case where the permission is denied
      alert('Location permission denied!');
    }
  };

  const handleDeny = () => {
    setModalVisible(false);
    const reopenTimer = setTimeout(() => {
      setModalVisible(true);
    }, 5000);
    return () => clearTimeout(reopenTimer);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="flex-1 justify-center items-center">
        <Image
          source={require('../assets/casalogo.png')}
          className="w-48 h-48 object-contain"
        />
      </View>

      {/* Typing animation text with bold Casa */}
      <View className="absolute bottom-10 flex-row">
        <Text className="text-xl text-black font-Montserrat">
          {powerByText}
        </Text>
        <Text className="text-xl font-bold text-black font-Montserrat-bold">
          {casaText}
        </Text>
      </View>

      {/* GPS Permission Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-72 p-6 bg-white rounded-lg items-center justify-center">
            <Text className="text-xl font-bold mb-4">
              Allow app to access your GPS
            </Text>
            <Text className="text-lg mb-6 text-center">
              To provide better services, we need access to your GPS.
            </Text>
            <View className="w-full flex-row justify-between space-x-4">
              <TouchableOpacity
                style={{ backgroundColor: '#4B5320' }}
                className="p-4 rounded-full w-24 items-center"
                onPress={handleAllow}
              >
                <Text className="text-white font-bold text-center text-base">
                  Allow
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: '#4B5320' }}
                className="p-4 rounded-full w-24 items-center"
                onPress={handleDeny}
              >
                <Text className="text-white font-bold text-center text-base">
                  Deny
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SplashScreen;
