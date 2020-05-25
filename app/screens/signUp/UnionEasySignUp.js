import React, { Component } from "react";
import { Platform, Modal, View, Text, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, Image, DatePickerIOS, DatePickerAndroid, AsyncStorage, TouchableOpacity, TouchableHighlight } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const CVR_API = 'https://cvrapi.dk/api?country=dk&vat=';

class UnionEasySignUp extends Component {
    static navigationOptions = {
        title: 'Opret Forenings Profil',
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
        cvr: '',
        website: '',
        logo: '',

        apiData: [],
        text: '',

        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    async getInfo() {
        try {
            const response = await fetch(CVR_API + this.state.cvr)
            
            const apiData = await response.json()
            if(apiData.error === 'NOT_FOUND') {
                alert('Der er ikke fundet noget data for det indtastede nummer. Prøv igen eller opret dig manuelt ved at klikke på knappen nederst på siden.');
            }

            this.setState({apiData})

            //this.setState({ apiData: await response.json() })
            
        } catch (error) {
            console.error(error)  
        }
    }

    
    async onFindUnion() {
        const { cvr, website, logo } = this.state;

        if(this.state.cvr != '' && this.state.website != '') {
            try {
                //myCvr = await AsyncStorage.setItem('CVR', cvr);
                //myWebsite = await AsyncStorage.setItem('CVR', website);
                //myLogo = await AsyncStorage.setItem('CVR', logo);

                this.props.navigation.navigate('UnionSignUp', { cvr, website, logo })
            } catch (error) {
                console.error(error)
                }
        }
        else {
            Alert.alert('Tomme felter', 'Venligt sørg for at alle de nødvendige felter er udfyldt.')
        }
    }
    

    render() {
        const { cvr, website, logo } = this.state;
        const { apiData } = this.state;
        console.log("apiData", apiData);

        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../images/1088.jpg')} style={styles.background} />

                <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingVertical: 20,}}>
                    <Image source={require('../../../assets/logo.png')} style={[styles.logo, {marginTop: 50}]} />

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TextInput
                            value={cvr}
                            placeholder={'CVR nummer'}
                            onChangeText={(cvr) => this.setState({cvr})}
                            placeholderTextColor='white'
                            keyboardType='phone-pad'
                            style={styles.searchInput}
                        />
                        <Button 
                            title="GO" 
                            buttonStyle={{borderRadius: 10, backgroundColor: '#4c4c4c'}}
                            onPress={this.getInfo.bind(this)}
                        />
                    </View>

                    <View style={styles.area}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                            <Text style={styles.titles}>Forenings Navn</Text>
                            <Text style={styles.values}>{apiData.name}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={styles.titles}>Email</Text>
                            <Text style={styles.values}>{apiData.email}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={styles.titles}>Adresse</Text>
                            <Text style={styles.values}>{apiData.address}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={styles.titles}>Postnummer</Text>
                            <Text style={styles.values}>{apiData.zipcode}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={styles.titles}>By</Text>
                            <Text style={styles.values}>{apiData.city}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.titles}>Telefon</Text>
                            <Text style={styles.values}>{apiData.phone}</Text>
                        </View>
                    </View>

                    <TextInput
                        value={website}
                        onChangeText={(website) => this.setState({website})}
                        placeholder={'Hjemmeside'}
                        placeholderTextColor='white'
                        keyboardType='url'
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
                        title="Fortsæt" 
                        buttonStyle={styles.greenButton}
                        onPress={this.onFindUnion.bind(this)}
                    />

                </ScrollView>

            </View>
        )
    }
}

export default UnionEasySignUp;

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
    area:{
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderWidth: 2,
        borderColor: '#4c4c4c',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 255,
    },
    titles:{
        color: '#4c4c4c',
        fontSize: 15, 
        width: '40%',
        marginRight: 5
    },
    values:{
        color: '#4c4c4c',
        fontSize: 15, 
        width: '60%'
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
        width: '53%',
        height: 44,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 10,
        marginRight: 10,
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