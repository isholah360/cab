import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation, useRouter } from "expo-router"; // Import useNavigation to navigate to the next screen

export default function GenderSelectionScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [gender, setGender] = useState(""); // State to store gender
  const [modalVisible, setModalVisible] = useState(false); // State to control dropdown modal visibility

  const handleNext = async () => {
    if (!gender) {
      Alert.alert("Gender", "Please select your gender.");
      return;
    }

    try {
      await AsyncStorage.setItem("gender", gender); // Save gender to AsyncStorage
      router.push("./license"); // Navigate to the Password screen
    } catch (error) {
      console.log("Error saving gender:", error);
    }
  };

  // Toggle Modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
        <Text className="text-center font-bold text-2xl font-Montserra-bold">
          Select Your Gender
        </Text>
        <Text className="text-center text-gray-600 pt-3 text-xl font-Montserra">
          Please select your gender
        </Text>

        {/* Gender Dropdown (Modal) */}
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            backgroundColor: "#f0f0f0",
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            width: "100%",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {gender || "Select Gender"}
          </Text>
        </TouchableOpacity>

        {/* Modal for Gender Selection */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={toggleModal}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 300,
                borderRadius: 10,
                padding: 20,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                Select Gender
              </Text>
              {/* Gender Options */}
              <TouchableOpacity
                onPress={() => {
                  setGender("male");
                  toggleModal();
                }}
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                }}
              >
                <Text style={{ fontSize: 16 }}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender("female");
                  toggleModal();
                }}
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                }}
              >
                <Text style={{ fontSize: 16 }}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender("other");
                  toggleModal();
                }}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ fontSize: 16 }}>Other</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Next Button */}
        <TouchableOpacity
          className={`p-4 rounded-[10px] mt-4 items-center ${
            !gender ? "bg-gray-400" : "bg-[#4B5320]"
          } font-Montserra`}
          onPress={handleNext}
          disabled={!gender} // Disable if no gender is selected
        >
          <Text className="text-white font-bold font-Montserra">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
