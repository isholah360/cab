import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications"; // Add this import

const NotificationScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

   
    registerForPushNotificationsAsync();
  }, [navigation]);

 
  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Failed to get push notification permissions!");
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log("Push Token:", token);
  };


  const sendTestPushNotification = async () => {
    const pushToken = await AsyncStorage.getItem("push_token");
    if (pushToken) {
      const message = {
        to: pushToken,
        sound: "default",
        title: "Test Notification",
        body: "This is a test push notification!",
        data: { someData: "goes here" },
      };

      try {
        await Notifications.scheduleNotificationAsync({
          content: message,
          trigger: null, // Send immediately
        });
        Alert.alert("Success", "Test notification sent!");
      } catch (error) {
        console.error("Error sending push notification:", error);
        Alert.alert("Error", "Failed to send test notification.");
      }
    } else {
      console.log("Push token not available");
    }
  };

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

     
      <TouchableOpacity
        onPress={sendTestPushNotification} // Trigger sending test notification
        className="absolute top-16 right-10 p-3 bg-blue-500 rounded-full"
      >
        <Text className="text-white font-bold">Test Notification</Text>
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
