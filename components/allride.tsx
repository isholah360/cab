
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AllRide = () => {
  const router = useRouter();
  const navigation = useNavigation();
  
  
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

  const rides = [
    {
      id: 1,
      date: "Mar 05, 2021",
      time: "10:50 AM",
      amount: "₹156",
      carType: "Hatchback",
      carNumber: "#000068",
      pickup:
        "15 Kudayar, Meyyappan 1st St, Ponmeni, Madurai, Tamil Nadu 625016, India",
      dropoff:
        "15 Kudayar, Meyyappan 1st St, Ponmeni, Madurai, Tamil Nadu 625016, India",
    },
    {
      id: 2,
      date: "Mar 04, 2021",
      time: "4:25 PM",
      amount: "₹29.2",
      carType: "Sedan",
      carNumber: "#000058",
      pickup:
        "3/248-A, Sourashtraapuram, Angel Nagar, Vandiyur, Madurai, Tamil Nadu 625020, India",
      dropoff:
        "4/226, Vandiyur Main Rd, Sourashtraapuram, Angel Nagar, Vandiyur, Madurai, Tamil Nadu 625020, India",
    },
    // Add more rides as needed...
  ];

  const handleRidePress = (id) => {
    // Navigate to rideDetail and pass the rideId as a query parameter
    router.push(`./rideDetail?rideId=${id}`);
    console.log(id);
  };

  return (
    <View className="flex-1 bg-white p-4">
     
      <ScrollView>
        {rides.map((ride, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRidePress(ride.id)}
          >
            <View className="bg-gray-100 p-4 rounded-lg mb-4 py-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600 font-bold">{`${ride.date} ${ride.time}`}</Text>
                <Text className="text-[#4B5320] font-bold">{ride.amount}</Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="font-bold">{ride.carType}</Text>
                <Text className="text-gray-600 font-bold">
                  {ride.carNumber}
                </Text>
              </View>
              <View className="flex-row gap-2 mx-2">
                <View className="mt-2 w-[82%]">
                  <View className="flex-row items-center gap-1">
                    <Text className="text-[green] font-[green] text-5xl pb-5">
                      .
                    </Text>
                    <Text className="text-gray-600">{ride.pickup}</Text>
                  </View>
                  <Text className="text-gray-600 mt-[-1rem] ml-[.2rem]">|</Text>
                  <View className="flex-row items-center gap-1 mt-[-.5rem]">
                    <Text className="text-[red] text-5xl pb-5">.</Text>
                    <Text className="text-gray-600">{ride.dropoff}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllRide;


