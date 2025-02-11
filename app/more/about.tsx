import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import Ionicons for icons


const AboutUsScreen = () => {
   const router = useRouter();
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);

  return (
    <View className="flex-1 bg-white p-4 py-6">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-8 pt-5">
      <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-2xl font-bold text-center mb-8">About Us</Text>

      {/* Logo */}
      <View className="items-center mt-8">
        {/* Logo image (can remain as it is) */}
        <Image
          source={require('../../assets/casalogo.png')} // Replace with actual logo path
          className="w-32 h-32"
        />
      </View>

      {/* Version */}
      <Text className="text-center mt-4">Version 1.0</Text>

      {/* Who we are? */}
      <View className="mt-8">
        <Text className="text-xl font-bold mb-2">Who we are?</Text>
        <Text className="text-gray-600">
          You can now get an advanced app for taxi booking for Android and iOS. The application works in real-time and has an integrated Mobile Payment feature which ensures that payments for signed-up drivers can be automatically handled.
        </Text>
      </View>

      {/* Contact Information */}
      <View className="mt-8">
        {/* Phone */}
        <View className="flex-row items-center mb-2">
          <Ionicons name="call" size={24} color="black" className="mr-2" />  {/* Phone icon */}
          <Text className="text-lg">+91 9363671699</Text>
        </View>
        
        {/* Email */}
        <View className="flex-row items-center mb-2 py-2">  
          <Ionicons name="mail" size={24} color="black" className="mr-2" />  {/* Email icon */}
          <Text className="text-lg">sales@menpanitech.com</Text>
        </View>
        
        {/* Address */}
        <View className="flex-row items-center mb-2">
          <Ionicons name="location" size={24} color="black" className="mr-2" />  {/* Address icon */}
          <Text className="text-lg">
            No 29, Mullai Street, Nehru Nagar, Palanganatham, Madurai - Tamil Nadu
          </Text>
        </View>

        {/* Website */}
        <Text className="text-lg mt-2 underline">https://menpanitech.com</Text>
      </View>
    </View>
  );
};

export default AboutUsScreen;
