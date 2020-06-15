import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, TextInput, ImageBackground, Image, AsyncStorage, TouchableOpacity } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';

const SIGNUP_URL = 'http://kamilla-server.000webhostapp.com/app/signUp.php';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state= {
            email: '',
            password: '',
            password2: '',
        };
    }

    async onSignUp() {
        const { email, password, password2 } = this.state;

        if(this.state.email != '' && this.state.password != '' && this.state.password2 != '') {
            if(password != password2) {
                Alert.alert('Password matcher ikke', 'De to indtastede passwords skal være det samme password')
            } else {
                try {
                    const response = await fetch(SIGNUP_URL, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({ email, password }),
                    })
                    
                    const data = await response.json();

                    if(data.error === 'USER_ALREADY_EXISTS') {
                        alert('Der er allerede en bruger tilknyttet den indtastede email');
                    } else {
                        //AsyncStorage.setItem('UserID', data.user.UserID)
                        this.props.navigation.navigate('SignUpMessage')
                    }

                } catch (error) {
                    console.error(error)  
                }
                
            }
        } else {
            Alert.alert('Tomme felter', 'Venligt indtast email og password for at kunne oprette en bruger')
        }
    }

    render() {
        const { email, password, password2 } = this.state;
        
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../images/1088.jpg')} style={styles.background} />
                
                <View>
                    <Image source={require('../../../assets/logo.png')} style={styles.logo} />

                    <TextInput
                        value={email}
                        onChangeText={(email) => this.setState({email})}
                        placeholder={'Email'}
                        placeholderTextColor='white'
                        keyboardType='email-address'
                        style={styles.input}
                    />

                    <TextInput
                        value={password2}
                        onChangeText={(password2) => this.setState({ password2 })}
                        placeholder={'Password'}
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <TextInput
                        value={password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Password'}
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.underlined}>Har du allerede en konto? Login.</Text>
                    </TouchableOpacity>

                    <Button 
                        title="Opret Konto" 
                        buttonStyle={styles.greenButton}
                        onPress={this.onSignUp.bind(this)}
                    />

                </View>

            </View>
        )
    }
}

export default SignUp;

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