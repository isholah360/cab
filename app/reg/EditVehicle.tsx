import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const EditVehicleDetailScreen = ({ params }) => {
  const router = useRouter();
  const { field } = params; // Get the field from URL params
  
  // Initialize state with current value based on field
  const [value, setValue] = useState('');
  
  const handleDone = () => {
    router.back(); // Go back to the previous screen
    // Update the state of the field in the parent component
    router.push({
      pathname: '/',
      query: {
        [field]: value, // Pass the updated value back as a query
      },
    });
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mb-8">{`Edit ${field}`}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={`Enter ${field}`}
        className="border border-gray-300 rounded-lg p-2"
      />
      <TouchableOpacity onPress={handleDone} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
        <Text className="font-bold text-center">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditVehicleDetailScreen;
