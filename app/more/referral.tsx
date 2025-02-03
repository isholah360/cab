import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ReferAndEarnScreen() {
  const router = useRouter();
   const navigation = useNavigation();
 
   useEffect(() => {
     navigation.setOptions({
       headerShown: false,
     });
   }, [navigation]);
  const handleBack = () => {
    router.back(); // Navigate back to the previous screen
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Title */}
      <View className="flex-row items-center p-2 items-center bg-[#ffff] mb-4">
        <TouchableOpacity onPress={handleBack} className="mt-4">
          <Ionicons name="arrow-back" size={27} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4 mt-3 font-Montserra">Refer And Earn</Text>
      </View>

      {/* Subtitle */}
      <View className="items-center">
        <Text className="text-4xl text-gray-600 text-center mt-4 font-Montserrat w-[80%]">
          EARN WHILE YOU REFER!
        </Text>
      </View>

      {/* Description */}
      <Text className="text-xl text-gray-600 text-center mt-6 font-Montserrat">
        Invite your friends to join Cab2door and enjoy exclusive rewards
        together!
      </Text>

      <View className="flex-1 justify-center items-center mt-10">
        <Image
          source={require("../../assets/ref&earn.png")} // Replace with your image path
          className="w-64 h-64"
          resizeMode="contain"
        />
      </View>

      {/* Share Button */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-[#4B5320] p-4 rounded-lg mt-10"
        onPress={() => {
          // Add your share functionality here
          console.log("Share button pressed");
        }}
      >
        <MaterialIcons name="share" size={24} color="white" />
        <Text className="text-white font-bold ml-2 font-Montserrat">Share</Text>
      </TouchableOpacity>

      {/* Optional: Add an image or illustration */}
    </SafeAreaView>
  );
}
