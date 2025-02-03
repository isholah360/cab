import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryPicker from "react-native-country-picker-modal";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PhoneNumber() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+234"); // Default to Nigeria
  const [country, setCountry] = useState({
    cca2: "NG", // Default country code for Nigeria
    flag: "🇳🇬", // Default flag for Nigeria
    callingCode: ["234"], // Default calling code for Nigeria
  });
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);

  const handleNext = () => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
      return;
    }
    router.push("./otp"); // Navigate to the next screen
  };

  const handleSelectCountry = (country) => {
    setCountry(country);
    setCountryCode("+" + country.callingCode[0]);
    setIsCountryPickerVisible(false);
  };

  return (
    <>
      <SafeAreaView className="flex-1 items-center bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-6 left-4 mt-4"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View className="w-10/12 mt-[5rem]">
          <Text className="text-center font-bold text-2xl font-Montserra">
            Enter your phone number
          </Text>
          <Text className="text-center text-gray-600 font-bold pt-3 font-Montserra">
            You need to enter your phone number
          </Text>

          {/* Country Code and Phone Number Input */}
          <View className="my-9 py-3 relative">
            <TextInput
              className="border border-gray-300 py-4 mt-1 font-bold text-xl bg-white pl-24 font-Montserra"
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              onPress={() => setIsCountryPickerVisible(true)}
              className="absolute left-4 top-[2.8rem] transform -translate-y-1/2 flex-row items-center"
            >
              <Text className="text-2xl mr-2 font-Montserra">
                {country.flag} {countryCode}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login / Register Button */}
          <TouchableOpacity
            className={`p-4 rounded-[10px] mt-4 items-center ${
              phoneNumber.trim() === "" || !/^[0-9]{10,15}$/.test(phoneNumber)
                ? "bg-[#4B5320]"
                : "bg-[#4B5320]"
            }`}
            onPress={handleNext}
            disabled={
              phoneNumber.trim() === "" || !/^[0-9]{10,15}$/.test(phoneNumber)
            }
          >
            <Text className="text-white font-bold font-Montserra">
              Login / Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Country Picker Modal */}
      <Modal
        visible={isCountryPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCountryPickerVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 h-1/2">
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton
              withAlphaFilter
              onSelect={handleSelectCountry}
              onClose={() => setIsCountryPickerVisible(false)}
              countryCode={country.cca2} // Set the default selected country
            />
            <TouchableOpacity
              className="mt-5 p-3 bg-gray-100 rounded-lg items-center"
              onPress={() => setIsCountryPickerVisible(false)}
            >
              <Text className="text-lg font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
