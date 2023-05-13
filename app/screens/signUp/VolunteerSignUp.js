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

const VOLSIGNUP_URL = 'http://kamilla-server.000webhostapp.com/app/makeVolProfile.php';
const CITIES_URL = 'http://kamilla-server.000webhostapp.com/app/getCities.php';

class VolunteerSignUp extends Component {
    constructor(props) {
        super(props);

        this.state= {
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
        //this.setDate = this.setDate.bind(this);
    }

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

    async getCities(text) {
        try {
            const response = await fetch(CITIES_URL + '?q=' + text)
            
            this.setState({ citiesResult: await response.json() })
            
           //console.log(await response.text())
        } catch (error) {
            console.error(error)  
        }
    }

    async onMakeVolunteer() {
        const { fullName, dob, address, postalCode, city, phone, description, imageBase64, cvImageBase64 } = this.state;

        if(this.state.fullName != '' && this.state.dob != '' && this.state.postalCode != '') {
            const responose = await fetch(VOLSIGNUP_URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ fullName, dob, address, postalCode, city, phone, description, imageBase64, cvImageBase64 }),
            })
            
            const data = await responose.json();

            if (data.error) {
                alert(data.error)
            } else {
                this.props.navigation.navigate('VolunteerTabs', {newUser: true})
            }
            
        } else {
            Alert.alert('Tomme felter', 'Venligt sørg for at alle de nødvendige felter er udfyldt.')
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    render() {
        const { fullName, dob, address, postalCode, city, phone, description, profilePic, cv } = this.state;
        const { citiesResult } = this.state;

        let { image, imageBase64, cvImage, cvImageBase64 } = this.state;

        //VolIDnotDetected
        /*
        const isDetected = this.props.navigation.getParam('error');
        console.log(isDetected);
        if(isDetected != "") {
            console.log('Redirected from Dashboard. No valid ID found.')
            alert('Der skete desværre en fejl', 'Der skete en fejl i registreringens processen. Venligst udfyld dine informationer igen.');
        }
        */
        

        return(
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <ImageBackground source={require('../../images/1088.jpg')} style={styles.background} />
                
                {/*
                <Button 
                    title="Tilbage" 
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                */}

                <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingVertical: 20,}}>
                    <Image source={require('../../../assets/logo.png')} style={[styles.logo, {marginTop: 50}]} />

                    <TextInput
                        value={fullName}
                        onChangeText={(fullName) => this.setState({fullName})}
                        placeholder={'Fulde Navn'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <DateTimePicker
                        value={this.state.dob}
                        mode='date'
                        style={styles.input}
                        maximumDate={moment().utc().subtract(14, 'years').toDate()}
                        onChange={(e, dob) => this.setState({dob})}
                    />

                    <TextInput
                        value={address}
                        onChangeText={(address) => this.setState({address})}
                        placeholder={'Adresse'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <TouchableOpacity 
                        onPress={() => {
                            if(Platform.OS == 'ios') {
                                this.setModalVisible2(true);
                            } else if(Platform.OS == 'android') {

                            }
                    }}>
                        <TextInput
                            value={postalCode, city}
                            placeholder={'Postnummer, By'}
                            placeholderTextColor='white'
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


                    <TextInput
                        value={phone}
                        onChangeText={(phone) => this.setState({phone})}
                        placeholder={'Telefon'}
                        placeholderTextColor='white'
                        keyboardType='phone-pad'
                        style={styles.input}
                    />

                    <TextInput
                        value={description}
                        onChangeText={(description) => this.setState({description})}
                        placeholder={'Beskrivelse'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />
                    
                    {/*
                    <TextInput
                        value={profilePic}
                        onChangeText={(profilePic) => this.setState({profilePic})}
                        placeholder={'Profilbillede'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />
                    */}

                    <View style={[styles.input, {flex:1, flexDirection: 'row', padding: 0}]}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {image &&
                            <Image source={{ uri: image }} style={{ height: 44, maxHeight: 44, width: '100%', borderRadius: 10, backgroundColor: 'white', marginRight: 5 }} />}
                        </View>
                        <Button 
                            buttonStyle={styles.blueButton}
                            title='Upload Profilbillede'
                            onPress={this._pickImage}
                        />
                    </View>
                    
                    {/*
                    <TextInput
                        value={cv}
                        onChangeText={(cv) => this.setState({cv})}
                        placeholder={'CV'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />
                    */}

                    <View style={[styles.input, {flex:1, flexDirection: 'row', padding: 0}]}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {cvImage &&
                            <Image source={{ uri: cvImage }} style={{ height: 44, maxHeight: 44, width: '100%', borderRadius: 10, backgroundColor: 'white', marginRight: 5 }} />}
                        </View>
                        <Button 
                            buttonStyle={styles.blueButton}
                            title='Upload CV'
                            onPress={this._pickCV}
                        />
                    </View>

                    <Button 
                        title="Opret Frivillig Profil" 
                        buttonStyle={styles.greenButton}
                        onPress={this.onMakeVolunteer.bind(this)}
                    />

                </ScrollView>

            </KeyboardAwareScrollView>
        )
    }
}

export default VolunteerSignUp;

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    background: {
        position: "absolute",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        opacity: 0.4,
    },
    logo: {
        height: 110,
        width: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50
    },
    underlined: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    greenButton: {
        backgroundColor:"#30A451",
        borderColor: 'white',
        borderWidth: 2,
        borderRadius:10,
        marginBottom: 10,
        width: 250,
    },
    blueButton: {
        backgroundColor:"#517BBE",
        borderColor: 'white',
        borderWidth: 2,
        borderRadius:10,
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 10,
        color: 'white'
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