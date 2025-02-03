import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from "expo-router";

const ChangeLanguageFAQScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
  const question = "How to change language settings of the app?";
  const answer =
    "Let'sGo app automatically sets the language based on the language settings of your device, so in order to change the language of the application, you should change the language settings of your smartphone.";

  return (
    <View className="flex-1 bg-gray-100 p-4">
       <TouchableOpacity onPress={() => navigation.goBack('faq')} className="mb-8 mt-10">
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

export default ChangeLanguageFAQScreen;
