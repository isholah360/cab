import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FAQScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const faqItems = [
    { id: "1", question: "How to enter or change my destinations?" },
    { id: "2", question: "How to track your ride?" },
    { id: "3", question: "How to rate our ride?" },
    { id: "4", question: "How to change Destination?" },
    { id: "5", question: "What if the cab breaks down during the journey?" },
    { id: "6", question: "How to change language settings of the app?" },
  ];

  const handlePress = (id) => {
    if (id === "1") {
      router.push(`/faqs/destination`);
    } else if (id === "2") {
      router.push(`/faqs/trackRide`);
    } else if (id === "3") {
      router.push("/faqs/rateRide");
    } else if (id === "4") {
      router.push("/faqs/changeDestination");
    } else if (id === "5") {
      router.push("/faqs/breakdown");
    } else if (id === "6") {
      router.push("/faqs/changeLang");
    }
  };

  return (
    <View className="flex-1 bg-white p-4 px-8 mr-1">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold mt-16 text-center font-Montserrat-bold">
        FAQ's
      </Text>
      <View className="mt-8">
        {faqItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePress(item.id)}
            className="flex-row items-center mb-4"
          >
            <MaterialCommunityIcons
              name="playlist-edit"
              size={24}
              color="black"
            />
            <Text className="ml-3 text-2xl font-Montserrat">
              {item.question}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FAQScreen;
