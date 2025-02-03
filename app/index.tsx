import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import SplashScreen from "./splash";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">  
      <View className="flex-1 bg-white">
        <SplashScreen/>
      </View>
    </SafeAreaView>
  );
}
