import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';

const EditVehicleColorScreen = () => {
     const router = useRouter();
      const navigation = useNavigation();
      
      useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);
  const [vehicleColor, setVehicleColor] = useState("");

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem("vehicleColor", vehicleColor);
      router.push("./addVehicle");
    } catch (error) {
      console.error("Error saving vehicle color:", error);
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white p-4">
          <View className="absolute top-10 z-10 w-full px-6">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                color="black"
                className="font-bold mr-[-2rem]"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-[5rem]">
            <Text className="text-center font-bold text-2xl font-Montserrat">
              Enter Your Vehicle Color
            </Text>
            <Text className="text-center text-gray-600 pt-3 font-Montserrat">
              Please select the brand of your vehicle
            </Text>
          </View>

          <View className="my-9 py-3 relative flex-row items-center border-b border-gray-300 rounded-lg px-4">
          <Ionicons name="color-palette" size={27} color="black" className="mr-2"/>
            <TextInput
              value={vehicleColor}
              onChangeText={setVehicleColor}
              placeholder="Enter Vehicle Color"
              keyboardType="default"
              className="text-xl"
            />
          </View>
         
          <TouchableOpacity
            onPress={handleDone}
            className="bg-[#4B5320] mt-4 rounded-lg mt-6"
          >
            <Text className="font-bold text-xl text-center text-white p-4">
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default EditVehicleColorScreen;
