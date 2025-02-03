import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function CalendarComponent() {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [headerText, setHeaderText] = useState("");

  // Get current week dates
  useEffect(() => {
    const getCurrentWeek = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - dayOfWeek + 1); // Start from Monday

      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        weekDates.push(date);
      }

      // Format header text
      const startMonth = weekDates[0].toLocaleString('default', { month: 'long' });
      const endMonth = weekDates[6].toLocaleString('default', { month: 'long' });
      const year = weekDates[0].getFullYear();
      setHeaderText(startMonth !== endMonth 
        ? `${startMonth} / ${endMonth} ${year}` 
        : `${startMonth} ${year}`);

      setCurrentWeek(weekDates);
    };

    getCurrentWeek();
  }, []);

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <View className="bg-red-600">
      {/* Month Header */}
      <View className="py-2 items-center">
        <Text className="text-base text-white">{headerText}</Text>
      </View>

      {/* Scrollable Dates */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {currentWeek.map((date, index) => {
          const dayName = date.toLocaleString('default', { weekday: 'short' });
          const dayNumber = date.getDate();
          const active = isToday(date);

          return (
            <TouchableOpacity 
              key={index}
              className={`items-center mx-2 ${active ? "bg-white rounded-full p-1" : ""}`}
            >
              <Text className={`text-sm ${active ? "text-red-600" : "text-white"}`}>
                {dayName}
              </Text>
              <Text className={`text-base mt-1 ${active ? "text-red-600" : "text-white"}`}>
                {dayNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}