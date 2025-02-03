import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

export default function PasswordScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNext = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError(""); // Clear error if passwords match
    router.push("./addVehicle"); // Navigate to the next screen
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View className="w-10/12 mt-[5rem]">
        <Text className="text-center font-bold text-2xl font-Montserra">
          Enter your password
        </Text>
        <Text className="text-center text-gray-600 pt-3 font-Montserra">
          You need to enter and confirm your password
        </Text>

        {/* Password Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <Entypo
            name="eye-with-line"
            size={24}
            color="black"
            className="mr-2"
          />
          <TextInput
            className="py-3 font-bold text-xl bg-white flex-1 font-Montserra"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm Password Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <Entypo
            name="eye-with-line"
            size={24}
            color="black"
            className="mr-2"
          />
          <TextInput
            className="py-3 font-bold text-xl bg-white flex-1 font-Montserra"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Error Message */}
        {passwordError && (
          <Text className="text-red-500 text-center mb-4 font-Montserra">
            {passwordError}
          </Text>
        )}

        {/* Next Button */}
        <TouchableOpacity
          className={`p-4 rounded-[10px] items-center ${
            password !== confirmPassword ? "bg-[#4B5320]" : "bg-[#4B5320]"
          } font-Montserra`}
          onPress={handleNext}
          disabled={password !== confirmPassword}
        >
          <Text className="text-white font-bold font-Montserra">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
