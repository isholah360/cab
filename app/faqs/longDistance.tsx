import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LongDistanceDrivingScreen = () => {
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

      {/* Question Container */}
      <View className="bg-white p-4 rounded-lg mb-8">
        <Text className="text-2xl font-Montserrat-bold mb-4">
          Are you comfortable driving long distances?
        </Text>
        <Text className="text-gray-600 font-Montserrat">
          Driving a cab can involve long distances, especially if you work in an
          area with high demand. Employers ask this question to make sure you’re
          physically and mentally prepared for the job.
        </Text>
      </View>
    </View>
  );
};

export default LongDistanceDrivingScreen;
