import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CulturalCommunicationScreen = () => {
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
          How well can you communicate with people from different cultural
          backgrounds?
        </Text>
        <Text className="text-gray-600 font-Montserrat">
          As a cab driver, you may have to communicate with people from
          different cultural backgrounds. Employers ask this question to make
          sure you can do so effectively and respectfully. In your answer,
          explain that you are willing to learn about the cultures of others.
        </Text>
      </View>
    </View>
  );
};

export default CulturalCommunicationScreen;
