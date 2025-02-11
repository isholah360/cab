import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from 'expo-router';

const VehicleCleaningScreen = () => {

      const router = useRouter();
      const navigation = useNavigation();
    
      useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
  return (
    <View className="flex-1 bg-gray-100 p-4 py-5">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-8 py-5 pt-7">
      <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Question Container */}
      <View className="bg-white p-4 rounded-lg mb-8">
        <Text className="text-2xl font-bold mb-4">Describe your process for cleaning your vehicle after each shift?</Text>
        <Text className="text-gray-600 text-[1.1rem]">
          My process for cleaning my vehicle after each shift is thorough and efficient. I start by vacuuming the interior of the car, paying special attention to any spills or messes that may have occurred during the shift. Then, I use a damp cloth with mild soap and water to wipe down all surfaces, including the dashboard, windows, and door handles.
        </Text>
      </View>
    </View>
  );
};

export default VehicleCleaningScreen;