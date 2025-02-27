import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Vehicle {
  id: number;
  country_id: number;
  driver_id: number;
  vehicle_type: number;
  brand: string;
  color: string;
  vehicle_name: string;
  vehicle_number: string;
  vehicle_image: string;
  vehicle_certificate: string;
  vehicle_insurance: string;
  status: number;
  created_at: string;
  updated_at: string;
}

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://billgold.ng/api/driver/driver_vehicle_all')
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);  // Set the data to state
        setLoading(false);   // Update loading state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  const myresult = vehicles.map((item)=>(
    <>
    <View >
    <Text>{console.log(item.vehicle_image)}</Text>
    </View>
    </>
  ))

  console.log(vehicles)

  // Handle loading state
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.loadingText}>Loading vehicles...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {vehicles.map((vehicle) => (
        <View key={vehicle.id} style={styles.card}>
          <Image
            source={{ uri: `https://billgold.ng/public/storage/${vehicle.vehicle_image}` }}
            style={styles.vehicleImage}
            resizeMode="cover"
          />
          <Text style={styles.vehicleName}>{vehicle.vehicle_name}</Text>
          <Text style={styles.vehicleInfo}>{vehicle.brand} - {vehicle.color}</Text>
          <Text style={styles.vehicleInfo}>Vehicle No: {vehicle.vehicle_number}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Certificate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Insurance</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.status}>
            {vehicle.status === 1 ? 'Active' : 'Inactive'}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  vehicleImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 16,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  vehicleInfo: {
    color: 'gray',
    marginBottom: 8,
  },
  buttonsContainer: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  status: {
    marginTop: 12,
    color: 'gray',
  },
});

export default VehicleList;
