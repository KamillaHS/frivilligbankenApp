import React, { Component } from "react";
import { Platform, Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, Image, AsyncStorage, TouchableOpacity, TouchableHighlight } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const VOLUNTEER_URL = 'http://kamilla-server.000webhostapp.com/app/volunteerInfo.php';
const VOLEDIT_URL = 'http://kamilla-server.000webhostapp.com/app/editVolProfile.php';
const CITIES_URL = 'http://kamilla-server.000webhostapp.com/app/getCities.php';

class EditVolunteer extends Component {
    static navigationOptions = {
      title: 'Rediger Information',
      headerTitleStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#517BBE',
          height: 60
        },
        headerTintColor: 'white',
    };

    constructor(props) {
        super(props);

        this.state= {
            userData: [],
            fullName: '',
            dob: null,
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
        //this.setDate = this.setDate.bind(this);
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

    /*
    setDate(newDate) {
        this.setState({dob: newDate});
    }
    */

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
        
        const data = await responose.json();

 
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
        const dob = this.state.dob || userData.DoB || new Date()

        const encodedPicture = userData.VolunteerPic;
        const encodedCV = userData.CV;

        return(
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
              <View style={styles.area}> 
                {/*
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <Image
                      style={{flex:1, width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50, backgroundColor: 'white', marginRight: 20}}
                      //source={{uri: userData.VolunteerPic}}
                      source={{uri: `data:image/gif;base64,${encodedPicture}`}}
                    />
                    <Button 
                      buttonStyle={styles.blueButton}
                      title='Upload nyt billede'
                      onPress={this._pickImage}
                    />

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                        {image &&
                        <Image source={{ uri: image }} style={{ width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50 }} />}
                    </View>
                  </View>
                */}

              
                  <Text>Fulde Navn</Text>
                  <TextInput
                      defaultValue={this.state.userData.FullName}
                      onChangeText={(fullName) => this.setState({fullName})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Text>Fødselsdato</Text>
                  <DateTimePicker
                     value={new Date(dob)}
                     mode='date'
                     style={styles.input}
                     maximumDate={moment().utc().subtract(14, 'years').toDate()}
                     onChange={(e, dob) => this.setState({dob})}
                  />



                  <Text>Adresse</Text>
                  <TextInput
                      defaultValue={userData.Address}
                      onChangeText={(address) => this.setState({address})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Text>By</Text>
                  <TouchableOpacity 
                      onPress={() => {
                          if(Platform.OS == 'ios') {
                              this.setModalVisible2(true);
                          } else if(Platform.OS == 'android') {

                          }
                  }}>
                      <TextInput
                          defaultValue={userData.PostalCode, userData.City}
                          keyboardType='default'
                          style={styles.input}
                          editable={false}
                          pointerEvents='none'
                      />
                  </TouchableOpacity>


                  <Modal
                      animationType="slide"
                      visible={this.state.modalVisible2}
                      transparent={false}
                      onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                      }}>
                      <View style={{marginTop: 22}}>
                          <View style={{height: '100%', padding: 10}}>
                              <View style={{height: '20%'}}>
                                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#4c4c4c'}}>Vælg en by</Text>
                                  <TouchableHighlight
                                      onPress={() => {
                                      this.setModalVisible2(!this.state.modalVisible2);
                                      }}>
                                      <View style={{marginRight: 0, marginLeft: 'auto', marginTop: -25}}>
                                          <Icon
                                              name="close"
                                              type='material'
                                              size={30}
                                              color="#4c4c4c"
                                          />
                                      </View>
                                      
                                  </TouchableHighlight>
                              </View>

                              <View style={{marginTop: -90, marginBottom: 'auto'}}>
                                  <TextInput
                                      autoFocus={true}
                                      onChangeText={text => {this.getCities(text)}}
                                      placeholder={'Indtast postnummer eller bynavn'}
                                      placeholderTextColor='white'
                                      keyboardType='default'
                                      style={styles.searchInput}
                                  />

                                  <ScrollView style={{height: '75%', borderRadius: 10}}>
                                      {
                                          citiesResult.map((item, i) => (
                                              <TouchableOpacity key={i} style={i % 2 == 1 || i % 2 == 2 ? styles.interestDark : styles.interestLight} onPress={() => {this.setState({postalCode: item.PostalCode, city: item.CityName}), this.setModalVisible2(false)}}>
                                                  <Text style={{color: '#4c4c4c'}}>{item.PostalCode}, {item.CityName}</Text>
                                              </TouchableOpacity>
                                          ))
                                      }
                                  </ScrollView>
                              </View>
                              
                          </View>
                      </View>
                  </Modal>


                  <Text>Telefon</Text>
                  <TextInput
                      defaultValue={userData.Phone}
                      onChangeText={(phone) => this.setState({phone})}
                      keyboardType='phone-pad'
                      style={styles.input}
                  />

                  <Text>Beskrivelse</Text>
                  <TextInput
                      defaultValue={userData.Description}
                      onChangeText={(description) => this.setState({description})}
                      keyboardType='default'
                      style={styles.input}
                  />
                {/*
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <Image
                      style={{flex:1, width: 100, height: 80, maxHeight: 100, maxWidth: 100, borderRadius: 10, backgroundColor: 'white', marginRight: 20}}
                      //source={{uri: userData.CV}}
                      source={{uri: `data:image/gif;base64,${encodedCV}`}}
                    />
                    <Button 
                      buttonStyle={styles.blueButton}
                      title='Upload nyt CV'
                      onPress={this._pickCV}
                    />

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                        {cvImage &&
                        <Image source={{ uri: cvImage }} style={{ width: 100, height: 80, maxHeight: 100, maxWidth: 100, borderRadius: 10 }} />}
                    </View>

                  </View>
                */}
                  <Button 
                      title="Gem Ændringer" 
                      buttonStyle={styles.greenButton}
                      onPress={this.onEditVolunteer.bind(this)}
                  />


              </View>
          </KeyboardAwareScrollView>
        )
    }
}

export default EditVolunteer;

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
                  