import React, { Component } from "react";
import { Platform, Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, Image, DatePickerIOS, DatePickerAndroid, AsyncStorage, TouchableOpacity, TouchableHighlight } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';

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
        };
        this.setDate = this.setDate.bind(this);
    }

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

    async onEditVolunteer() {
        const { fullName, dob, address, postalCode, city, phone, description, profilePic, cv } = this.state;

        const responose = await fetch(VOLEDIT_URL, {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ fullName, dob, address, postalCode, city, phone, description, profilePic, cv }),
        })
        
        const data = await responose.json()

        if (data.error) {
            alert(data.error)
        } else {
            this.props.navigation.navigate('VolunteerProfile')
        }
        
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        const { citiesResult } = this.state;
        const { userData } = this.state;

        return(
          <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingVertical: 20,}}>
              <View style={styles.area}> 
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <Image
                      style={{flex:1, width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50, backgroundColor: 'white', marginRight: 20}}
                      source={{uri: userData.VolunteerPic}}
                    />
                    <Button 
                      buttonStyle={styles.blueButton}
                      title='Upload nyt billede'
                    />
                  </View>
              
                  <Text>Fulde Navn</Text>
                  <TextInput
                      defaultValue={this.state.userData.FullName}
                      onChangeText={(fullName) => this.setState({fullName})}
                      keyboardType='default'
                      style={styles.input}
                  />

                  <Text>Fødselsdato</Text>
                  <TouchableOpacity 
                      onPress={() => {
                          if(Platform.OS == 'ios') {
                              this.setModalVisible(true);
                          } else if(Platform.OS == 'android') {

                          }
                  }}>
                      <TextInput
                          defaultValue={moment(userData.DoB).format('L')}
                          keyboardType='default'
                          style={styles.input}
                          editable={false}
                          pointerEvents='none'
                      />
                  </TouchableOpacity>


                  <Modal
                      animationType="slide"
                      visible={this.state.modalVisible}
                      transparent={true}
                      onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                      }}>
                      <View style={{marginTop: 'auto', backgroundColor: 'white', marginBottom: 0}}>
                          <View>
                              <TouchableHighlight
                                  onPress={() => {
                                  this.setModalVisible(!this.state.modalVisible);
                                  }}>
                                  <View style={{marginRight: 10, marginLeft: 'auto', marginTop: 10}}>
                                      <Icon
                                          name="close"
                                          type='material'
                                          size={30}
                                          color="#4c4c4c"
                                      />
                                    </View>
                              </TouchableHighlight>


                              <DatePickerIOS
                                  date={this.state.dob}
                                  mode='date'
                                  maximumDate={moment().subtract(14, 'years').toDate()}
                                  onDateChange={this.setDate}
                              />
                          </View>
                      </View>
                  </Modal>


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

                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <Image
                      style={{flex:1, width: 100, height: 80, maxHeight: 100, maxWidth: 100, borderRadius: 10, backgroundColor: 'white', marginRight: 20}}
                      source={{uri: userData.CV}}
                    />
                    <Button 
                      buttonStyle={styles.blueButton}
                      title='Upload nyt CV'
                    />
                  </View>

                  <Button 
                      title="Gem Ændringer" 
                      buttonStyle={styles.greenButton}
                      onPress={this.onEditVolunteer.bind(this)}
                  />


              </View>
          </ScrollView>
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
                  