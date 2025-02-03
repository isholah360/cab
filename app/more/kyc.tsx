import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
  } from "react-native";
  import React, { useEffect } from "react";
  import MaterialIcons from "@expo/vector-icons/MaterialIcons";
  import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
  
  export default function Kyc() {
    const router = useRouter();
    const navigation = useNavigation();
    const { rideId } = useLocalSearchParams();

    
      useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
  
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
  
    return (
      <>
        <SafeAreaView className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row relative items-center justify-center p-6 pt-12 border-b border-gray-300 bg-[#4B5320]">
            <View className="mt-5"></View>
            <View className="absolute left-6 pt-5">
              <TouchableOpacity onPress={() => router.back("/booking")}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-white font-bold text-2xl">
                Bank & KYC Details
              </Text>
            </View>
          </View>
  
          {/* Scrollable Content */}
          <ScrollView className="flex-1 p-4">
            <Text className="text-2xl font-bold mb-6">Bank & KYC Details</Text>
  
            {/* Bank Name */}
            <View className="mb-4">
              <TextInput
                className="border-b border-gray-400 p-3 pl-5 rounded-full"
                placeholder="Enter Bank Name"
              />
            </View>
  
            {/* Bank Account Number */}
            <View className="mb-4 my-4">
              <TextInput
                className="border-b border-gray-400 p-3 pl-5 p-3 px-3 rounded-full"
                placeholder="Enter Account Number"
                keyboardType="numeric"
              />
            </View>
  
            {/* IFSC Code */}
            <View className="mb-4 my-4">
              <TextInput
                className="border-b border-gray-400 pl-5 border-gray-400 p-3 rounded-full"
                placeholder="Enter IFSC Code"
              />
            </View>
  
            {/* KYC Update Section */}
            <Text className="text-xl font-bold mt-6 mb-4">KYC Update</Text>
  
            {/* Aadhar Number */}
            <View className="mb-4">
              <TextInput
                className="border-b border-gray-400 p-3 pl-5 border-gray-400 p-3 rounded-full"
                placeholder="Enter Aadhar Number"
                keyboardType="numeric"
              />
            </View>
  
            {/* PAN Number */}
            <View className="mb-4 my-4">
              <TextInput
                className="border-b border-gray-400 p-3 pl-5 border-gray-400 p-3 rounded-full"
                placeholder="Enter PAN Number"
              />
            </View>
  
            {/* Terms and Conditions */}
            <Text className="text-gray-600 mt-4 mb-6 text-center text-2xl font-Montserra">
              By submitting, you agree to Touk Touk Terms and Services
            </Text>
          </ScrollView>
  
          {/* Submit Button */}
          <View className="p-4 bg-white border-t border-gray-300">
            <TouchableOpacity className="bg-[#4B5320] p-4 rounded items-center font-Montserra">
              <Text className="text-white font-bold font-Montserra">Submit</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }