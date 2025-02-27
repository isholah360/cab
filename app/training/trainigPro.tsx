import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DriverTrainingProScreen = () => {
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
          Driver Training Pro: Master Your Driving Skills
        </Text>
        <Text className="text-gray-600 font-Montserrat">
          Welcome to Driver Training Pro, your ultimate companion for becoming a
          skilled and confident driver. Whether you’re a novice or looking to
          improve your driving techniques, this app provides tailored training
          modules for all skill levels. Learn about road signs, traffic rules,
          and advanced driving maneuvers. With its expert-led tutorials,
          real-time feedback, and progress tracking, Driver Training Pro
          empowers you to gain the expertise needed to navigate any driving
          situation safely and effectively.
        </Text>
      </View>
    </View>
  );
};

export default DriverTrainingProScreen;
