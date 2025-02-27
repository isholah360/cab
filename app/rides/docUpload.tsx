import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';

const DocumentUploadScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { rideIds } = useLocalSearchParams();

  const [files, setFiles] = useState({
    idProof: null,
    certificate: null,
    insurance: null,
    vehicleImage: null,
  });

  


  const loadFiles = async () => {
    try {
      const idProof = await AsyncStorage.getItem("idProof");
      const certificate = await AsyncStorage.getItem("certificate");
      const insurance = await AsyncStorage.getItem("insurance");
      const vehicleImage = await AsyncStorage.getItem("vehicleImage");

      setFiles({
        idProof,
        certificate,
        insurance,
        vehicleImage,
      });
      console.log(certificate)
      console.log(idProof)
      console.log(insurance)
      console.log(vehicleImage)
    } catch (error) {
      console.error("Error loading files from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    loadFiles(); 
  }, [navigation]);
 
  const handleDonePress = async () => {
    const savedName = await AsyncStorage.getItem("vehicleName");
    const savedBrand = await AsyncStorage.getItem("vehicleBrand");
    const savedNumber = await AsyncStorage.getItem("vehicleNumber");
    const userToken = await AsyncStorage.getItem("user_token");
  
    try {
      // Create a new FormData instance
      const formData = new FormData();
      
      // Add vehicle data
      formData.append("vehicle_make", savedBrand || "Toyota");
      formData.append("vehicle_model", savedName || "Corolla");
      formData.append("vehicle_plate_number", savedNumber || "ABC-123");
      formData.append("status", "active");
      
      // Helper function for file handling - simplified version
      const appendFileToFormData = (uri, fieldName) => {
        if (!uri) {
          console.log(`No file for ${fieldName}`);
          return;
        }
        
        // Get file name from URI or use a default
        const fileName = uri.split('/').pop() || `${fieldName}.jpg`;
        
        // Simple type determination
        let fileType = 'image/jpeg';
        if (fileName.toLowerCase().endsWith('.png')) fileType = 'image/png';
        if (fileName.toLowerCase().endsWith('.pdf')) fileType = 'application/pdf';
        
        // Create file object - keeping the original URI
        const fileObj = {
          uri: uri,
          type: fileType,
          name: fileName
        };
        
        formData.append(fieldName, fileObj);
        console.log(`Added ${fieldName} file:`, fileName);
      };
      
      // Append each file to FormData
      if (files.vehicleImage) appendFileToFormData(files.vehicleImage, "vehicle_image");
      if (files.idProof) appendFileToFormData(files.idProof, "idProof");
      // if (files.certificate) appendFileToFormData(files.certificate, "certificate");
      if (files.insurance) appendFileToFormData(files.insurance, "insurance");
      
      // Log formData contents for debugging
      console.log("FormData created with fields:");
      for (let pair of [...formData.entries()]) {
        if (typeof pair[1] === 'object') {
          console.log(pair[0], "file object");
        } else {
          console.log(pair[0], pair[1]);
        }
      }
      
      // Make the request
      const apiUrl = `https://casa-nbjx.onrender.com/api/drivers/profile/${userToken}`;
      console.log("Sending request to:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });
      
      console.log("Response status:", response.status);
      
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      if (response.ok) {
        alert("Vehicle updated successfully!");
        router.push("./map");
      } else {
        if (responseText.includes("<!DOCTYPE html>")) {
          alert(`Server error (${response.status}). Please check server logs.`);
        } else {
          try {
            const errorData = JSON.parse(responseText);
            alert("Error: " + (errorData.message || JSON.stringify(errorData)));
          } catch (e) {
            alert(`Server error: ${response.status}. Response: ${responseText.substring(0, 100)}...`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error: " + error.message);
    }
  };
  
  
  
  const handleUploadPress = (type: string) => {
    router.push(`./uploadScreen?type=${type}`); // Pass type to the UploadScreen
  };

  return (
    <View className="flex-1 bg-white p-4 pt-[5.5rem]">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* ID Proof Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-2">ID Proof</Text>
        <Text className="text-gray-600">
          Make sure that every detail of the document is clearly visible
        </Text>
        <TouchableOpacity
          onPress={() => handleUploadPress("idProof")}
          className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
        >
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              {files.idProof ? "Uploaded" : "Waiting For Upload"}
            </Text>
            <Text className="text-gray-600">
              Upload your passport or driving license or any one ID proof
            </Text>
          </View>
          <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
        </TouchableOpacity>
      </View>

      {/* Certificate Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-2">Certificate</Text>
        <Text className="text-gray-600">
          Make sure that every detail of the document is clearly visible
        </Text>
        <TouchableOpacity
          onPress={() => handleUploadPress("certificate")}
          className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
        >
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              {files.certificate ? "Uploaded" : "Waiting For Upload"}
            </Text>
            <Text className="text-gray-600">
              Upload your vehicle registration certificate
            </Text>
          </View>
          <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
        </TouchableOpacity>
      </View>

      {/* Vehicle Insurance Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-2">Vehicle Insurance</Text>
        <Text className="text-gray-600">
          Make sure that every detail of the document is clearly visible
        </Text>
        <TouchableOpacity
          onPress={() => handleUploadPress("insurance")}
          className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
        >
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              {files.insurance ? "Uploaded" : "Waiting For Upload"}
            </Text>
            <Text className="text-gray-600">
              Upload your vehicle insurance document
            </Text>
          </View>
          <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
        </TouchableOpacity>
      </View>

      {/* Vehicle Image Section */}
      <View>
        <Text className="text-2xl font-bold mb-2">Vehicle Image</Text>
        <Text className="text-gray-600">Upload your vehicle image</Text>
        <TouchableOpacity
          onPress={() => handleUploadPress("vehicleImage")}
          className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
        >
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              {files.vehicleImage ? "Uploaded" : "Waiting For Upload"}
            </Text>
            <Text className="text-gray-600">
              Upload your vehicle image with number board
            </Text>
          </View>
          <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
        </TouchableOpacity>
      </View>

      {/* Done Button */}
      <TouchableOpacity
        onPress={handleDonePress} // Navigate to map screen when done
        className="p-4 mt-4 bg-[#4B5320] rounded-lg items-center mt-8"
      >
        <Text className="text-white font-bold">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentUploadScreen;


// import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Platform } from 'react-native';

// const DocumentUploadScreen = () => {
//   const router = useRouter();
//   const navigation = useNavigation();
//   const { rideIds } = useLocalSearchParams();

//   const [files, setFiles] = useState({
//     idProof: null,
//     certificate: null,
//     insurance: null,
//     vehicleImage: null,
//   });

//   const loadFiles = async () => {
//     try {
//       const idProof = await AsyncStorage.getItem("idProof");
//       const certificate = await AsyncStorage.getItem("certificate");
//       const insurance = await AsyncStorage.getItem("insurance");
//       const vehicleImage = await AsyncStorage.getItem("vehicleImage");
  

//       setFiles({
//         idProof,
//         certificate,
//         insurance,
//         vehicleImage,
//       });
//       console.log(certificate);
//       console.log(idProof);
//       console.log(insurance);
//       console.log(vehicleImage);
//     } catch (error) {
//       console.error("Error loading files from AsyncStorage:", error);
//     }
//   };

//   useEffect(() => {
//     navigation.setOptions({ headerShown: false });
//     loadFiles();
//   }, [navigation]);

//   const handleDonePress = async () => {
//     const savedName = await AsyncStorage.getItem("vehicleName");
//     const savedBrand = await AsyncStorage.getItem("vehicleBrand");
//     const savedColor = await AsyncStorage.getItem("vehicleColor");
//     const savedType = await AsyncStorage.getItem("vehicleType");
//     const savedNumber = await AsyncStorage.getItem("vehicleNumber");
//     const savedDriver = await AsyncStorage.getItem("driver_Id");
//     const userToken = await AsyncStorage.getItem("user_token");
//     console.log(userToken)
  
//     const driverId = savedDriver ? parseInt(savedDriver, 10) : 0;
  
//     const formData = new FormData();
  
//     formData.append("vehicle_make", savedBrand || "Toyota");
//     formData.append("color", savedColor || "Red");
//     formData.append("vehicle_model", savedName || "Corolla");
//     formData.append("vehicle_plate_number", savedNumber || "ABC-123");
//     formData.append("status", "active");
  
//     // Append files correctly as FormData
//     const appendFileToFormData = (uri, fieldName) => {
//       if (!uri) return;
  
//       const fileNameMatch = uri.match(/([^\/]+)$/);
//       const fileName = fileNameMatch ? fileNameMatch[0] : `${fieldName}.jpg`;
  
//       let fileType = 'image/jpeg';
//       if (fileName.endsWith('.png')) {
//         fileType = 'image/png';
//       } else if (fileName.endsWith('.pdf')) {
//         fileType = 'application/pdf';
//       }
  
//       const fileObj = {
//         uri: uri,
//         name: fileName,
//         type: fileType,
//       };
  
//       formData.append(fieldName, fileObj);
//     };
  
//     appendFileToFormData(files.vehicleImage, "vehicle_image");
//     appendFileToFormData(files.idProof, "idProof");
//     appendFileToFormData(files.certificate, "certificate");
//     appendFileToFormData(files.insurance, "insurance");
  
//     try {
//       console.log("Sending request to:", `https://casa-nbjx.onrender.com/api/drivers/profile/${userToken}`);
  
//       const response = await fetch(
//         `https://casa-nbjx.onrender.com/api/drivers/profile/${userToken}`,
//         {
//           method: "PUT",
//           headers: {
//             Accept: "application/json",
//           },
//           body: formData,
//         }
//       );
  
//       const responseText = await response.text();
//       console.log("Raw response:", responseText);
  
//       try {
//         const data = JSON.parse(responseText);
//         console.log("Parsed response:", data);
  
//         if (response.ok) {
//           alert("Vehicle updated successfully!");
//           router.push("./map");
//         } else {
//           if (data.errors) {
//             const errorMessages = Object.entries(data.errors)
//               .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
//               .join("\n");
//             alert(`Validation errors:\n${errorMessages}`);
//           } else {
//             alert("Upload failed: " + (data.message || "Unknown error"));
//           }
//         }
//       } catch (parseError) {
//         console.error("Error parsing JSON:", parseError);
//         alert("Error: Invalid response from server");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("Network error occurred. Please try again.");
//     }
//   };
  
  
//   const handleUploadPress = (type: string) => {
//     router.push(`./uploadScreen?type=${type}`); // Pass type to the UploadScreen
//   };

//   return (
//     <View className="flex-1 bg-white p-4 pt-[5.5rem]">
//       <TouchableOpacity
//         onPress={() => router.back()}
//         className="absolute top-6 left-4 mt-4"
//       >
//         <Ionicons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       {/* ID Proof Section */}
//       <View className="mb-8">
//         <Text className="text-2xl font-bold mb-2">ID Proof</Text>
//         <Text className="text-gray-600">
//           Make sure that every detail of the document is clearly visible
//         </Text>
//         <TouchableOpacity
//           onPress={() => handleUploadPress("idProof")}
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
//         >
//           <View>
//             <Text className="text-yellow-500 text-xl font-bold">
//               {files.idProof ? "Uploaded" : "Waiting For Upload"}
//             </Text>
//             <Text className="text-gray-600">
//               Upload your passport or driving license or any one ID proof
//             </Text>
//           </View>
//           <Image
//             source={require("../../assets/tra.png")}
//             className="w-10 h-10"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Certificate Section */}
//       <View className="mb-8">
//         <Text className="text-2xl font-bold mb-2">Certificate</Text>
//         <Text className="text-gray-600">
//           Make sure that every detail of the document is clearly visible
//         </Text>
//         <TouchableOpacity
//           onPress={() => handleUploadPress("certificate")}
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
//         >
//           <View>
//             <Text className="text-yellow-500 text-xl font-bold">
//               {files.certificate ? "Uploaded" : "Waiting For Upload"}
//             </Text>
//             <Text className="text-gray-600">
//               Upload your vehicle registration certificate
//             </Text>
//           </View>
//           <Image
//             source={require("../../assets/tra.png")}
//             className="w-10 h-10"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Vehicle Insurance Section */}
//       <View className="mb-8">
//         <Text className="text-2xl font-bold mb-2">Vehicle Insurance</Text>
//         <Text className="text-gray-600">
//           Make sure that every detail of the document is clearly visible
//         </Text>
//         <TouchableOpacity
//           onPress={() => handleUploadPress("insurance")}
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
//         >
//           <View>
//             <Text className="text-yellow-500 text-xl font-bold">
//               {files.insurance ? "Uploaded" : "Waiting For Upload"}
//             </Text>
//             <Text className="text-gray-600">
//               Upload your vehicle insurance document
//             </Text>
//           </View>
//           <Image
//             source={require("../../assets/tra.png")}
//             className="w-10 h-10"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Vehicle Image Section */}
//       <View>
//         <Text className="text-2xl font-bold mb-2">Vehicle Image</Text>
//         <Text className="text-gray-600">
//           Upload a clear image of your vehicle
//         </Text>
//         <TouchableOpacity
//           onPress={() => handleUploadPress("vehicleImage")}
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
//         >
//           <View>
//             <Text className="text-yellow-500 text-xl font-bold">
//               {files.vehicleImage ? "Uploaded" : "Waiting For Upload"}
//             </Text>
//             <Text className="text-gray-600">
//               Upload a clear image of your vehicle
//             </Text>
//           </View>
//           <Image
//             source={require("../../assets/tra.png")}
//             className="w-10 h-10"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Done Button */}
//       <TouchableOpacity
//         onPress={handleDonePress}
//         className="bg-blue-600 text-white p-4 rounded-lg mt-10"
//       >
//         <Text className="text-white text-xl text-center">Done</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DocumentUploadScreen;


