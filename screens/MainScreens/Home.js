import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert, BackHandler } from 'react-native';
import PageContainer from '../../components/PageContainer';
import { icons } from '../../constants';
import { COLORS, FONTS, SIZES } from "../../constants/themes";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getDatabase, ref, onValue, update, get } from "firebase/database";


const Home = (props) => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null, // Do nothing when cancel is pressed
            style: 'cancel',
          },
          { text: 'OK', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );

      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // Initialize Realtime Firebase Database
  const RealtimeDatabase = getDatabase();
  //Function to display notification badge
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const notificationsRef = ref(RealtimeDatabase, 'notifications');

    // Set up a listener for real-time updates
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const notificationData = [];

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const notification = childSnapshot.val();
          if (!notification.read && notification.message) {
            notificationData.push(notification);
          }
        });
      }

      setUnreadCount(notificationData.length);
    });

    return () => {
      // Clean up the listener when the component is unmounted
      unsubscribe();
    };
  }, []);



  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 20
          }}>
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
                  marginBottom: 20
                }}
              >

              </View>
              <TouchableOpacity onPress={() => {
                props.navigation.navigate('NotificationScreen');
              }}>
                <Ionicons style={{
                  position: 'absolute',
                  right: 10,
                  top: -10,

                }}
                  name="notifications-outline"
                  size={28}
                  color='red'
                />

                {unreadCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.blocks}>
              <Text style={styles.text}>Quote of the Day</Text>
              <Text style={styles.quote}>Saving lives brings inner peace.</Text>
            </View>
            <View style={styles.blocks}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={icons.requestIconRed} style={{ height: 35, width: 35 }} />
                <Text style={styles.text2}>Create a Request</Text>
              </View>
              <Text style={styles.text3}>Ask for blood in emergency situation.</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("RequestPage")}>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <Text style={{ color: COLORS.primaryRed, fontWeight: 'bold' }}>Request</Text>
                  <Image source={icons.rightArrowRed} style={{ height: 16, width: 14, marginLeft: 5 }} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.blocks}>
              <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
                <Image source={icons.shareIcon} style={{ height: 35, width: 35 }} />
                <Text style={styles.text2}>Invite Friends</Text>
              </View>
              <Text style={styles.text3}>Inviting People can bring a change, someone in your friends & family would be able to help.</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("Invite")}>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <Text style={{ color: COLORS.primaryRed, fontWeight: 'bold' }}>Invite</Text>
                  <Image source={icons.rightArrowRed} style={{ height: 16, width: 14, marginLeft: 5 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </PageContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  blocks: {
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    padding: 25,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 25,

  },

  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
    textAlign: 'center',
    paddingBottom: 15,

  },
  text2: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
    paddingBottom: 3,
    marginLeft: 15
  },
  text3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    paddingBottom: 19,
    marginLeft: 51
  },
  quote: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center'
  },
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

export default Home;
