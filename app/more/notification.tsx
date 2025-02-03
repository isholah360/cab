import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const NotificationScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const notifications = [
    {
      title: "Vehicle Maintenance Reminder",
      message: "It's time for a check-up! Keep yo...",
      time: "3 months ago",
    },
    {
      title: "Traffic Alert!",
      message: "Expect delays ahead. Adjust your rout...",
      time: "3 months ago",
    },
    {
      title: "Safety Tip of the Day",
      message: "Remember to follow safe drivin...",
      time: "3 months ago",
    },
    {
      title: "High Demand Nearby!",
      message: "Passengers are looking for rides in yo...",
      time: "3 months ago",
    },
    {
      title: "Ready to Drive?",
      message: "You're online but haven't received ...",
      time: "3 months ago",
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 p-6 py-10">
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-2xl font-bold text-center mb-8 mt-8 pt-5">Notification</Text>

      {/* Notifications List */}
      {notifications.map((notification, index) => (
        <View key={index} className="bg-white p-4 rounded-lg mb-4">
          <View className="flex-row items-center">
            <View className="bg-[#4B5320] items-center justify-center rounded-full w-10 h-10 mr-4">
              <FontAwesome
                name="bell"
                size={22}
                color="white"
              />
            </View>
            {/* Replace with actual icon */}
            <View>
              <Text className="text-lg font-bold">{notification.title}</Text>
              <Text className="text-gray-600">{notification.message}</Text>
              <Text className="text-gray-500 mt-1">{notification.time}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default NotificationScreen;
