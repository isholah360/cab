import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WalletScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const [walletBalance, setWalletBalance] = useState(0); // Initialize wallet balance state
  const [selectedTab, setSelectedTab] = useState("expenses");

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

  const handleTopUp = () => {
    console.log("Top up wallet...");
  };

  const handleBack = () => {
    router.back();
  };

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  const getImage = () => {
    if (selectedTab === "all") {
      return require("../../assets/ref&earn.png");
    } else if (selectedTab === "expenses") {
      return require("../../assets/rec.png");
    } else if (selectedTab === "receives") {
      return require("../../assets/ref&earn.png");
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center p-3 items-center mt-4 mb-4">
        <TouchableOpacity onPress={handleBack} className="mt-4">
          <Ionicons name="arrow-back" size={27} color="#000" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold ml-4 mt-3">Wallet</Text>
      </View>

      <View className=" bg-white p-4 rounded-lg mb-8">
        <View className="flex-row justify-between items-center mb-2 border-b py-3">
          <View className="flex-row items-center">
            <Ionicons name="card" size={30} color="#000" />
            <Text className="ml-4 text-2xl text-gray-500 font-Montserrat">
              Total wallet balance
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleTopUp}
            className=" px-2 py-1 rounded-lg"
          >
            <Text className="text-[#4B5320] font-Montserrat">Top up +</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-4xl font-bold font-Montserrat py-5">
          ${walletBalance.toFixed(2)} {/* Display wallet balance */}
        </Text>
      </View>

      <Text className="text-gray-500 text-2xl font-semibold mb-4">
        Transactions List
      </Text>
      <View className="flex-row justify-around mb-8">
        <TouchableOpacity
          onPress={() => handleTabSelect("all")}
          className={`px-2 py-1 ${selectedTab === "all" ? "bg-[#4B5320] rounded-lg" : ""}`}
        >
          <Text className={`${selectedTab === "all" ? "text-white" : "text-gray-500"} text-xl font-Montserrat`}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabSelect("expenses")}
          className={`px-4 py-1 ${selectedTab === "expenses" ? "bg-[#4B5320] rounded-lg" : ""}`}
        >
          <Text className={`${selectedTab === "expenses" ? "text-white" : "text-gray-500"} text-xl font-Montserrat`}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabSelect("receives")}
          className={`px-2 py-1 ${selectedTab === "receives" ? "bg-[#4B5320] rounded-lg" : ""}`}
        >
          <Text className={`${selectedTab === "receives" ? "text-white" : "text-gray-500"} text-xl font-Montserrat`}>Receives</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center justify-center flex-1">
        <Image
          source={getImage()}
          className="w-32 h-32 mb-4"
        />
        <Text className="text-gray-500 text-center font-Montserrat">
          No transactions found
        </Text>
      </View>
    </View>
  );
};

export default WalletScreen;
