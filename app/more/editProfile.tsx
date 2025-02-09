import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutText, setAboutText] = useState("Say a little bit about yourself...");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem("user_token");
        if (userToken) {
          const response = await fetch(
            `https://billgold.ng/casa/API/driver_get_details.php?action=get_driver_details&user_token=${userToken}`
          );
          const data = await response.json();
          if (data.status === "success" && data.data) {
            const { first_name, last_name, email, phone_number } = data.data;
            setFirstName(first_name);
            setLastName(last_name);
            setEmail(email);
            setPhoneNumber(phone_number);
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

  const handleSave = async () => {
    try {
      const userToken = await AsyncStorage.getItem("user_token");

      if (!userToken) {
        Alert.alert("Error", "User token is missing.");
        return;
      }

      const requestData = {
        user_token: userToken,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        about_text: aboutText,
      };

      const response = await fetch(
        "https://billgold.ng/casa/API/driver_details.php?action=update_driver_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        Alert.alert("Success", "Your profile has been updated.");
        setTimeout(() => {
          router.push("./profile"); // Replace with the correct screen name
        }, 2000);
      } else {
        Alert.alert("Error", "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={() => router.back()} className="absolute top-6 left-4 mt-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-white text-2xl font-bold mb-8">Edit Profile</Text>

      <View className="items-center mt-8">
        <Ionicons name="person-circle" size={96} color="#D1D5DB" />

        <TextInput
          value={aboutText}
          onChangeText={setAboutText}
          placeholder="Say a little bit about yourself..."
          className="text-xl font-bold mt-2 text-center text-gray-600"
          multiline={true}
          numberOfLines={3}
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-600">First Name</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="person" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="John"
            className="flex-1"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-gray-600">Last Name</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="person" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Doe"
            className="flex-1"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-gray-600">Email</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="mail" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="example@example.com"
            className="flex-1"
          />
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-gray-600">Phone Number</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="call" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="123-456-7890"
            keyboardType="phone-pad"
            className="flex-1"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-[#4B5320] text-white px-4 py-4 rounded-lg mt-auto"
      >
        <Text className="font-bold text-center text-xl text-white">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
