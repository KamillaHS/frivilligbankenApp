import React, { Component } from "react";
import { Platform, Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, Image, DatePickerIOS, DatePickerAndroid, AsyncStorage, TouchableOpacity, TouchableHighlight } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const VOLSIGNUP_URL = 'http://192.168.0.22:8080/frivilligbanken/app/makeVolProfile.php';
const CITIES_URL = 'http://192.168.0.22:8080/frivilligbanken/app/getCities.php';

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

    async getCities(text) {
        try {
            const response = await fetch(CITIES_URL + '?q=' + text)
            /*
            this.setState({ citiesResult: await response.json() })
            */
           console.log(await response.text())
        } catch (error) {
            console.error(error)  
        }
    }

    async onMakeVolunteer() {
        const { fullName, dob, address, postalCode, city, phone, description, profilePic, cv } = this.state;

        if(this.state.fullName != '' && this.state.dob != '' && this.state.postalCode != '') {
            const responose = await fetch(VOLSIGNUP_URL, {
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
                this.props.navigation.navigate('VolunteerTabs')
            }
            
        } else {
            Alert.alert('Tomme felter', 'Venligt sørg for at alle de nødvendige felter er udfyldt.')
        }
    }

    render() {
        const { fullName, dob, address, postalCode, city, phone, description, profilePic, cv } = this.state;
        const { citiesResult } = this.state;
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../images/1088.jpg')} style={styles.background} />
                
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

                    <TouchableOpacity 
                        onPress={() => {
                            if(Platform.OS == 'ios') {
                                this.setModalVisible(true);
                            } else if(Platform.OS == 'android') {

                            }
                    }}>
                        <TextInput
                            value={moment(this.state.dob).format('L')}
                            placeholder={'Fødselsdato'}
                            placeholderTextColor='white'
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
                                    <Text>Hide Modal</Text>
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
                            <View>
                                <Text>Vælg en by</Text>

                                <View style={{}}>
                                    <TextInput
                                        onChangeText={text => {this.getCities(text)}}
                                        placeholder={'Søg'}
                                        placeholderTextColor='white'
                                        keyboardType='default'
                                        style={styles.input}
                                    />

                                    <TouchableHighlight
                                        onPress={() => {
                                        this.setModalVisible2(!this.state.modalVisible2);
                                        }}>
                                        <Text>Luk</Text>
                                    </TouchableHighlight>
                                </View>
                                
                                {
                                    citiesResult.map((item, i) => (
                                        <TouchableOpacity key={i} onPress={() => {this.setState({postalCode: item.PostalCode, city: item.CityName}), this.setModalVisible2(false)}}>
                                            <Text>{item.PostalCode}, {item.CityName}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                                
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

                    <TextInput
                        value={profilePic}
                        onChangeText={(profilePic) => this.setState({profilePic})}
                        placeholder={'Profilbillede'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <TextInput
                        value={cv}
                        onChangeText={(cv) => this.setState({cv})}
                        placeholder={'CV'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <Button 
                        title="Opret Frivillig Profil" 
                        buttonStyle={styles.greenButton}
                        onPress={this.onMakeVolunteer.bind(this)}
                    />

                </ScrollView>

            </View>
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
      passValRed: {
        color: 'red'
      },
      passValGreen: {
        color: 'green'
      },
});