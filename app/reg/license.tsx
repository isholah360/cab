import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function LicenseScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [license, setLicense] = useState("");

  const handleNext = async () => {
    if (!license.trim()) {
      Alert.alert("Invalid License", "Please enter a valid license number.");
      return;
    }

    // Store the license number in AsyncStorage
    try {
      await AsyncStorage.setItem("licenseNumber", license.trim());
      router.push("./birth"); // Navigate to the next screen
    } catch (error) {
      console.error("Error saving license number:", error);
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
        <Text className="text-center font-bold text-2xl font-Montserrat">
          Enter your License Number
        </Text>
        <Text className="text-center text-gray-600 pt-3 font-Montserrat">
          You need to enter your license number
        </Text>
        {/* License Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <FontAwesome name="drivers-license" size={24} color="black" />
          <TextInput
            className="py-3 px-5 font-bold text-2xl bg-white flex-1 font-Montserrat"
            placeholder="License Number"
            value={license}
            onChangeText={setLicense}
          />
        </View>
        {/* Next Button */}
        <TouchableOpacity
          className={`p-4 rounded-[10px] mt-4 items-center ${
            !license.trim() ? "bg-[#4B5320]" : "bg-[#4B5320]"
          } font-Montserrat`}
          onPress={handleNext}
          disabled={!license.trim()} // Disable button if input is empty
        >
          <Text className="text-white font-bold font-Montserrat">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
