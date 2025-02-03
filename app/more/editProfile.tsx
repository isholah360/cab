import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";

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
  const [email, setEmail] = useState("myacc@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutText, setAboutText] = useState("Say a little bit about yourself..."); // New state for the about text

  const handleSave = () => {
    // Handle saving the updated profile information here
    console.log("Profile updated:", {
      firstName,
      lastName,
      email,
      phoneNumber,
      aboutText,
    });
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.back()} className="absolute top-6 left-4 mt-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-8">Edit Profile</Text>

      {/* Profile Picture Placeholder */}
      <View className="items-center mt-8">
        <Ionicons name="person-circle" size={96} color="#D1D5DB" />
        
        {/* Editable about yourself text */}
        <TextInput
          value={aboutText} // Bound to the state
          onChangeText={setAboutText} // Update the state when text changes
          placeholder="Say a little bit about yourself..."
          className="text-xl font-bold mt-2 text-center text-gray-600"
          multiline={true} // Allow multiple lines for more flexibility
          numberOfLines={3} // Set the number of lines you want to show initially
        />
      </View>

      {/* First Name */}
      <View className="mb-4">
        <Text className="text-gray-600">First Name</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="person" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="ishola"
            className="flex-1"
          />
        </View>
      </View>

      {/* Last Name */}
      <View className="mb-4">
        <Text className="text-gray-600">Last Name</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="person" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Duro"
            className="flex-1"
          />
        </View>
      </View>

      {/* Email */}
      <View className="mb-4">
        <Text className="text-gray-600">Email</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="mail" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ishola"
            className="flex-1"
          />
        </View>
      </View>

      {/* Phone Number */}
      <View className="mb-8">
        <Text className="text-gray-600">Phone Number</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mt-2">
          <Ionicons name="call" size={24} color="#4B5563" className="mr-2" />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            className="flex-1"
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-[#4B5320] text-white px-4 py-4 rounded-lg mt-auto"
      >
        <Text className="font-bold text-center text-xl text-white font-Monserrat">
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
