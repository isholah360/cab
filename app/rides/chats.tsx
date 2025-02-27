
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { GiftedChat, Send, InputToolbar, Composer} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [messages, setMessages] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  // Custom render function for input toolbar
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
      />
    );
  };

  // Custom render function for composer (text input)
  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={styles.textInput}
      />
    );
  };

  // Fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem("user_token");
        if (userToken) {
          const response = await fetch(
            `https://casa-nbjx.onrender.com/api/drivers/profile/${userToken}`
          );
          const data = await response.json();
          if (data) {
            const { first_name, last_name } = data;
            setFirstName(first_name);
            setLastName(last_name);
          } else {
            console.error("Failed to fetch driver details");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle sending messages
  // const onSend = useCallback((newMessages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, newMessages)
  //   );
  // }, []);

  return (
    <SafeAreaView style={styles.container} className="bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      >
        <View style={{ flex: 1 }}>
          {/* Chat Header */}
          <View style={styles.header} className="mt-6">
            <Text style={styles.headerText}>
              Driver Chat - {firstName} {lastName}
            </Text>
          </View>

          {/* Gifted Chat UI */}
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1, // Replace with actual user ID if needed
            }}
            renderAvatar={null}
            isKeyboardInternallyHandled={false}
            renderSend={(props) => (
              <Send {...props}>
                <View style={styles.sendButton}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </View>
              </Send>
            )}
           
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#4B5320", 
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: 'white',
    paddingVertical: 0,
    marginBottom: -100, 
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 6,
    maxHeight: 100, 
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  sendButton: {
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: "#4B5320", 
    fontSize: 16,
  },
});

export default ChatScreen;


