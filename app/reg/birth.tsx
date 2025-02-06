import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter, useNavigation } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DateOfBirthScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  
  // Hide header using useEffect
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Close the date picker after selecting the date
    setDate(currentDate);
  };

  const handleNextPress = async () => {
    // Date validation (ensure date is not in the future)
    const today = new Date();
    if (date > today) {
      Alert.alert("Invalid Date", "Please select a valid date of birth.");
      return;
    }

    if (!date) {
      Alert.alert("Date", "Please select your Date of Birth.");
      return;
    }

    try {
      await AsyncStorage.setItem("selectDOB", date.toDateString());
      router.push("./password"); // Navigate to password screen
    } catch (error) {
      console.log("Error saving date:", error); // Updated error message
    }
  };

  return (
    <View className="flex-1 bg-white p-4 px-6">
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} className="mb-8 mt-10">
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title and Subtitle */}
      <Text className="text-black text-2xl font-bold text-center mb-2 font-Montserrat">
        Enter your date of birth
      </Text>
      <Text className="text-gray-500 text-center mb-8 font-Montserrat">
        You need to enter your date of birth
      </Text>

      {/* Date Input */}
      <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mb-8">
        <Ionicons name="calendar" size={24} color="black" className="mr-2" />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-1">
          <TextInput 
            value={date.toDateString()} 
            editable={false} 
            className="font-Montserrat text-xl" 
            accessibilityLabel="Date of birth input field"
          />
        </TouchableOpacity>
      </View>

      {/* Inline Date Picker */}
      {showDatePicker && (
        <View className="mt-4">
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
            themeVariant="light"
          />
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity 
        onPress={handleNextPress} 
        className="bg-[#4B5320] px-4 py-4 rounded-lg mt-8"
        accessibilityLabel="Proceed to the next screen"
      >
        <Text className="text-white text-center font-Montserrat">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateOfBirthScreen;
