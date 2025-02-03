import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Get screen width for responsive design
const { width } = Dimensions.get("window");

// Define TypeScript types for navigation and data items
type TrainingItem = {
  id: string;
  title: string;
  path: "/FAQScreen" | "/DocumentUploadScreen" | "/TrainingScreen";
  description: string;
  image: any;
};

type TrainingScreenProps = {
  navigation: any;
};

// Training Data
const trainingData: TrainingItem[] = [
  {
    id: "1",
    title: "DriveWise: Elevate Your...",
    path: "/FAQScreen",
    description:
      "Welcome to DriveWise, the premier mobile app designed to revolutionize driver training. Whether you're a first-time driver or looking to enhance...",
    image: require("../../assets/wallet.png"), // Default Image
  },
  {
    id: "2",
    title: "DriveSmart Academy: Y...",
    path: "/FAQScreen",
    description:
      "Welcome to DriveSmart Academy, the revolutionary mobile app designed to equip drivers with essential skills and knowledge for safe and responsible driving...",
    image: require("../../assets/wallet.png"), // Default Image
  },
  {
    id: "3",
    title: "DriveSmart Academy: ...",
    path: "/FAQScreen",
    description:
      "Welcome to DriveSmart Academy, the all-in-one app designed to transform you into a confident and knowledgeable driver. Our innovative approach...",
    image: require("../../assets/wallet.png"), // Default Image
  },
  {
    id: "4",
    title: "Driver Training Pro: Master...",
    path: "/FAQScreen",
    description:
      "Welcome to Driver Training Pro, your ultimate companion for becoming a skilled and confident driver. Whether you’re a novice or looking to...",
    image: require("../../assets/wallet.png"), // Default Image
  },
];

// Main Component
const TrainingScreen: React.FC<TrainingScreenProps> = () => {
    const router = useRouter();
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
  return (
    <View className="flex-1 bg-gray-100 py-10">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className=" mr-3"
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        
      </View>
      <Text className="text-2xl font-bold text-black p-5 text-center font-Montserrat-bold">Training</Text>
      {/* Training List */}
      <FlatList
        data={trainingData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(item.path)}
            className="transform transition-transform duration-300 hover:scale-105"
            activeOpacity={0.8}
          >
            <View className="flex-row bg-white rounded-lg mb-4 px-2 overflow-hidden shadow-lg">
              <Image
                source={item.image}
                className="w-1/4 h-32 rounded-tl-lg rounded-bl-lg"
              />
              <View className="flex-1 p-3">
                <Text className="text-lg font-semibold text-gray">{item.title}</Text>
                <Text className="text-sm text-gray-400 mt-2">{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </View>
  );
};

export default TrainingScreen;
