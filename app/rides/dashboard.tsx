import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MyRidesScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const [selectedTab, setSelectedTab] = useState("All");

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View className="flex-1 bg-white p-4 py-10">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* Title */}
      <Text className="text-2xl font-bold text-center mb-8 font-Montserrat-bold mt-9">
        Dashboard
      </Text>

      {/* Tab Navigation */}
      <View className="bg-gray-100 rounded-lg p-2 py-4 flex-row justify-around mb-8">
        <TouchableOpacity
          onPress={() => handleTabPress("All")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "All" ? "bg-[#4B5320]" : ""
          }`}
        >
          <Text
            className={`text-xl font-Montserrat-bold ${
              selectedTab === "All" ? "text-white" : "text-black"
            }`}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Upcoming")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "Upcoming" ? "bg-[#4B5320]" : ""
          }`}
        >
          <Text
            className={`text-xl font-Montserrat-bold ${
              selectedTab === "Upcoming" ? "text-white" : "text-black"
            }`}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Completed")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "Completed" ? "bg-[#4B5320]" : ""
          }`}
        >
          <Text
            className={`text-xl font-Montserrat-bold ${
              selectedTab === "Completed" ? "text-white" : "text-black"
            }`}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* No Rides Found Image */}
      <View className="items-center justify-center flex-1">
        <Image
          source={require("../../assets/tra.png")} // Replace with actual image path
          className="w-64 h-64"
        />
      </View>

      {/* Bottom Navigation Bar */}
    </View>
  );
};

export default MyRidesScreen;
