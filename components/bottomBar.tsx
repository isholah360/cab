// BottomNavBar.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const BottomNavBar = ({ handleIconPress }) => {
  const [activeIconz, setActiveIconz] = useState('home'); // Manage state locally here

  const onPressHandler = (iconName) => {
    setActiveIconz(iconName); // Update the active icon when an item is pressed
    handleIconPress(iconName); // Call the parent function to perform navigation
  };

  return (
    <View style={styles.bottomNavContainer}>
      <View className="flex flex-row justify-between w-full px-5 py-1">
        <TouchableOpacity
          onPress={() => onPressHandler('home')}
          className={`flex flex-row items-center gap-2 px-3 py-2 rounded-full ${
            activeIconz === 'home' ? 'bg-[#4B5320]' : ''
          }`}
        >
          <Ionicons
            name="home-outline"
            size={25}
            color={activeIconz === 'home' ? 'white' : 'black'}
          />
          {activeIconz === 'home' && (
            <Text className="text-white ml-1 pb-1 text-xl font-Montserrat-bold">
              Dashboard
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressHandler('book')}
          className={`flex flex-row items-center gap-2 px-2 py-2 rounded-full ${
            activeIconz === 'book' ? 'bg-[#4B5320]' : ''
          }`}
        >
          <Ionicons
            name="book-outline"
            size={25}
            color={activeIconz === 'book' ? 'white' : 'black'}
          />
          {activeIconz === 'book' && (
            <Text className="text-white ml-1 text-xl font-Montserrat-bold">
              Booking
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressHandler('settings')}
          className={`flex flex-row items-center gap-2 px-2 py-2 rounded-full ${
            activeIconz === 'settings' ? 'bg-[#4B5320]' : ''
          }`}
        >
          <Ionicons
            name="settings-outline"
            size={25}
            color={activeIconz === 'settings' ? 'white' : 'black'}
          />
          {activeIconz === 'settings' && (
            <Text className="text-white ml-1 text-xl font-Montserrat-bold">
              More
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
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
};

export default BottomNavBar;
