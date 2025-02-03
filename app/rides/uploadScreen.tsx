import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadScreen = ({ type }) => {
  const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);

    // Simulate file upload (you can replace this with actual upload logic)
    setTimeout(async () => {
      const fileLink = `https://example.com/${type}_uploaded_file`;

      // Save the uploaded file link in AsyncStorage
      try {
        await AsyncStorage.setItem(type, fileLink);
        alert(`${type} uploaded successfully!`);
        setIsUploading(false);
        router.back(); // Go back to the previous screen after upload
      } catch (error) {
        console.error("Error saving file to AsyncStorage:", error);
        setIsUploading(false);
      }
    }, 2000); // Simulate upload time
  };

  const handleDone = () => {
    router.back(); // Go back to the previous screen when Done is pressed
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Upload {type}</Text>
      <Text className="text-gray-600">Please upload the required document for {type}.</Text>

      {/* Simulate file upload here */}
      <TouchableOpacity
        onPress={handleUpload}
        disabled={isUploading}
        className={`p-4 mt-8 ${isUploading ? "bg-gray-400" : "bg-[#4B5320]"} rounded-[10px] items-center`}
      >
        <Text className="text-white font-bold">
          {isUploading ? "Uploading..." : `Upload ${type}`}
        </Text>
      </TouchableOpacity>

      {/* Done Button */}
      <TouchableOpacity
        onPress={handleDone}
        className="p-4 mt-4 bg-[#4B5320] rounded-[10px] items-center"
      >
        <Text className="text-white font-bold">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadScreen;
