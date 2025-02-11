import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Comprehensive global country codes to flags
const COUNTRY_CODES = {
  '1': '🇺🇸',    // United States
  '7': '🇷🇺',    // Russia
  '20': '🇪🇬',   // Egypt
  '27': '🇿🇦',   // South Africa
  '30': '🇬🇷',   // Greece
  '31': '🇳🇱',   // Netherlands
  '32': '🇧🇪',   // Belgium
  '33': '🇫🇷',   // France
  '34': '🇪🇸',   // Spain
  '36': '🇭🇺',   // Hungary
  '39': '🇮🇹',   // Italy
  '40': '🇷🇴',   // Romania
  '41': '🇨🇭',   // Switzerland
  '42': '🇨🇿',   // Czech Republic
  '43': '🇦🇹',   // Austria
  '44': '🇬🇧',   // United Kingdom
  '45': '🇩🇰',   // Denmark
  '46': '🇸🇪',   // Sweden
  '47': '🇳🇴',   // Norway
  '48': '🇵🇱',   // Poland
  '49': '🇩🇪',   // Germany
  '51': '🇵🇪',   // Peru
  '52': '🇲🇽',   // Mexico
  '53': '🇨🇺',   // Cuba
  '54': '🇦🇷',   // Argentina
  '55': '🇧🇷',   // Brazil
  '56': '🇨🇱',   // Chile
  '57': '🇨🇴',   // Colombia
  '58': '🇻🇪',   // Venezuela
  '60': '🇲🇾',   // Malaysia
  '61': '🇦🇺',   // Australia
  '62': '🇮🇩',   // Indonesia
  '63': '🇵🇭',   // Philippines
  '64': '🇳🇿',   // New Zealand
  '65': '🇸🇬',   // Singapore
  '66': '🇹🇭',   // Thailand
  '81': '🇯🇵',   // Japan
  '82': '🇰🇷',   // South Korea
  '84': '🇻🇳',   // Vietnam
  '86': '🇨🇳',   // China
  '90': '🇹🇷',   // Turkey
  '91': '🇮🇳',   // India
  '92': '🇵🇰',   // Pakistan
  '93': '🇦🇫',   // Afghanistan
  '94': '🇱🇰',   // Sri Lanka
  '95': '🇲🇲',   // Myanmar
  '98': '🇮🇷',   // Iran
  '234': '🇳🇬',  // Nigeria (default)
};

export default function PhoneNumber() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [phoneInput, setPhoneInput] = useState("");  // Holds both country code and phone number
  const [countryFlag, setCountryFlag] = useState("🇳🇬");  // Default flag (Nigeria)

  console.log(phoneInput);

  const handlePhoneInputChange = (text) => {
    const cleanedInput = text.replace(/\D/g, '');  // Clean non-digit characters

    // Extract country code from the cleaned input
    let matchedCode = '';
    for (let i = cleanedInput.length; i > 0; i--) {
      const partialCode = cleanedInput.slice(0, i);
      if (COUNTRY_CODES[partialCode]) {
        matchedCode = partialCode;
        break;
      }
    }

    // Update country flag based on the matched country code
    setCountryFlag(COUNTRY_CODES[matchedCode] || '🌐');

    // Update the phone input with the country code and phone number
    setPhoneInput('+' + cleanedInput);
  };

  const handleNext = async () => {
    const phoneNumber = phoneInput.replace(/\D/g, '');  // Remove all non-digit characters
    
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
      return;
    }
    
    try {
      const bodyData = JSON.stringify({ phone_number: phoneNumber });

      // Make POST request to check if phone number exists
      const response = await fetch("https://billgold.ng/casa/API/driver_user.php?action=driver_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: bodyData, 
      });

      const data = await response.json();
      console.log(data);

      // Always store the user_token in AsyncStorage regardless of the `next_step`
      await AsyncStorage.setItem('user_token', data.user_token);

      const userToken = data.user_token; 
      console.log(userToken);

      // Fetch user details using the user_token
      const driverDetailsResponse = await fetch(
        `https://billgold.ng/casa/API/driver_get_details.php?action=get_driver_details&user_token=${userToken}`
      );
      
      const driverDetails = await driverDetailsResponse.json();
      console.log(driverDetails); 

      
      if (driverDetails.data.password === "") {
        
        router.push("./otp");
      } else {
       
        router.push("./password2");
      }
    } catch (error) {
      console.error("Error in API request:", error);
      Alert.alert("Network Error", "Please check your internet connection.");
    }
  };

  const isButtonDisabled = phoneInput.trim() === "" || !/^[0-9]{10,15}$/.test(phoneInput.replace(/\D/g, ''));

  return (
    <SafeAreaView className="flex-1 items-center bg-white py-5">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-6 left-4 mt-8 pt-5"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View className="w-10/12 mt-[5rem]">
        <Text className="text-center font-bold text-2xl font-Montserra">
          Enter your phone number
        </Text>
        <Text className="text-center text-gray-600 font-bold pt-3 font-Montserra">
          Enter country code and phone number
        </Text>

        <View className="my-9 py-3 relative">
          <TextInput
            className="border-b border-gray-300 py-4 mt-1 font-bold text-2xl bg-white pl-12 ml-3 font-Montserra"
            placeholder="Phone Number"
            value={phoneInput}
            onChangeText={handlePhoneInputChange}
            keyboardType="phone-pad"
          />
          <View 
            className="absolute top-[2.8rem] transform -translate-y-1/2 flex-row items-center"
          >
            <Text className="text-2xl ml-4 text-3xl">{countryFlag}</Text>
          </View>
        </View>

        <TouchableOpacity
          className={`p-4 rounded-[10px] mt-4 items-center ${isButtonDisabled ? "bg-[#4B5320]" : "bg-[#4B5320]"}`}
          onPress={handleNext}
          disabled={isButtonDisabled}
        >
          <Text className="text-white font-bold font-Montserra">
            Login / Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
