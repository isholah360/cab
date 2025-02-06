import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const UploadScreen = ({ type }) => {
   const router = useRouter();
    const navigation = useNavigation();
    const { rideIds } = useLocalSearchParams();
  
    useEffect(() => {
      navigation.setOptions({ headerShown: false }); // Load saved files from AsyncStorage on component mount
    }, [navigation]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUri, setFileUri] = useState(null);

  // Handle the file upload
  const handleUpload = async () => {
    if (!fileUri) {
      alert("Please select an image or document first!");
      return;
    }

    setIsUploading(true);

    // Simulate file upload (replace with actual upload logic)
    setTimeout(async () => {
      const fileLink = `https://example.com/${type}_uploaded_file`; // Replace with actual upload URL

      try {
        await AsyncStorage.setItem(type, fileLink);
        alert(`${type} uploaded successfully!`);
        setIsUploading(false);
        router.back(); // Go back after upload
      } catch (error) {
        console.error("Error saving file to AsyncStorage:", error);
        setIsUploading(false);
      }
    }, 2000);
  };

  // Select a file (image or document)
  const handleSelectFile = async () => {
    try {
      // Prompt for image selection
      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!imageResult.cancelled) {
        setFileUri(imageResult.uri);
      }

      // Prompt for document selection (if no image selected)
      if (!imageResult.cancelled) return;
      
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Customize file types (e.g., 'application/pdf')
      });

      if (documentResult.type === "success") {
        setFileUri(documentResult.uri);
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4 justify-center">  
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="items-center">
        <Image
          source={require("../../assets/upl.png")} // Replace with actual image path
          className="w-64 h-64"
        />
      </View>

      <Text className="text-gray-600 text-2xl font-bold text-center mt-4">
        Please upload the required document for {type}.
      </Text>

      {/* Upload Button */}
      <TouchableOpacity
        onPress={handleSelectFile}
        disabled={isUploading}
        className="p-4 mt-8 rounded-lg items-center bg-[#4B5320]"
      >
        <Text className="text-white font-bold">
          {isUploading ? "Uploading..." : `Upload ${type}`}
        </Text>
      </TouchableOpacity>

      {/* Upload Button */}
      {/* <TouchableOpacity
        onPress={handleUpload}
        disabled={isUploading}
        className="p-4 mt-8 rounded-lg items-center bg-[#4B5320]"
      >
        <Text className="text-white font-bold">
          {isUploading ? "Uploading..." : `Upload ${type}`}
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => router.back()}
        className="p-4 bg-[#4B5320] ml-3 rounded-lg items-center absolute bottom-8 w-full"    
      >
        <Text className="text-white font-Montserrat-bold text-xl">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadScreen;
