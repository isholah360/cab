import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AllRide from "@/components/allride";

const MyRidesScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [selectedTab, setSelectedTab] = useState("All");

  const rides = [
    {
      id: 1,
      date: "Mar 05, 2021",
      time: "10:50 AM",
      amount: "$156",
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
      amount: "$29.2",
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

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View className="flex-1 bg-white p-4 py-10">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-6 left-4 mt-4"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* Title */}
      <Text className="text-2xl font-bold text-center mb-8 font-Montserrat-bold mt-9">
        My Rides
      </Text>

      {/* Tab Navigation */}
      <View className="bg-gray-100 rounded-lg p-2 py-4 flex-row justify-around mb-8">
        <TouchableOpacity
          onPress={() => handleTabPress("All")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "All" ? "bg-[#4B5320]" : ""
          }`}
        >
          <Text
            className={`text-xl font-Montserrat-bold ${
              selectedTab === "All" ? "text-white" : "text-black"
            }`}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Upcoming")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "Upcoming" ? "bg-[#4B5320]" : ""
          }`}
        >
          <Text
            className={`text-xl font-Montserrat-bold ${
              selectedTab === "Upcoming" ? "text-white" : "text-black"
            }`}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Completed")}
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "Completed" ? "bg-[#4B5320]" : ""
          }`}
        >
          <Text
            className={`text-xl font-Montserrat-bold ${
              selectedTab === "Completed" ? "text-white" : "text-black"
            }`}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content for the selected tab */}
      <View className="flex-1">
        {selectedTab === "All" && (
          <View>
            <ScrollView>
              {rides.map((ride, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRidePress(ride.id)}
                >
                  <View className="bg-gray-100 p-4 rounded-lg mb-4 py-3">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-600 font-bold">{`${ride.date} ${ride.time}`}</Text>
                      <Text className="text-[#4B5320] font-bold">
                        {ride.amount}
                      </Text>
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
                        <Text className="text-gray-600 mt-[-1rem] ml-[.2rem]">
                          |
                        </Text>
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
        )}
        {selectedTab === "Upcoming" && (
          <Text className="text-center text-lg">Showing upcoming rides</Text>
        )}
        {selectedTab === "Completed" && (
          <Text className="text-center text-lg">Showing completed rides</Text>
        )}
      </View>
    </View>
  );
};

export default MyRidesScreen;
