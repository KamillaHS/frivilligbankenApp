import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, TextInput, ImageBackground, Image, AsyncStorage, TouchableOpacity } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';

class SignUpMessage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../images/1088.jpg')} style={styles.background} />
                
                <View style={{width: '80%'}}>
                    <Image source={require('../../../assets/logo.png')} style={styles.logo} />

                    <Text style={[styles.text, {marginBottom: 20}]}>
                    Tak fordi du har oprettet en konto! 
                    For at du kan fortsætte, skal du først oprette dig som frivillig.
                    </Text>

                    <Text style={[styles.text, {marginBottom: 20}]}>
                    Herefter kan du oprette en forening, en sponsor, eller søge job på din frivillig profil.
                    </Text>

                    <Button 
                        title="Opret Profil" 
                        buttonStyle={styles.greenButton}
                        onPress={() => this.props.navigation.navigate('VolunteerSignUp')}
                    />

                </View>

            </View>
        )
    }
}

export default SignUpMessage;

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
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50
    },
    text:{
        fontSize: 15,
        color: '#4c4c4c',
        textAlign: 'center'
    },
    greenButton: {
        backgroundColor:"#30A451",
        borderColor: 'white',
        borderWidth: 2,
        borderRadius:10,
        marginBottom: 10,
    },
});