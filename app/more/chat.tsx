// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const unsubscribe = firebase.firestore()
//       .collection('chats')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot(snapshot => {
//         const loadedMessages = snapshot.docs.map(doc => {
//           const message = doc.data();
//           return {
//             _id: doc.id,
//             text: message.text,
//             createdAt: message.createdAt.toDate(),
//             user: {
//               _id: message.userId,
//               name: message.userName,
//             },
//           };
//         });
//         setMessages(loadedMessages);
//       });

//     return () => unsubscribe();
//   }, []);

//   const onSend = async (newMessages = []) => {
//     const message = newMessages[0];

//     await firebase.firestore().collection('chats').add({
//       text: message.text,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       userId: 'driverUserId', // Replace with actual user ID
//       userName: 'Driver Name', // Replace with actual user name
//     });

//     setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={newMessages => onSend(newMessages)}
//         user={{
//           _id: 'driverUserId', // Replace with actual user ID
//           name: 'Driver Name', // Replace with actual user name
//         }}
//       />
//     </View>
//   );
// };

// export default ChatScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const ChatScreen = () => {
//   const navigation = useNavigation();
//   const [messages, setMessages] = useState([]);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [driverId, setDriverId] = useState('');

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });

//     const fetchUserData = async () => {
//       try {
//         const userToken = await AsyncStorage.getItem('user_token');
//         if (userToken) {
//           const response = await fetch(
//             `https://billgold.ng/casa/API/driver_get_details.php?action=get_driver_details&user_token=${userToken}`
//           );
//           const data = await response.json();
//           if (data.status === 'success' && data.data) {
//             const { first_name, last_name, email, id } = data.data;
//             setFirstName(first_name);
//             setLastName(last_name);
//             setEmail(email);
//             setDriverId(id);  
//           } else {
//             console.error('Failed to fetch driver details');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [navigation]);

//   const onSend = (newMessages = []) => {
//     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//       >
//         <View style={{ flex: 1 }}>
//           {/* Chat Header */}
//           <View style={{ backgroundColor: 'blue', paddingVertical: 12, paddingHorizontal: 20 }}>
//             <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
//               Driver Chat - {firstName} {lastName}
//             </Text>
//           </View>

//           {/* Gifted Chat UI */}
//           <ScrollView style={{ flex: 1 }}>
//             <GiftedChat
//               messages={messages}
//               onSend={(newMessages) => onSend(newMessages)}
//               user={{
//                 _id: driverId, 
//                 name: `${firstName} ${lastName}`, 
//               }}
//               placeholder="Type a message..."
//               renderUsernameOnMessage={true} 
//               alwaysShowSend
//               scrollToBottom
//               renderBubble={(props) => (
//                 <View style={{ backgroundColor: '#e0e0e0', borderRadius: 12, padding: 10 }}>
//                   {props.children}
//                 </View>
//               )}
//             />
//           </ScrollView>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default ChatScreen;



