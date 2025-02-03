import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DocumentUploadScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { rideIds } = useLocalSearchParams();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
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
        <TouchableOpacity className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center">
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              Waiting For Upload
            </Text>
            <Text className="text-gray-600">
              Upload your passport or driving licence or any one id proof
            </Text>
          </View>
          <Image
            source={require("../../assets/tra.png")}
            className="w-10 h-10"
          />{" "}
          {/* Replace with actual icon */}
        </TouchableOpacity>
      </View>

      {/* Certificate Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-2">Certificate</Text>
        <Text className="text-gray-600">
          Make sure that every detail of the document is clearly visible
        </Text>
        <TouchableOpacity className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center">
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              Waiting For Upload
            </Text>
            <Text className="text-gray-600">
              Upload your vehicle registration certificate
            </Text>
          </View>
          <Image
            source={require("../../assets/tra.png")}
            className="w-10 h-10"
          />{" "}
          {/* Replace with actual icon */}
        </TouchableOpacity>
      </View>

      {/* Vehicle Insurance Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-2">Vehicle Insurance</Text>
        <Text className="text-gray-600">
          Make sure that every detail of the document is clearly visible
        </Text>
        <TouchableOpacity className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center">
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              Waiting For Upload
            </Text>
            <Text className="text-gray-600">
              Upload your vehicle insurance document
            </Text>
          </View>
          <Image
            source={require("../../assets/tra.png")}
            className="w-10 h-10"
          />{" "}
          {/* Replace with actual icon */}
        </TouchableOpacity>
      </View>

      {/* Vehicle Image Section */}
      <View>
        <Text className="text-2xl font-bold mb-2">Vehicle Image</Text>
        <Text className="text-gray-600">Upload your vehicle image</Text>
        <TouchableOpacity className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center">
          <View>
            <Text className="text-yellow-500 text-xl font-bold">
              Waiting For Upload
            </Text>
            <Text className="text-gray-600">
              Upload your vehicle image with number board
            </Text>
          </View>
          <Image
            source={require("../../assets/tra.png")}
            className="w-10 h-10"
          />{" "}
          {/* Replace with actual icon */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentUploadScreen;


// import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

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

//   useEffect(() => {
//     navigation.setOptions({ headerShown: false });
//     loadFiles(); // Load saved files from AsyncStorage on component mount
//   }, [navigation]);

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
//     } catch (error) {
//       console.error("Error loading files from AsyncStorage:", error);
//     }
//   };

//   const handleUploadPress = (type) => {
//     router.push(`/upload/${type}`);
//   };

//   return (
//     <View className="flex-1 bg-white p-4 pt-[5.5rem]">
//       <TouchableOpacity onPress={() => router.back()} className="absolute top-6 left-4 mt-4">
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
//             <Text className="text-gray-600">Upload your passport or driving license or any one ID proof</Text>
//           </View>
//           <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
//         </TouchableOpacity>
//       </View>

//       {/* Certificate Section */}
//       <View className="mb-8">
//         <Text className="text-2xl font-bold mb-2">Certificate</Text>
//         <Text className="text-gray-600">Make sure that every detail of the document is clearly visible</Text>
//         <TouchableOpacity
//           onPress={() => handleUploadPress("certificate")}
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
//         >
//           <View>
//             <Text className="text-yellow-500 text-xl font-bold">
//               {files.certificate ? "Uploaded" : "Waiting For Upload"}
//             </Text>
//             <Text className="text-gray-600">Upload your vehicle registration certificate</Text>
//           </View>
//           <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
//         </TouchableOpacity>
//       </View>

//       {/* Vehicle Insurance Section */}
//       <View className="mb-8">
//         <Text className="text-2xl font-bold mb-2">Vehicle Insurance</Text>
//         <Text className="text-gray-600">Make sure that every detail of the document is clearly visible</Text>
//         <TouchableOpacity
//           onPress={() => handleUploadPress("insurance")}
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
//         >
//           <View>
//             <Text className="text-yellow-500 text-xl font-bold">
//               {files.insurance ? "Uploaded" : "Waiting For Upload"}
//             </Text>
//             <Text className="text-gray-600">Upload your vehicle insurance document</Text>
//           </View>
//           <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
//         </TouchableOpacity>
//       </View>

//       {/* Vehicle Image Section */}
//       <View>
//         <Text className="text-2xl font-bold mb-2">Vehicle Image</Text>
//         <Text className="text-gray-600">Upload your vehicle image</Text>
//         <TouchableOpacity
//           onPress={() => handleUploadPress("vehicleImage")}
//           className="border-dashed border-2 border-gray-300 rounded-lg p-4 mt-4 flex-row justify-between items-center"
//         >
//           <View>
//             <Text className="text-yellow-500 text-xl font-bold">
//               {files.vehicleImage ? "Uploaded" : "Waiting For Upload"}
//             </Text>
//             <Text className="text-gray-600">Upload your vehicle image with number board</Text>
//           </View>
//           <Image source={require("../../assets/tra.png")} className="w-10 h-10" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default DocumentUploadScreen;
