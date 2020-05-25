import React, { Component } from "react";
import { Platform, Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, Image, DatePickerIOS, DatePickerAndroid, AsyncStorage, TouchableOpacity, TouchableHighlight } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const SPONSORSIGNUP_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/makeSponsor.php';
const CITIES_URL = 'http://kamilla-server.000webhostapp.com/app/getCities.php';
const CVR_API = 'https://cvrapi.dk/api?country=dk&vat=';

class SponsorSignUp extends Component {
    static navigationOptions = {
        title: 'Opret Sponsor Profil',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerBackTitle: null,
          headerTintColor: 'white',
    };

    state = { 
        sponsorName: '',
        cvr: '',
        sponsorEmail: '',
        address: '',
        postalCode: '',
        city: '',
        phone: '',
        website: '',
        description: '',
        logo: '',

        citiesResult: [],
        text: '',

        apiData: [],

        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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

    async getInputs() {
        try {
            //cvr = await AsyncStorage.getItem('cvr');;
            //website = await AsyncStorage.getItem('website');
            //logo = await AsyncStorage.getItem('logo');

            cvr = this.props.navigation.getParam('cvr', 'null');
            website = this.props.navigation.getParam('website', 'null');
            logo = this.props.navigation.getParam('logo', 'null');
            console.log(cvr, website, logo);
            //alert(cvr + ", " + website + ", " + logo);

            this.setState({ cvr: cvr });
            this.setState({ website: website });
            this.setState({ logo: logo });
        } catch (error) {
          console.error(error)
        }
    };

    async getInfo() {
        cvr = this.props.navigation.getParam('cvr', 'null');
        try {
            const response = await fetch(CVR_API + cvr)
            
            this.setState({ apiData: await response.json() })
            
        } catch (error) {
            console.error(error)  
        }
    }

    
    async onMakeSponsor() {
        var { apiData, cvr, sponsorName, sponsorEmail, address, postalCode, city, phone, website, description, logo } = this.state;
        if(sponsorName == null || sponsorName == '') {
            sponsorName = apiData.name;
        }
        if(sponsorEmail == null || sponsorEmail == '') {
            sponsorEmail = apiData.email;
        }
        if(address == null || address == '') {
            address = apiData.address;
        }
        if(postalCode == null || postalCode == '') {
            postalCode = apiData.zipcode;
        }
        if(city == null || city == '') {
            city = apiData.city;
        }
        if(phone == null || phone == '') {
            phone = apiData.phone
        }

        if(this.state.description != '') {
            const responose = await fetch(SPONSORSIGNUP_URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ cvr, sponsorName, sponsorEmail, address, postalCode, city, phone, website, description, logo }),
            })
            
            const data = await responose.json()

            this.props.navigation.navigate('SponsorTabs')

            /*
            if (data.error) {
                alert(data.error)
            } else {
                this.props.navigation.navigate('SponsorTabs')
            }
            */
            
        } else {
            Alert.alert('Tomme felter', 'Venligt sørg for at alle felter er udfyldt.')
        }
    }
    

    componentDidMount() {
    this.getInputs();
    this.getInfo();
    }

    render() {
        const { cvr, website, description, logo } = this.state;
        const { citiesResult } = this.state;
        const { apiData } = this.state;
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../images/1088.jpg')} style={styles.background} />

                <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingVertical: 20,}}>
                    <Image source={require('../../../assets/logo.png')} style={[styles.logo, {marginTop: 50}]} />

                    <View style={{marginBottom: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 15, textAlign: 'center'}}>Data fundet for CVR nummer </Text>
                        <Text style={{color: '#4c4c4c', fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{cvr}</Text>
                        <Text style={{color: '#4c4c4c', fontSize: 15, textAlign: 'center'}}> er automatisk udfyldt.</Text>
                        <Text style={{color: '#4c4c4c', fontSize: 15, textAlign: 'center'}}>Venligst udfyld de resterende tomme felter.</Text>
                    </View>

                    <TextInput
                        defaultValue={apiData.name}
                        onChangeText={(sponsorName) => this.setState({sponsorName})}
                        placeholder={'Sponsor Navn/Firma'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <TextInput
                        defaultValue={apiData.email}
                        onChangeText={(sponsorEmail) => this.setState({sponsorEmail})}
                        placeholder={'Sponsor Email'}
                        placeholderTextColor='white'
                        keyboardType='email-address'
                        style={styles.input}
                    />

                    <TextInput
                        defaultValue={apiData.address}
                        onChangeText={(address) => this.setState({address})}
                        placeholder={'Adresse'}
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
                            defaultValue={apiData.city}
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


                    <TextInput
                        defaultValue={apiData.phone}
                        onChangeText={(phone) => this.setState({phone})}
                        placeholder={'Telefon'}
                        placeholderTextColor='white'
                        keyboardType='phone-pad'
                        style={styles.input}
                    />

                    <TextInput
                        value={website}
                        onChangeText={(website) => this.setState({website})}
                        placeholder={'Hjemmeside'}
                        placeholderTextColor='white'
                        keyboardType='url'
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
                        value={logo}
                        onChangeText={(logo) => this.setState({logo})}
                        placeholder={'Logo'}
                        placeholderTextColor='white'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <Button 
                        title="Opret Sponsor Profil" 
                        buttonStyle={styles.greenButton}
                        onPress={this.onMakeSponsor.bind(this)}
                    />

                </ScrollView>

            </View>
        )
    }
}

export default SponsorSignUp;

const styles = StyleSheet.create({
    container:{
        //position: "absolute",
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