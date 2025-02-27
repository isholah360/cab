import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DriveWiseScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-gray-100 p-4 py-10">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-8">
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Description Container */}
      <View className="bg-white p-4 rounded-lg mb-8">
        <Text className="text-2xl font-Montserrat-bold mb-4">
          DriveWise: Elevate Your Driving Skills
        </Text>
        <Text className="text-gray-600 font-Montserrat">
          Welcome to DriveWise, the premier mobile app designed to revolutionize
          driver training. Whether you're a first-time driver or looking to
          enhance your existing skills, DriveWise offers a dynamic and
          interactive learning environment. With real-world scenarios, detailed
          tutorials, and personalized progress tracking, this app ensures that
          you become a confident and responsible driver, equipped for any
          situation on the road. Ready to level up your driving experience?
          Let's get started!
        </Text>
      </View>
    </View>
  );
};

export default DriveWiseScreen;
