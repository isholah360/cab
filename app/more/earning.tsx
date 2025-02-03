import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router"; // For navigation
import { Ionicons } from "@expo/vector-icons";

const EarningsScreen = () => {
   const router = useRouter();
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);// Use Expo Router's useRouter for navigation

  const handleBack = () => {
    router.back(); // Navigate back to the previous screen
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center p-8 items-center bg-[#ffff]">
          <TouchableOpacity
            onPress={handleBack}
            className="mt-4"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white ml-2">Earnings</Text>
        </View>

        {/* Date Range */}
        <View className="bg-[#4B5320] py-2 items-center">
          <Text className="text-base text-white">January / February 2025</Text>
        </View>

        {/* Calendar */}
        <View className="flex-row justify-around bg-[#4B5320] py-2">
          <TouchableOpacity className="items-center">
            <Text className="text-sm text-white">Mon</Text>
            <Text className="text-base text-white mt-1">27</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center bg-white rounded-full p-1">
            <Text className="text-sm text-red-600">Tue</Text>
            <Text className="text-base text-red-600 mt-1">28</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Text className="text-sm text-white">Wed</Text>
            <Text className="text-base text-white mt-1">29</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Text className="text-sm text-white">Thu</Text>
            <Text className="text-base text-white mt-1">30</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Text className="text-sm text-white">Fri</Text>
            <Text className="text-base text-white mt-1">31</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Text className="text-sm text-white">Sat</Text>
            <Text className="text-base text-white mt-1">1</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Text className="text-sm text-white">Sun</Text>
            <Text className="text-base text-white mt-1">2</Text>
          </TouchableOpacity>
        </View>

        {/* Earnings Cards */}
        <View className="flex-row justify-around my-5">
          <View className="bg-white p-5 rounded-lg w-[45%] items-center">
            <Text className="text-2xl font-bold text-gray-800 w-[80%] text-center">
              Weekly Earnings
            </Text>
            <Text className="text-2xl font-bold text-gray-800 mt-2">$0.00</Text>
          </View>
          <View className="bg-white p-5 rounded-lg w-[45%] items-center">
            <Text className="text-2xl font-bold text-gray-800 w-[80%] text-center">
              Monthly Earnings
            </Text>
            <Text className="text-2xl font-bold text-gray-800 mt-2">$0.00</Text>
          </View>
        </View>

        {/* Total Earnings */}
        <View className="bg-white p-5 rounded-lg my-5 mx-3 items-center">
          <Text className="text-2xl font-bold text-gray-800">
            Total Earnings
          </Text>
          <Text className="text-2xl font-bold text-gray-800 mt-2 font-Montserra">
            $0.00
          </Text>
        </View>

        {/* Trip Histories */}
        <View className="bg-white p-5 rounded-lg my-5 mx-3">
          <Text className="text-2xl font-bold text-gray-800 font-Montserra">
            Trip Histories
          </Text>
          {/* Ensure the image path is correct */}
          <View className="items-center justify-center h-30 w-30">
            <Image
              source={require("../../assets/rec.png")}
              className="w-[60%] h-[60%] object-contain"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EarningsScreen;
