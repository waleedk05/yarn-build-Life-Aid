import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, RequestPage, Profile, Menu, EventPage, MapPage } from "../screens/MainScreens";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import { icons } from '../constants';
import { COLORS, FONTS, SIZES } from "../constants/themes";
import { useRoute } from '@react-navigation/native';
import TabBarIcons from '../constants/TabBarIcons';
import DonorPage from '../screens/MainScreens/DonorPage';
import { color } from 'react-native-elements/dist/helpers';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../config';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Bottomtab({ navigation }) {
    //FUnction to fetch profile picture and user data
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                // Query Firestore to get user data based on email
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docRef = doc(db, 'users', querySnapshot.docs[0].id);

                    // Use onSnapshot to listen for changes to the document
                    const unsubscribe = onSnapshot(docRef, (doc) => {
                        if (doc.exists()) {
                            const userData = doc.data();
                            setProfilePicture(userData.profilePicture); // Set the profile picture from Firestore
                        }
                    });

                    // Clean up the listener when the component unmounts
                    return () => unsubscribe();
                }
            }
        };

        fetchUserData();
    }, []);



    return (
        <Tab.Navigator
            initialRouteName='Home'

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon;

                    if (route.name === 'Home') {
                        icon = focused ? icons.home : icons.home;
                    } else if (route.name === 'RequestPage') {
                        icon = focused ? icons.requsetIcon : icons.requsetIcon;
                    } else if (route.name === 'DonorPage') {
                        icon = focused ? icons.donorIcon : icons.donorIcon;
                    } else if (route.name === 'EventPage') {
                        icon = focused ? icons.eventIcon : icons.eventIcon;
                    } else if (route.name === 'MapPage') {
                        icon = focused ? icons.mapWhite : icons.mapWhite;
                    }

                    return <TabBarIcons focused={focused} icon={icon} />;
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                    elevation: 20,
                    shadowColor: 'black',
                    shadowOpacity: 0.4,
                    shadowRadius: 4,
                    shadowOffset: 50,
                    borderTopWidth: 0.6,
                    borderTopColor: 'grey',
                    height: 85
                },
                tabBarIconStyle: { marginBottom: -10 },
                tabBarLabelStyle: { marginBottom: 10, marginTop: 10, color: 'black', fontWeight: 'bold', fontSize: 12, }
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',

                    headerTitleStyle: { color: 'white', fontSize: 34, },
                    headerStyle: {
                        backgroundColor: '#CF0A0A',
                        height: 90,
                        elevation: 20,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.3,

                    },
                    headerLeft: () => ( // Custom header with image

                        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                            {profilePicture ? (
                                <Image
                                    source={{ uri: profilePicture }}
                                    style={{ width: 60, borderRadius: 50, height: 60, marginRight: 10, marginLeft: 20 }}
                                />
                            ) : (
                                <Image
                                    source={icons.profilePicWhite}
                                    style={{ width: 55, height: 55, marginRight: 10, marginLeft: 20 }}
                                />
                            )}
                        </TouchableOpacity>
                    ),
                }} />

            <Tab.Screen name="RequestPage" component={RequestPage}
                options={{
                    title: 'Request Tab', headerTitleStyle: { color: 'white', fontSize: 36, },
                    headerStyle: {
                        backgroundColor: '#CF0A0A',
                        height: 120,
                        elevation: 20,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.3,

                    },
                    headerRight: () => ( // Custom header with image

                        <View>
                            <View
                                style={{
                                    height: 6,
                                    width: 6,
                                    backgroundColor: 'black',
                                    borderRadius: 3,
                                    position: 'absolute',
                                    right: 15,
                                    top: -6,
                                }}
                            ></View>
                            <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                                <Ionicons style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: -10,
                                }}
                                    name="notifications-outline"
                                    size={28}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }} />
            <Tab.Screen name="DonorPage" component={DonorPage}
                options={{
                    title: 'Donors', headerTitleStyle: { color: 'white', fontSize: 36, },
                    headerStyle: {
                        backgroundColor: '#CF0A0A',
                        height: 120,
                        elevation: 20,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.3,

                    },
                    headerRight: () => ( // Custom header with image

                        <View>
                            <View
                                style={{
                                    height: 6,
                                    width: 6,
                                    backgroundColor: 'black',
                                    borderRadius: 3,
                                    position: 'absolute',
                                    right: 15,
                                    top: -6,
                                }}
                            ></View>
                            <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                                <Ionicons style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: -10,
                                }}
                                    name="notifications-outline"
                                    size={28}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }} />
            <Tab.Screen name="EventPage" component={EventPage}
                options={{
                    title: 'Events', headerTitleStyle: { color: 'white', fontSize: 36, },
                    headerStyle: {
                        backgroundColor: '#CF0A0A',
                        height: 120,
                        elevation: 20,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.3,

                    },
                    headerRight: () => ( // Custom header with image

                        <View>
                            <View
                                style={{
                                    height: 6,
                                    width: 6,
                                    backgroundColor: 'black',
                                    borderRadius: 3,
                                    position: 'absolute',
                                    right: 15,
                                    top: -6,
                                }}
                            ></View>
                            <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                                <Ionicons style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: -10,
                                }}
                                    name="notifications-outline"
                                    size={28}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }} />
            <Tab.Screen name="MapPage" component={MapPage}
                options={{
                    title: 'Maps', headerTitleStyle: { color: 'white', fontSize: 36, },
                    headerStyle: {
                        backgroundColor: '#CF0A0A',
                        height: 120,
                        elevation: 20,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.3,
                    },
                    headerRight: () => ( // Custom header with image

                        <View>
                            <View
                                style={{
                                    height: 6,
                                    width: 6,
                                    backgroundColor: 'black',
                                    borderRadius: 3,
                                    position: 'absolute',
                                    right: 15,
                                    top: -6,
                                }}
                            ></View>
                            <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                                <Ionicons style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: -10,
                                }}
                                    name="notifications-outline"
                                    size={28}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }} />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadgeText: {
        color: 'red',
        fontSize: 12,
    },
});

export default Bottomtab;