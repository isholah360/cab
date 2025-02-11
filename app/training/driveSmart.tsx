import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DriveSmartAcademyYScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-8">
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Description Container */}
      <View className="bg-white p-4 rounded-lg mb-8">
        <Text className="text-2xl font-Montserrat-bold mb-4">
          DriveSmart Academy: Your Ultimate Driving Companion
        </Text>
        <Text className="text-gray-600 font-Montserrat">
          Welcome to DriveSmart Academy, the revolutionary mobile app designed
          to equip drivers with essential skills and knowledge for safe and
          responsible driving. Whether you are just starting your driving
          journey or need a refresher course, this app offers an in-depth
          curriculum that covers everything from traffic laws to defensive
          driving techniques. Engaging tutorials and hands-on exercises ensure
          that you gain practical experience and confidence behind the wheel,
          making you a safer driver on the road.
        </Text>
      </View>
    </View>
  );
};

export default DriveSmartAcademyYScreen;
