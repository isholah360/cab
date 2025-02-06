import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WithdrawalScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const fetchUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem("user_token");
        if (userToken) {
          const response = await fetch(
            `https://billgold.ng/casa/API/driver_get_details.php?action=get_driver_details&user_token=${userToken}`
          );
          const data = await response.json();
          if (data.status === "success" && data.data) {
            setWalletBalance(data.data.wallet); // Set the wallet balance from the API response
          } else {
            console.error("Failed to fetch driver details");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
      <Text className="text-2xl font-bold text-center mb-8 mt-10 pt-5 font-Montserrat-bold">
        Withdrawal
      </Text>

      {/* Current Balance */}
      <View className="bg-white p-4 py-8 rounded-lg mb-8">
        <View className="flex-row items-center">
          <Image
            source={require("../../assets/wallet.png")} // Replace with actual icon
            className="w-12 h-12 mr-4"
          />
          <View>
            <Text className="text-gray-600 text-xl">Current balance</Text>
            <Text className="text-3xl font-bold py-2">${walletBalance.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Withdrawal Histories */}
      <View className="bg-white p-4 rounded-lg mb-8">
        <Text className="text-gray-600 text-xl">Withdrawal Histories</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-[#4B5320] text-white px-4 py-4 rounded-lg mt-auto">
        <Text className="font-bold text-center text-white text-xl">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithdrawalScreen;
