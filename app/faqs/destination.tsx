import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";

const FAQDetailScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const question = "How to enter or change my destinations?";
  const answer =
    "You will need to enter your destination before confirming your booking. You can do this by: Entering the address in the 'destination' field at the top of the screen. You can also change your destination during your ride by: Clicking 'Edit' and entering the correct destination.";

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <TouchableOpacity
        onPress={() => navigation.goBack("faqs")}
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

export default FAQDetailScreen;
