import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

export default function UserInfoScreen() {
  const navigation = useNavigation();
    const router = useRouter();
     useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Invalid Name", "Please enter both first and last names.");
      return;
    }
    router.push("./email");; // Navigate to the next screen
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
          Enter your Name
        </Text>
        <Text className="text-center text-gray-600 pt-3 font-Montserrat">
          You need to enter your first and last name
        </Text>
        {/* First Name Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <Entypo name="user" size={24} color="black" />
          <TextInput
            className="py-3 px-5 font-bold text-2xl bg-white flex-1 font-Montserrat"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        {/* Last Name Input */}
        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <Entypo name="user" size={24} color="black" />
          <TextInput
            className="py-3 px-5 font-bold text-2xl bg-white flex-1 font-Montserrat"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        {/* Next Button */}
        <TouchableOpacity
          className={`p-4 rounded-[10px] mt-4 items-center ${
            !firstName.trim() || !lastName.trim() ? "bg-[#4B5320]" : "bg-[#4B5320]"
          } font-Montserrat`}
          onPress={handleNext}
          disabled={!firstName.trim() || !lastName.trim()}
        >
          <Text className="text-white font-bold font-Montserrat">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
