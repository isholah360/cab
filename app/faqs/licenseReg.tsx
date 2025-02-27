import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const LicenseRegistrationScreen = () => {

     const router = useRouter();
      const navigation = useNavigation();
    
      useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
  return (
    <View className="flex-1 bg-gray-100 p-4 py-10">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-8">
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Question Container */}
      <View className="bg-white p-4 rounded-lg mb-8">
        <Text className="text-2xl font-Montserrat-bold mb-4">Do you have a valid driver’s license and vehicle registration?</Text>
        <Text className="text-gray-600 font-Montserrat-">
          Yes, I do have a valid driver’s license and vehicle registration. I have been driving professionally for the past five years and have a clean driving record. During this time, I have developed an extensive knowledge of the local roads and traffic patterns. I am also familiar with all relevant laws and regulations regarding cab drivers in my area.
        </Text>
      </View>
    </View>
  );
};

export default LicenseRegistrationScreen;