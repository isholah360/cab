import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MapScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { rideIds } = useLocalSearchParams();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { rideId } = useLocalSearchParams();
  const [license, setLicense] = useState("");
  const [mapTilesUrl, setMapTilesUrl] = useState("");
  const [error, setError] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const fetchMapTiles = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "google-api31.p.rapidapi.com",
          "x-rapidapi-key":
            "5478ccfec2mshe61920c976d02afp1ab0e0jsn3ab45c1645c2",
        },
        body: JSON.stringify({
          text: "white house",
          place: "washington DC",
          street: "",
          city: "",
          country: "",
          state: "",
          postalcode: "",
          latitude: "",
          longitude: "",
          radius: "",
        }),
      };
      try {
        const response = await fetch(
          "https://google-api31.p.rapidapi.com/map2",
          options
        );
        const data = await response.json();
        if (data && data.tilesUrl) {
          setMapTilesUrl(data.tilesUrl);
        } else {
          setError("No tiles URL returned");
        }
      } catch (error) {
        console.error("Error fetching map tiles:", error);
        setError("Failed to fetch map tiles");
      }
    };
    fetchMapTiles();
  }, []);

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
    if (iconName === "home") {
      router.push("#");
    } else if (iconName === "book") {
      router.push("/(tabs)/booking");
    } else if (iconName === "settings") {
      router.push("/more/profile"); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Offline/Online Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setIsOnline(!isOnline)}
          style={[
            styles.toggleButton,
            isOnline ? styles.online : styles.offline,
          ]}
        >
          <Ionicons
            name={isOnline ? "car-sport" : "car-off"}
            size={24}
            color="black"
          />
          <Text style={styles.toggleButtonText}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        {mapTilesUrl ? (
          <UrlTile urlTemplate={mapTilesUrl} maximumZ={19} />
        ) : (
          error && <Text>{error}</Text>
        )}
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
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Today Bookings</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="cash-outline" size={24} color="white" />
          <Text style={styles.statValue}>$0.00</Text>
          <Text style={styles.statLabel}>Today Earnings</Text>
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
                  <Text className="text-white ml-2 pb-1">Dashboard</Text>
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
                  <Text className="text-white ml-2">Booking</Text>
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
                  <Text className="text-white ml-2">More</Text>
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
  toggleContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  online: {
    backgroundColor: '#4B5320',
  },
  offline: {
    backgroundColor: '#FF0000',
  },
  toggleButtonText: {
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: '#4B5320',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '5%',
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
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '5%',
    borderRadius: 20,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#4B5320',
    marginTop: 5,
  },
});