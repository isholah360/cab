import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function EmailScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [email, setEmail] = useState("");

  const handleNext = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      // Save the email to AsyncStorage
      await AsyncStorage.setItem("email", email.trim());

      // Navigate to the next screen
      router.push("./gender"); // Navigate to the next screen
    } catch (error) {
      console.log("Error saving email:", error);
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
        <Text className="text-center font-bold text-2xl font-Montserra-bold">
          Enter your email
        </Text>
        <Text className="text-center text-gray-600 pt-3 font-Montserra">
          You need to enter your email address
        </Text>
        {/* Email Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <Entypo name="mail" size={24} color="black" />
          <TextInput
            className="py-3 px-5 font-bold text-2xl bg-white flex-1 font-Montserra"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        {/* Next Button */}
        <TouchableOpacity
          className={`p-4 rounded-[10px] mt-4 items-center ${
            email.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
              ? "bg-[#4B5320]"
              : "bg-[#4B5320]"
          } font-Montserra`}
          onPress={handleNext}
          disabled={
            email.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          }
        >
          <Text className="text-white font-bold font-Montserra">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
