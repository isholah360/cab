import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRouter } from "expo-router"; // Import useRouter for navigation
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const router = useRouter();
  const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [lastName, setLastName] = useState("");
     const [email, setEmail] = useState("");

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]); 

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const fetchUserData = async () => {

      // https://billgold.ng/casa/API/driver_get_details.php?action=get_driver_details&user_token=${userToken}
      try {
        const userToken = await AsyncStorage.getItem("user_token");
        const userDriver = await AsyncStorage.getItem("drivers_id");
        console.log(userDriver)
        if (userToken) {
          const response = await fetch(
             `https://casa-nbjx.onrender.com/api/drivers/profile/${userToken}`
          );
          const data = await response.json();
          console.log(data)
          if (data) {
            const { first_name, last_name, email, profile_picture } = data
            setFirstName(first_name);
            setLastName(last_name);
            setEmail(email);
            setProfilePicture(profile_picture);
            console.log(profilePicture)
  
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

  // Define navigation functions
  const navigateTo = (screenName: string) => {
    router.push(`./${screenName}`); // Navigate to the respective screen
  };

  return (
    <View className="flex-1 bg-white p">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4 mb-5"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* Profile Section */}
      <View className="items-center mt-10 pt-6">
        <Image
          source={{ uri: `${profilePicture}` }} // Replace with actual image URL or local image path
          className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
        />
        <Text className="text-xl font-bold mt-2 text-black font-montserrat">
          {firstName} {lastName}
        </Text>
        <Text className="text-gray-600 text-base font-montserrat">
          {email} 
        </Text>
        <TouchableOpacity
          className="bg-[#4B5320] text-white px-4 py-2 mt-4 rounded-lg"
          onPress={() => navigateTo("editProfile")} // Navigate to Edit Profile screen  
        >
          <Text className="font-bold text-white font-montserrat">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* More Options Section */}
      <View className="mt-8">
        <Text className="text-gray-600 ml-4 font-montserrat">More</Text>
        <TouchableOpacity
          onPress={() => navigateTo("kyc")} // Navigate to KYC Verification screen
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <Ionicons
              name="document-text"
              size={27}
              color="black"
              className="mr-4"
            />
            <Text className="text-gray-800 text-xl font-montserrat">
              KYC Verification
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("training")} // Navigate to Training screen
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <Ionicons name="person" size={27} color="black" className="mr-4" />
            <Text className="text-gray-800 text-xl font-montserrat">
              Training
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("faq")} // Navigate to FAQ screen
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <Ionicons
              name="help-circle"
              size={27}
              color="black"
              className="mr-4"
            />
            <Text className="text-gray-800 text-xl font-montserrat">
              Frequently Asked Questions
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("earning")} // Navigate to Earnings screen
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <Ionicons name="cash" size={27} color="black" className="mr-4" />
            <Text className="text-gray-800 text-xl font-montserrat">
              Earnings
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("referral")} // Navigate to Refer & Earn screen
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <FontAwesome
              name="handshake-o"
              size={24}
              color="black"
              className="mr-4"
            />
            <Text className="text-gray-800 text-xl font-montserrat">
              Refer & Earn
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("withdrawal")} // Navigate to Withdrawals screen
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <Ionicons name="card" size={27} color="black" className="mr-4" />
            <Text className="text-gray-800 text-xl font-montserrat">
              Withdrawals
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("wallet")} // Navigate to Wallet Transactions screen
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <Ionicons name="wallet" size={27} color="black" className="mr-4" />
            <Text className="text-gray-800 text-xl font-montserrat">
              Wallet Transactions
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("notification")} // Navigate to Notifications screen
          className="flex-row items-center justify-between p-4"
        >
          <View className="flex-row items-center">
            <Ionicons
              name="notifications"
              size={27}
              color="black"
              className="mr-4"
            />
            <Text className="text-gray-800 text-xl font-montserrat">
              Notifications
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("about")} // Navigate to Notifications screen
          className="flex-row items-center justify-between p-4"
        >
          <View className="flex-row items-center">
            <Ionicons
              name="notifications"
              size={27}
              color="black"
              className="mr-4"
            />
            <Text className="text-gray-800 text-xl font-montserrat">
              About Us
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={27} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
