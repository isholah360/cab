import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";

const CabBreakdownFAQScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const question = "What if the cab breaks down during the journey?";
  const answer =
    "All our taxi's are regularly inspected along over 30 different points. However, breakdowns cannot be anticipated and do happen. In those cases, we expediently arrange a backup cab to ensure that your travel plans continue uninterrupted and with the least possible delay.";

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <TouchableOpacity
        onPress={() => navigation.goBack("faq")}
        className="mb-8 mt-10"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View className="bg-white p-4 rounded-lg">
        <Text className="text-3xl font-bold mb-4 font-Montserrat">
          {question}
        </Text>
        <Text className="text-gray-600 text-xl font-Montserrat">{answer}</Text>
      </View>
    </View>
  );
};

export default CabBreakdownFAQScreen;
