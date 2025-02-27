import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function MapScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { rideIds } = useLocalSearchParams();
  const [isOnline, setIsOnline] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [requestBody, setRequestBody] = useState(null);
  const [activeIconz, setActiveIconz] = useState("home");
  const [userToken, setUserToken] = useState(null); // Initialize userToken state
  const [loading, setLoading] = useState(true); // Set loading state to true initially

  useEffect(() => {
    const getUserToken = async () => {
      const token = await AsyncStorage.getItem("user_token");
      setUserToken(token); // Set the token into the state
    };

    getUserToken(); // Call function to fetch user_token from AsyncStorage

    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Fetch user location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });

        const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geocode.length > 0) {
          const address = geocode[0];
          const addressData = {
            text: address.name || "Unknown",
            place: address.city || "Unknown",
            street: address.street || "",
            city: address.city || "Unknown",
            country: address.country || "Unknown",
            state: address.region || "Unknown",
            postalcode: address.postalCode || "",
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            radius: "1000",
          };

          setRequestBody(addressData);
        }
        setLoading(false); // Set loading to false after location is fetched
      } catch (error) {
        console.error("Error getting location or geocoding:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchLocation(); // Trigger fetching location

  }, []); 


  const toggleOnlineStatus = async () => {
    if (!userToken) {
      console.error("User token is not available");
      return;
    }

    const newOnlineStatus = !isOnline ? "online" : "offline"; // Toggle status
    setIsOnline(!isOnline); 

   
    const requestData = {
      online_status: newOnlineStatus, 
    };

    try {
     
      const response = await fetch(
        `https://casa-nbjx.onrender.com/api/drivers/profile/${userToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json(); 
      if (data) {  
        console.log("Online status updated successfully");
      } else {
        console.error("Failed to update online status");
      }
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  };

  const handleIconPress = (iconName) => {
    setActiveIconz(iconName);
    if (iconName === "home") {
      router.back();
      // router.push("./docUpload");
    } else if (iconName === "book") {
      router.push("./myRide");
    } else if (iconName === "settings") {
      router.push("/more/profile");
    }
  };

  return (
    <View style={styles.container}>
      {/* Online/Offline Toggle Bar */}
      <View className="absolute bg-white rounded-lg p-4 px-5 top-14 left-5 z-10 w-11/12 flex-row justify-between items-center">
        <Ionicons
          name="wifi"
          size={40}
          color={!isOnline ? "green" : "gray"}
        />
        <TouchableOpacity
          onPress={toggleOnlineStatus} 
          className="bg-gray-300 p-2 rounded-full"
        >
          <Ionicons
            name={isOnline ? "radio-button-on" : "radio-button-off"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <Ionicons
          name="car"
          size={40}
          color={isOnline ? "green" : "gray"}
        />
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        userLocation && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            mapType="standard"
            showsUserLocation={isOnline} // Only show user location when online
            showsMyLocationButton={isOnline}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
          >
            {/* Only show the marker when online */}
            {isOnline && (
              <Marker
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
                title="Your Location"
                description="This is your current location."
                pinColor="red"
              />
            )}

            {isOnline && requestBody && (
              <Marker
                coordinate={{
                  latitude: parseFloat(requestBody.latitude),
                  longitude: parseFloat(requestBody.longitude),
                }}
                title={requestBody.text}
                description={`${requestBody.city}, ${requestBody.country}`}
                pinColor="blue"
              />
            )}
          </MapView>
        )
      )}

      {/* Today's Bookings and Earnings */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="bookmark-outline" size={24} color="white" />
          <Text style={styles.statValue} className="font-Montserrat-bold text-2xl pt-2">0</Text>
          <Text style={styles.statLabel} className="font-Montserrat-bold text-xl">Today Bookings</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="cash-outline" size={24} color="white" />
          <Text style={styles.statValue} className="font-Montserrat-bold text-2xl pt-2">$0.00</Text>
          <Text style={styles.statLabel} className="font-Montserrat-bold text-xl">Today Earnings</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View className="flex flex-row justify-between w-full px-5 py-1">
          <TouchableOpacity
            onPress={() => handleIconPress("home")}
            className={`flex flex-row items-center gap-2 px-3 py-2 rounded-full ${
              activeIconz === "home" ? "bg-[#4B5320]" : ""
            }`}
          >
            <Ionicons
              name="home-outline"
              size={25}
              color={activeIconz === "home" ? "white" : "black"}
            />
            {activeIconz === "home" && (
              <Text className="text-white ml-1 pb-1 text-xl font-Montserrat-bold">
                Dashboard
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleIconPress("book")}
            className={`flex flex-row items-center gap-2 px-2 py-2 rounded-full ${
              activeIconz === "book" ? "bg-[#4B5320]" : ""
            }`}
          >
            <Ionicons
              name="book-outline"
              size={25}
              color={activeIconz === "book" ? "white" : "black"}
            />
            {activeIconz === "book" && (
              <Text className="text-white ml-1 text-xl font-Montserrat-bold">
                Booking
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleIconPress("settings")}
            className={`flex flex-row items-center gap-2 px-2 py-2 rounded-full ${
              activeIconz === "settings" ? "bg-[#4B5320]" : ""
            }`}
          >
            <Ionicons
              name="settings-outline"
              size={25}
              color={activeIconz === "settings" ? "white" : "black"}
            />
            {activeIconz === "settings" && (
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    position: 'absolute',
    bottom: 85,
    left: '5%',
    right: 0,
    backgroundColor: '#4B5320',
    padding: 25,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:"90%"
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'white',
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
