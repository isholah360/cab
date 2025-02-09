// app/screens/MapScreen.tsx
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import CONSTANTS from "../constants";  // Import the constants file

export default function MapScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { rideIds } = useLocalSearchParams();

  useEffect(() => {
    // Hide the header
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [isToggled, setIsToggled] = useState(false); // State to track button position and car color

  const toggleHandler = () => {
    setIsToggled(!isToggled); // Toggle the state
  };

  const { rideId } = useLocalSearchParams();
  const [license, setLicense] = useState("");
  const [error, setError] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
    if (iconName === "home") {
      router.push("./dashboard");
    } else if (iconName === "book") {
      router.push("./myRide");
    } else if (iconName === "settings") {
      router.push("/more/profile");
    }
  };

  // Access the Google Maps API Key from constants.ts
  const googleMapsApiKey = CONSTANTS.GOOGLE_MAPS_API_KEY;

  // Optionally, log it for testing
  useEffect(() => {
    console.log("Google Maps API Key: ", googleMapsApiKey);
  }, [googleMapsApiKey]);

  return (
    <View style={styles.container}>
      <View className="absolute bg-white rounded-lg p-4 px-5 top-14 left-5 z-10 w-11/12 flex-row justify-between items-center">
        <Ionicons
          name="wifi"
          size={40}
          color={isToggled ? "gray" : "green"} // Change color based on toggle state
        />
        <TouchableOpacity
          onPress={toggleHandler}
          className="bg-gray-300 p-2 rounded-full"
        >
          <Ionicons
            name={isToggled ? "radio-button-on" : "radio-button-off"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <Ionicons
          name="car"
          size={40}
          color={isToggled ? "green" : "gray"} // Change color based on toggle state
        />
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Use Google Maps as the provider
        initialRegion={initialRegion}
        mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Sample Marker"
          description="This is a sample marker on the map."
        />
      </MapView>

      {/* Today's Bookings and Earnings */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="bookmark-outline" size={24} color="white" />
          <Text style={styles.statValue} className="text-2xl font-Montserrat-bold pt-1">0</Text>
          <Text style={styles.statLabel} className="text-xl font-Montserrat">Today Bookings</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="cash-outline" size={24} color="white" />
          <Text style={styles.statValue} className="text-2xl font-Montserrat-bold pt-1">$0.00</Text>
          <Text style={styles.statLabel} className="text-xl font-Montserrat">Today Earnings</Text>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer} className="rounded-lg">
        <View className="flex flex-row justify-between w-full px-5 py-1 ">
          <TouchableOpacity
            onPress={() => handleIconPress("home")}
            className={`flex flex-row items-center gap-2 px-3 py-2 rounded-full ${
              activeIcon === "home" ? "bg-[#4B5320]" : ""
            }`}
          >
            <Ionicons
              name="home-outline"
              size={25}
              color={activeIcon === "home" ? "white" : "black"}
            />
            {activeIcon === "home" && (
              <Text className="text-white ml-1 pb-1 text-xl font-Montserrat-bold">
                Dashboard
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleIconPress("book")}
            className={`flex flex-row items-center gap-2 px-2 py-2 rounded-full ${
              activeIcon === "book" ? "bg-[#4B5320]" : ""
            }`}
          >
            <Ionicons
              name="book-outline"
              size={25}
              color={activeIcon === "book" ? "white" : "black"}
            />
            {activeIcon === "book" && (
              <Text className="text-white ml-1 text-xl font-Montserrat-bold">
                Booking
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleIconPress("settings")}
            className={`flex flex-row items-center gap-2 px-2 py-2 rounded-full ${
              activeIcon === "settings" ? "bg-[#4B5320]" : ""
            }`}
          >
            <Ionicons
              name="settings-outline"
              size={25}
              color={activeIcon === "settings" ? "white" : "black"}
            />
            {activeIcon === "settings" && (
              <Text className="text-white ml-1 text-xl font-Montserrat-bold">
                More
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  statsContainer: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: "#4B5320",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: "5%",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: "white",
    marginTop: 5,
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: "5%",
    borderRadius: 20,
  },
});
