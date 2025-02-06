import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function OTPScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [otp, setOtp] = useState("");

  const handleNext = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    // Store the OTP in AsyncStorage
    try {
      await AsyncStorage.setItem("otp", otp);
      router.push("./userName"); // Navigate to the next screen
    } catch (error) {
      console.error("Error saving OTP:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View className="w-10/12 mt-[5rem]">
        <Text className="text-center font-bold text-2xl font-Montserra">
          Enter OTP
        </Text>
        <Text className="text-center text-gray-600 pt-3 font-Montserra">
          Please enter the 6-digit OTP sent to your email
        </Text>
        {/* OTP Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <Ionicons
            name="keypad-sharp"
            size={24}
            color="black"
            className="mr-2"
          />
          <TextInput
            className="py-3 font-bold text-xl bg-white flex-1 font-Montserra"
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
        {/* Next Button */}
        <TouchableOpacity
          className={`p-4 rounded-[10px] mt-4 items-center ${
            otp.length !== 6 ? "bg-[#4B5320]" : "bg-[#4B5320]"
          } font-Montserra`}
          onPress={handleNext}
          disabled={otp.length !== 6} // Disable button if OTP length is not 6
        >
          <Text className="text-white font-bold font-Montserra">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
