import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, icons, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const InviteScreen = () => {
  const inviteMessage = 'Save lives effortlessly! 🩸 Be a hero today. Download our Blood Donation App Now. ❤️ #DonateBlood #DownloadNow';
  const inviteLink = 'https://your-app-download-link.com';

  const shareToWhatsApp = () => {
    //Function to navigate back when hardware back button is pressed
    const navigation = useNavigation();
    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          navigation.goBack();
          return true; // Prevent default behavior (exit the app)
        }
      );

      return () => backHandler.remove();
    }, [navigation]);
    const url = `whatsapp://send?text=${encodeURIComponent(inviteMessage + ' ' + inviteLink)}`;
    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp opened');
      })
      .catch(() => {
        console.error('WhatsApp not installed');
      });
  };

  const shareToFaceBook = () => {
    const url = `facebook://send?text=${encodeURIComponent(inviteMessage + ' ' + inviteLink)}`;
    Linking.openURL(url)
      .then(() => {
        console.log('Facebook opened');
      })
      .catch(() => {
        console.error('Facebook not installed');
      });
  };

  const shareToTwitter = () => {
    const url = `twitter://post?message=${encodeURIComponent(inviteMessage + ' ' + inviteLink)}`;
    Linking.openURL(url)
      .then(() => {
        console.log('Twitter opened');
      })
      .catch(() => {
        console.error('Twitter not installed');
      });
  };

  const shareToInstagram = async () => {
    try {
      // Check if Instagram is installed
      const isInstagramInstalled = await Linking.canOpenURL('instagram://app');

      if (!isInstagramInstalled) {
        console.error('Instagram not installed');
        return;
      }

      // Use the 'share' intent to pre-fill the caption and, optionally, attach an image
      const instagramUrl = `instagram://library?LocalIdentifier=${encodeURIComponent(inviteLink)}`;

      Linking.openURL(instagramUrl)
        .then(() => {
          console.log('Instagram opened');
        })
        .catch((error) => {
          console.error('Error opening Instagram: ', error);
        });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const shareToMessenger = () => {
    const url = `fb-messenger://share/?link=${encodeURIComponent(inviteLink)}`;
    Linking.openURL(url)
      .then(() => {
        console.log('Messenger opened');
      })
      .catch(() => {
        console.error('Messenger not installed');
      });
  };

  const shareToGmail = () => {
    const subject = 'Check out this cool app';
    const body = inviteMessage + ' ' + inviteLink;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url)
      .then(() => {
        console.log('Gmail opened');
      })
      .catch(() => {
        console.error('Gmail not available');
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Friends</Text>
      <Image style={styles.InviteImage} source={images.InviteImage} />
      <View style={styles.iconContainer}>
        <View>
          <TouchableOpacity onPress={shareToWhatsApp} style={styles.iconButton}>
            <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.whatsapp} />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareToFaceBook} style={styles.iconButton}>
            <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.facebook} />
          </TouchableOpacity>

        </View>
        <View>
          <TouchableOpacity onPress={shareToTwitter} style={styles.iconButton}>
            <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.twitter} />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareToInstagram} style={styles.iconButton}>
            <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.instagram} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={shareToMessenger} style={styles.iconButton}>
            <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.messenger} />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareToGmail} style={styles.iconButton}>
            <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.gmail} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,

  },

  InviteImage: {
    alignContent: 'center',
    width: '70%',
    height: 400,
    marginBottom: 40,

  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,

  },
  iconButton: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 10,
  },
});

export default InviteScreen;
