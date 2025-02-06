import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PasswordScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  console.log(password);  

  const handleVerifyPassword = async () => {
    try {
      const userToken = await AsyncStorage.getItem("user_token");

      if (!userToken) {
        Alert.alert("Error", "User token is missing.");
        return;
      }

      const response = await fetch(
        `https://billgold.ng/casa/API/driver_get_details.php?action=get_driver_details&user_token=${userToken}`
      );
      const data = await response.json();

      console.log(data);  

      if (data.status === "success" && data.data) {
        const storedPassword = data.data.password;

        if (password === storedPassword) {
          router.push("../rides/map"); // Replace "DashboardScreen" with actual screen name
        } else {
          // Password is incorrect
          Alert.alert("Error", "Incorrect password. Please try again.");
        }
      } else {
        Alert.alert("Error", "Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View className="flex-1 items-center bg-white p-6">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View className="w-10/12 mt-[5rem]">
        <Text className="text-center font-bold text-2xl">Enter your password</Text>
        <Text className="text-center text-gray-600 pt-3">Please enter your password to continue</Text>

        {/* Password Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <Entypo name="eye-with-line" size={24} color="black" className="mr-2" />
          <TextInput
            className="py-3 font-bold text-xl bg-white flex-1"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {passwordError && (
          <Text className="text-red-500 text-center mb-4">{passwordError}</Text>
        )}

        <TouchableOpacity
          className="p-4 rounded-[10px] items-center bg-[#4B5320] font-bold"
          onPress={handleVerifyPassword}
        >
          <Text className="text-white">Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
