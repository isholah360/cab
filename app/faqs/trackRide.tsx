import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";

const TrackRideFAQScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
  const question = "How to track your ride?";
  const answer =
    "Once your booking is confirmed, you’ll be able to track your ride and see the following details on your app in real time: Your driver’s ETA and current location. The driver’s route to your pick-up address. The entire route of your ride.";

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <TouchableOpacity
        onPress={() => navigation.goBack('faq')}
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

export default TrackRideFAQScreen;
