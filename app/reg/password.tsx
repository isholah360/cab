import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PasswordScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleNext = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    try {
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      const gender = await AsyncStorage.getItem("gender");
      const email = await AsyncStorage.getItem("email");
      const date = await AsyncStorage.getItem("selectDOB");
      const phoneNumber = await AsyncStorage.getItem("userPhoneNumber");
      const license = await AsyncStorage.getItem("licenseNumber");
      const otp = await AsyncStorage.getItem("otp");
      const userToken = await AsyncStorage.getItem("user_token");

      const formattedDob = new Date(date).toISOString().split('T')[0];

      const requestData = {
        user_token: userToken,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password_hash: password,
        gender: gender,
        // profile_picture: "http://example.com/profile.jpg",
        date_of_birth: formattedDob,
        address: "123 Street Name, City, Country",
        licence_number: license,
        // id_proof: "http://example.com/id_proof.jpg",
        // id_proof_status: "verified",
        // rejected_reason: "Some rejection reason",
        online_status: "online",
        wallet: 200.50,
        // zone: "Zone A",
        overall_ratings: 4.7,
        no_of_ratings: 170,
        otp: otp,
        status: "active",
        referral_code: "DRIVER123",
        refered_by: "referral_user_token"
      };
// "https://billgold.ng/casa/API/driver_details.php?action=update_driver_details"
      const response = await fetch(
        `https://casa-nbjx.onrender.com/api/drivers/profile/${userToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      
      const result = await response.json();
      console.log(result._id)

      if (result.driver._id === userToken ) {

        Alert.alert( "updated", "Your profile is updated");
        setTimeout(()=>{
          router.push("./addVehicle");
        }, 3000)

      } else {
        Alert.alert("Error", "Failed to update details. Please try again.");
      }
    } catch (error) {
      console.log("Error retrieving data from AsyncStorage or sending to API:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View className="w-10/12 mt-[5rem]">
        <Text className="text-center font-bold text-2xl font-Montserra">
          Enter your password
        </Text>
        <Text className="text-center text-gray-600 pt-3 font-Montserra">
          You need to enter and confirm your password
        </Text>

        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Entypo
              name={isPasswordVisible ? "eye" : "eye-with-line"}
              size={24}
              color="black"
              className="mr-2"
            />
          </TouchableOpacity>
          <TextInput
            className="py-3 font-bold text-xl bg-white flex-1 font-Montserra"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
        </View>

        <View className="my-9 py-3 relative flex-row items-center border border-gray-300 rounded-lg px-4">
          <TouchableOpacity
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <Entypo
              name={isConfirmPasswordVisible ? "eye" : "eye-with-line"}
              size={24}
              color="black"
              className="mr-2"
            />
          </TouchableOpacity>
          <TextInput
            className="py-3 font-bold text-xl bg-white flex-1 font-Montserra"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isConfirmPasswordVisible}
          />
        </View>

        {passwordError && (
          <Text className="text-red-500 text-center mb-4 font-Montserra">
            {passwordError}
          </Text>
        )}

        <TouchableOpacity
          className={`p-4 rounded-[10px] items-center ${
            password !== confirmPassword ? "bg-[#4B5320]" : "bg-[#4B5320]"
          } font-Montserra`}
          onPress={handleNext}
          disabled={password !== confirmPassword}
        >
          <Text className="text-white font-bold font-Montserra">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
