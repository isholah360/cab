import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AddVehicleScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [vehicleName, setVehicleName] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  // Load saved values when component mounts
  useEffect(() => {
    const loadVehicleData = async () => {
      try {
        const savedName = await AsyncStorage.getItem("vehicleName");
        const savedBrand = await AsyncStorage.getItem("vehicleBrand");
        const savedColor = await AsyncStorage.getItem("vehicleColor");
        const savedType = await AsyncStorage.getItem("vehicleType");
        const savedNumber = await AsyncStorage.getItem("vehicleNumber");

        if (savedName) setVehicleName(savedName);
        if (savedBrand) setVehicleBrand(savedBrand);
        if (savedColor) setVehicleColor(savedColor);
        if (savedType) setVehicleType(savedType);
        if (savedNumber) setVehicleNumber(savedNumber);
      } catch (error) {
        console.error("Error loading vehicle data:", error);
      }
    };

    loadVehicleData();
  }, []);

  const handleEditPress = (field) => {
    router.push(`./${field}`);
  };

  const handleNext = () => {
    router.push("/rides/docUpload");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="py-8 pt-10 bg-white">
      <View className="flex-1 bg-white p-4">
        <View className="relative pb-10">
          <View className="absolute top-3 z-10 w-full px-6">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                color="black"
                className="font-bold mr-[-2rem]"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-2xl font-bold text-center mt-10 mb-8 font-Montserrat-bold">
          Add Your Vehicle
        </Text>

        {/* Vehicle Name */}
        <View className="mb-4">
          <Text className="text-gray-600 font-Montserrat-bold">Vehicle Name</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("vehicleName")}
            className="flex-row items-center border border-gray-300 rounded-lg p-4 mt-2"
          >
            <Ionicons name="car" size={27} color="black" className="mr-3" />
            <Text className="text-gray-500 text-xl flex-1 font-Montserrat">
              {vehicleName || "Vehicle Name"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rest of your component remains the same... */}
        {/* Vehicle Brand */}
        <View className="mb-4">
          <Text className="text-gray-600 font-Montserrat">Vehicle Brand</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("branding")}
            className="flex-row items-center border border-gray-300 rounded-lg p-4 mt-2"
          >
            <Ionicons
              name="logo-slack"
              size={27}
              color="black"
              className="mr-3"
            />
            <Text className="text-gray-500 text-xl flex-1 font-Montserrat">
              {vehicleBrand || "Vehicle Brand"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Vehicle Color */}
        <View className="mb-4">
          <Text className="text-gray-600 font-Montserrat">Vehicle Color</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("colorScreen")}
            className="flex-row items-center border border-gray-300 rounded-lg p-4 mt-2"
          >
            <Ionicons
              name="color-palette"
              size={27}
              color="black"
              className="mr-3"
            />
            <Text className="text-gray-500 text-xl flex-1 font-Montserrat">
              {vehicleColor || "Vehicle Color"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Vehicle Type */}
        <View className="mb-8">
          <Text className="text-gray-600 font-Montserrat">Vehicle Type</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("carType")}
            className="flex-row items-center border border-gray-300 rounded-lg p-4 mt-2"
          >
            <Ionicons
              name="car-sport"
              size={27}
              color="black"
              className="mr-2"
            />
            <Text className="text-gray-500 text-xl flex-1 font-Montserrat">
              {vehicleType || "Vehicle Type"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Vehicle Number */}
        <View className="mb-4">
          <Text className="text-gray-600 font-Montserrat">Vehicle Number</Text>
          <TouchableOpacity
            onPress={() => handleEditPress("vehicleNum")}
            className="flex-row items-center border border-gray-300 rounded-lg p-4 mt-2"
          >
            <Octicons name="number" size={24} color="black" className="mr-3" />
            <Text className="text-gray-500 text-xl flex-1 font-Montserrat">
              {vehicleNumber || "Vehicle Number"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Done Button */}
        <TouchableOpacity
          className={`p-4 rounded-[10px] mt-4 items-center bg-[#4B5320] font-Montserrat`}
          onPress={handleNext}
        >
          <Text className="text-white font-bold font-Montserrat">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddVehicleScreen;