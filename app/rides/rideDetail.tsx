import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

const TripDetailsScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const rideId = params.rideId;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  console.log("rideId", rideId);

  if (!rideId) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl">Ride ID not found</Text>
      </View>
    );
  }

  // Example data for the ride (in a real app, you would fetch this data based on rideId)
  const rideDetails = {
    1: {
      carType: "Hatchback",
      carNumber: "#000068",
      amount: "$156",
      pickup:
        "15 Kudayar, Meyyappan 1st St, Ponmeni, Madurai, Tamil Nadu 625016, India",
      dropoff:
        "15 Kudayar, Meyyappan 1st St, Ponmeni, Madurai, Tamil Nadu 625016, India",
    },
    2: {
      carType: "Sedan",
      carNumber: "#000058",
      amount: "$29.2",
      pickup:
        "3/248-A, Sourashtraapuram, Angel Nagar, Vandiyur, Madurai, Tamil Nadu 625020, India",
      dropoff:
        "4/226, Vandiyur Main Rd, Sourashtraapuram, Angel Nagar, Vandiyur, Madurai, Tamil Nadu 625020, India",
    },
    // Add more ride data as necessary
  };

  const ride = rideDetails[rideId];

  if (!ride) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl">Ride details not found</Text>
      </View>
    );
  }

  const handleLiveChatPress = () => {
    router.push("./chats"); // Navigate to the 'myChat' page
  };

  return (
    <View className="flex-1 bg-white p-4 py-6 pt-10">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4 flex-row gap-2"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text className="font-bold text-xl font-Montserrat-bold">rideDetails</Text>
      </TouchableOpacity>

      <View className="flex-row items-center mb-4 mt-[4.5rem]">
        <Ionicons
          name="person-circle"
          size={50}
          color="black"
          className="mr-2"
        />
        <View>
          <Text className="font-bold text-xl">Kannan</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={18} color="yellow" className="mr-1" />
            <Ionicons name="star" size={18} color="yellow" className="mr-1" />
            <Ionicons name="star" size={18} color="yellow" className="mr-1" />
            <Ionicons
              name="star-half"
              size={18}
              color="yellow"
              className="mr-1"
            />
            <Ionicons
              name="star-outline"
              size={18}
              color="yellow"
              className="mr-1"
            />
            <Text className="text-gray-600 ml-2">(You Rated)</Text>
          </View>
        </View>
      </View>

      {/* Car Information */}
      <View className="flex-row items-center mb-4 mt-2">
        <Ionicons name="car-sport" size={40} color="#4B5320" className="mr-2" />
        <Text className="font-bold">
          {ride.carType} - {ride.carNumber}
        </Text>
      </View>

      {/* Trip Type */}
      <View className="flex-row items-center mb-4 mt-2">
        <Ionicons name="cash" size={40} color="#4B5320" className="mr-2" />
        <Text className="font-bold">Trip Type - Daily</Text>
      </View>

      {/* Fare and Distance */}
      <View className="flex-row justify-between mb-4 mt-2">
        <View>
          <Ionicons
            name="speedometer"
            size={40}
            color="#4B5320"
            className="mr-2"
          />
          <Text className="font-bold text-xl mt-5">{ride.amount}</Text>
        </View>
        <View>
          <Ionicons
            name="trail-sign"
            size={40}
            color="#4B5320"
            className="mr-2"
          />
          <Text className="font-bold text-xl mt-5">9.6 km</Text>
        </View>
      </View>

      {/* Pickup and Drop-off Locations */}
      <View className="mb-4 px-2 mt-8">
        <View className="flex-row items-center gap-3">
          <Ionicons
            name="location-sharp"
            size={24}
            color="green"
            className="mr-2"
          />
          <Text className="text-gray-600 w-[80%]">{ride.pickup}</Text>
        </View>
        <View className="flex-row items-center gap-3 mt-3">
          <Ionicons
            name="location-sharp"
            size={24}
            color="red"
            className="mr-2"
          />
          <Text className="text-gray-600 w-[80%]">{ride.dropoff}</Text>
        </View>
      </View>

      {/* Bill Details */}
      <View className="mt-8">
        <Text className="font-bold mb-2 text-2xl mt-2">Bill details</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-xl mt-2">Fare</Text>
          <Text className="text-xl mt-2">{ride.amount}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-xl mt-2">Taxes</Text>
          <Text className="text-xl mt-2">₹26</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-xl mt-2">Total</Text>
          <Text className="font-bold text-xl mt-2">{ride.amount}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mt-8">
        <TouchableOpacity className="px-4 py-2 rounded-lg items-center">
          <Ionicons
            name="document-text"
            size={24}
            color="#4B5320"
            className="mb-2"
          />

          <Text className="text-#000 font-bold [.85rem]">Invoice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-4 py-2 rounded-lg items-center"
          onPress={handleLiveChatPress}
        >
          <Ionicons
            name="chatbubbles"
            size={40}
            color="#4B5320"
            className="mb-2"
          />

          <Text className="text-#000 font-bold text-[.85rem]">liveChat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripDetailsScreen;

// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";  // Import useRouter from expo-router

// const TripDetailsScreen = () => {
//   const router = useRouter();
//   const rideId  = router.query;
//   console.log(rideId)

//   // Access rideId from query parameters

//   // Check if rideId exists and is valid
//   if (!rideId) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <Text className="text-xl">Ride ID not found</Text>
//       </View>
//     );
//   }

//   // Example data for the ride (in a real app, you would fetch this data based on rideId)
//   const rideDetails = {
//     1: {
//       carType: "Hatchback",
//       carNumber: "#000068",
//       amount: "₹156",
//       pickup: "15 Kudayar, Meyyappan 1st St, Ponmeni, Madurai, Tamil Nadu 625016, India",
//       dropoff: "15 Kudayar, Meyyappan 1st St, Ponmeni, Madurai, Tamil Nadu 625016, India"
//     },
//     2: {
//       carType: "Sedan",
//       carNumber: "#000058",
//       amount: "₹29.2",
//       pickup: "3/248-A, Sourashtraapuram, Angel Nagar, Vandiyur, Madurai, Tamil Nadu 625020, India",
//       dropoff: "4/226, Vandiyur Main Rd, Sourashtraapuram, Angel Nagar, Vandiyur, Madurai, Tamil Nadu 625020, India"
//     },
//     // Add more ride data as necessary
//   };

//   const ride = rideDetails[rideId];

//   if (!ride) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <Text className="text-xl">Ride details not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-white p-4">
//       {/* UI code for ride details... */}
//       {/* Ensure UI remains the same */}
//     </View>
//   );
// };

// export default TripDetailsScreen;
