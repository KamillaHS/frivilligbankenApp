import React, { Component } from "react";
import { Platform, Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, Image, DatePickerIOS, DatePickerAndroid, AsyncStorage, TouchableOpacity, TouchableHighlight } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const VOLUNTEER_URL = 'http://kamilla-server.000webhostapp.com/app/volunteerInfo.php';
const VOLEDIT_URL = 'http://kamilla-server.000webhostapp.com/app/editVolProfile.php';
const CITIES_URL = 'http://kamilla-server.000webhostapp.com/app/getCities.php';

class EditUnion extends Component {
    static navigationOptions = {
      title: 'Rediger Forening',
      headerTitleStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#517BBE',
        },
        headerTintColor: 'white',
    };

    constructor(props) {
        super(props);

        this.state= {
            userData: [],
            fullName: '',
            dob: new Date(),
            address: '',
            postalCode: '',
            city: '',
            phone: '',
            description: '',
            profilePic: '',
            cv: '',

            citiesResult: [],
            text: '',
            modalVisible: false,
            modalVisible2: false,

            image: null,
            imageBase64: null,
            cvImage: null,
            cvImageBase64: null,
        };
        this.setDate = this.setDate.bind(this);
    };

    /* IMAGE PICKER CODE STARTS HERE */
    
    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
  
      console.log(result.base64);
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.setState({ imageBase64: result.base64 });
      }
    };

    _pickCV = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          //aspect: [4, 3],
          base64: true,
        });
    
        console.log(result.base64);
    
        if (!result.cancelled) {
          this.setState({ cvImage: result.uri });
          this.setState({ cvImageBase64: result.base64 });
        }
      };

    /* IMAGE PICKER CODE ENDS HERE */

    setDate(newDate) {
        this.setState({dob: newDate});
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setModalVisible2(visible) {
        this.setState({modalVisible2: visible});
    }

    async getUser() {
      try {
        AsyncStorage.getItem('UserID');

        const response = await fetch(VOLUNTEER_URL, {
          credentials: 'include',
        })
      
        this.setState({ userData: await response.json() })
        
      } 
      catch (error) {
          console.error(error)  
      }
  }

    async getCities(text) {
        try {
            const response = await fetch(CITIES_URL + '?q=' + text)
            
            this.setState({ citiesResult: await response.json() })
        } catch (error) {
            console.error(error)  
        }
    }

    /*
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };
    */

    async onEditVolunteer() {
        const { fullName, dob, address, postalCode, city, phone, description, imageBase64, cvImageBase64 } = this.state;

        const responose = await fetch(VOLEDIT_URL, {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ fullName, dob, address, postalCode, city, phone, description, imageBase64, cvImageBase64 }),
        })
        
        const data = alert(await responose.text());

 
        this.props.navigation.navigate('VolunteerProfile');
        
        
    }

    componentDidMount() {
        this.getUser();
        this.getPermissionAsync();
    }

    render() {
        const { citiesResult, profilePic } = this.state;
        const { userData } = this.state;
        let { image, imageBase64, cvImage, cvImageBase64 } = this.state;

        const encodedPicture = userData.VolunteerPic;
        const encodedCV = userData.CV;

        return(
          <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingVertical: 20,}}>
            <View>
                <Text>Rediger Forening !!</Text>
            </View>
          </ScrollView>
        )
    }
}

export default EditUnion;

const styles = StyleSheet.create({
    container:{
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: '#E7EBF0',
    },
    greenButton: {
        backgroundColor:"#30A451",
        borderRadius:10,
    },
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        padding: 10,
        width: '90%',
    },
    text:{
        color: '#4c4c4c',
        textAlign: 'center',
    },
    input: {
        height: 44,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
        color: '#4c4c4c'
    },
    searchInput: {
        width: '100%',
        height: 44,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 10,
        color: 'white'
    },
    passValRed: {
        color: 'red'
    },
    passValGreen: {
        color: 'green'
    },
    interestDark:{
        backgroundColor: 'rgba(81,123,190,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    interestLight:{
        backgroundColor: 'rgba(81,123,190,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
});
                  