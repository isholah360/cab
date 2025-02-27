import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications"; // Add this import

export default function PasswordScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

   
    registerForPushNotificationsAsync();

  }, [navigation]);

  
  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Failed to get push notification permissions!");
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    await AsyncStorage.setItem("push_token", token.data);  // Save the token in AsyncStorage
  };

  const sendPushNotification = async () => {
    const pushToken = await AsyncStorage.getItem("push_token");
    if (pushToken) {
      const message = {
        to: pushToken,
        sound: "default",
        title: "Login Success",
        body: "You have successfully logged in!",
        data: { someData: "goes here" },
      };

      await Notifications.scheduleNotificationAsync({
        content: message,
        trigger: null, // Send immediately
      });
    } else {
      console.log("Push token not available");
    }
  };

  const handleVerifyPassword = async () => {
    try {
      const phoneNumber = await AsyncStorage.getItem('phone'); // Retrieve phone number from AsyncStorage
      if (!phoneNumber) {
        Alert.alert("Error", "Phone number is missing.");
        return;
      }
  
      const requestData = {
        phone_number: phoneNumber,  
        password: password,        
      };
  
      // Make the POST request
      const response = await fetch("https://casa-nbjx.onrender.com/api/drivers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (data.message === "Login successful") {
        router.push("../rides/map");  
        sendPushNotification();       
      } else {
        Alert.alert("Error", "Login failed. Please check your credentials and try again.");
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
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
          >
            <Entypo 
              name={isPasswordVisible ? "eye" : "eye-with-line"} // Change icon based on visibility
              size={24} 
              color="black" 
              className="mr-2" 
            />
          </TouchableOpacity>
          <TextInput
            className="py-3 font-bold text-xl bg-white flex-1"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible} 
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
