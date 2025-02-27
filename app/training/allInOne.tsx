import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DriveSmartAcademyAllInOneScreen = () => {
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
          DriveSmart Academy: All-In-One Driver Training
        </Text>
        <Text className="text-gray-600 font-Montserrat">
          Welcome to DriveSmart Academy, the all-in-one app designed to
          transform you into a confident and knowledgeable driver. Our
          innovative approach combines interactive lessons, video tutorials, and
          hands-on exercises to create a comprehensive learning experience.
          Whether you're preparing for your first driving test or seeking to
          refine your skills, this app is tailored to provide personalized
          training that meets your needs. Learn at your own pace, track your
          progress, and prepare for any driving challenge with ease!
        </Text>
      </View>
    </View>
  );
};

export default DriveSmartAcademyAllInOneScreen;
