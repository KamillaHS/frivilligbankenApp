import React, { Component } from "react";
import { Platform, Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, Image, DatePickerIOS, DatePickerAndroid, AsyncStorage, TouchableOpacity, TouchableHighlight } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const UNION_URL = 'http://kamilla-server.000webhostapp.com/app/union/unionInfo.php';
const UNIONEDIT_URL = 'http://kamilla-server.000webhostapp.com/app/union/editUnionProfile.php';
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
            unionData: [],
            unionName: '',
            unionEmail: '',
            address: '',
            postalCode: '',
            city: '',
            phone: '',
            website: '',
            description: '',
            unionLogo: '',

            citiesResult: [],
            text: '',
            modalVisible: false,

            logo: null,
            logoBase64: null,
        };
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
        this.setState({ logo: result.uri });
        this.setState({ logoBase64: result.base64 });
      }
    };

    /* IMAGE PICKER CODE ENDS HERE */

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    async getUnion() {
      try {
        const response = await fetch(UNION_URL, {
          credentials: 'include',
        })
      
        this.setState({ unionData: await response.json() })
        
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

    async onEditUnion() {
        const { unionName, unionEmail, address, postalCode, city, phone, website, description, logoBase64 } = this.state;

        const responose = await fetch(UNIONEDIT_URL, {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ unionName, unionEmail, address, postalCode, city, phone, website, description, logoBase64 }),
        })
        
        const data = await responose.json();

 
        this.props.navigation.navigate('UnionProfile');
        
        
    }

    componentDidMount() {
        this.getUnion();
        this.getPermissionAsync();
    }

    render() {
        const { citiesResult } = this.state;
        const { unionData } = this.state;
        let { logo, logoBase64 } = this.state;

        const encodedPicture = unionData.UnionLogo;

        return(
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
              <View style={styles.area}> 
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <Image
                      style={{flex:1, width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50, backgroundColor: 'white', marginRight: 20}}
                      source={{uri: `data:image/gif;base64,${encodedPicture}`}}
                    />
                    <Button 
                      buttonStyle={styles.blueButton}
                      title='Upload nyt billede'
                      onPress={this._pickImage}
                    />

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                        {logo &&
                        <Image source={{ uri: logo }} style={{ width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50 }} />}
                    </View>
                  </View>

              
                  <Text>Forening Navn</Text>
                  <TextInput
                      defaultValue={unionData.UnionName}
                      onChangeText={(unionName) => this.setState({unionName})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Text>Email</Text>
                  <TextInput
                      defaultValue={unionData.UnionEmail}
                      onChangeText={(unionEmail) => this.setState({unionEmail})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Text>Adresse</Text>
                  <TextInput
                      defaultValue={unionData.Address}
                      onChangeText={(address) => this.setState({address})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Text>By</Text>
                  <TouchableOpacity 
                      onPress={() => {
                          if(Platform.OS == 'ios') {
                              this.setModalVisible(true);
                          } else if(Platform.OS == 'android') {

                          }
                  }}>
                      <TextInput
                          defaultValue={unionData.PostalCode, unionData.City}
                          keyboardType='default'
                          style={styles.input}
                          editable={false}
                          pointerEvents='none'
                      />
                  </TouchableOpacity>


                  <Modal
                      animationType="slide"
                      visible={this.state.modalVisible}
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
                                      this.setModalVisible(!this.state.modalVisible);
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
                                              <TouchableOpacity key={i} style={i % 2 == 1 || i % 2 == 2 ? styles.interestDark : styles.interestLight} onPress={() => {this.setState({postalCode: item.PostalCode, city: item.CityName}), this.setModalVisible(false)}}>
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
                      defaultValue={unionData.Phone}
                      onChangeText={(phone) => this.setState({phone})}
                      keyboardType='phone-pad'
                      style={styles.input}
                  />

                  <Text>Hjemmeside</Text>
                  <TextInput
                      defaultValue={unionData.Website}
                      onChangeText={(website) => this.setState({website})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Text>Beskrivelse</Text>
                  <TextInput
                      defaultValue={unionData.Description}
                      onChangeText={(description) => this.setState({description})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Button 
                      title="Gem Ændringer" 
                      buttonStyle={styles.greenButton}
                      onPress={this.onEditUnion.bind(this)}
                  />


              </View>
          </KeyboardAwareScrollView>
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
                  