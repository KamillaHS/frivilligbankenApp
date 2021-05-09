import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import SwitchToggle from 'react-native-switch-toggle';
import ToggleSwitch from 'rn-toggle-switch'
//import { isConfigurationAvailable } from "expo/build/AR";
import { NavigationEvents } from 'react-navigation';


class SponsorSettings extends Component {

    static navigationOptions = {
        title: 'Indstillinger',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
            height: 60
          },
          headerTintColor: 'white',
          headerBackTitle: null,
      };

    
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            switchValue2: false,
        };
    };
    

   toggleSwitch = (value) => {
       //onValueChange of the switch this function will be called
       this.setState({switchValue: value})
       //state changes according to switch
       //which will result in re-render the text
    }

    toggleSwitch2 = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({switchValue2: value})
        //state changes according to switch
        //which will result in re-render the text
     }

    render() {
        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>

                <View style={styles.noBGarea} >
                    <Button
                        title="Rediger Information"
                        buttonStyle={styles.blueButton}
                        onPress={() => this.props.navigation.navigate('EditSponsor')}
                    />

                    <Button
                        title="Skift Profil"
                        buttonStyle={styles.blueButton}
                        onPress={() => this.props.navigation.navigate('ChangeProfile')}
                    />

                    <Button
                        title="Log Ud"
                        buttonStyle={styles.redButton}
                        onPress={() => this.props.navigation.navigate('Login') }
                    />
                </View>

                {/*
                <View style={styles.area}>
                    <View style={styles.switch}>
                        <Text style={styles.text}>Tillad Meddelelser </Text>
                        <View>
                            <Switch
                                style={{}}
                                onValueChange = {this.toggleSwitch}
                                value = {this.state.switchValue}
                                ios_backgroundColor = {'#E84335'}
                                trackColor = {
                                    ios_backgroundColor = {true: '#30A451', false: '#E84335'}
                                }
                            />
                        </View>
                    </View>

                    <View style={[styles.switch, {marginTop: 10, }]}>
                        <Text style={styles.text}>Tillad GPS </Text>
                        <View>
                            <Switch
                                style={{}}
                                onValueChange = {this.toggleSwitch2}
                                value = {this.state.switchValue2}
                                ios_backgroundColor = {'#E84335'}
                                trackColor = {
                                    ios_backgroundColor = {true: '#30A451', false: '#E84335'}
                                }
                            />
                        </View>
                    </View>
                </View>
                */


                /*
                <View style={[styles.area, {marginTop: 10}]}>
                    <TouchableOpacity style={styles.list}>
                        <Text style={styles.text}>Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list}> 
                        <Text style={styles.text}>Privatlivspolitik</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list}>
                        <Text style={styles.text}>Servicevilkår</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list}>
                        <Text style={styles.text}>Andet Juridisk</Text>
                    </TouchableOpacity>
                </View>
                */}

            </ScrollView>
        )
    }
}

export default SponsorSettings;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    noBGarea:{
        width: '90%',
        marginBottom: 10
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '90%',
        padding: 10,
    },
    greenButton: {
        backgroundColor:"#30A451",
        borderRadius:10,
        width: '100%',
      },
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
        width: '100%',
        marginBottom: 10,
    },
    redButton: {
        backgroundColor:"#E84335",
        borderRadius:10,
        width: '100%',
    },
    switch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    list:{
        alignItems: 'center',
        padding: 8,
        fontSize: 15,
    },
    text:{
        fontSize: 15,
        color: '#4c4c4c',
        fontWeight: 'bold'
    },
});