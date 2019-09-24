import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, TextInput, ImageBackground, Image, AsyncStorage } from "react-native";
import { Button, Icon, withTheme } from 'react-native-elements';

const LOGIN_URL = 'http://kamilla-test.000webhostapp.com/app/userLogin.php';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state= {
            email: '',
            password: '',
        };
    }

    async onLogin() {
        if(this.state.email != '' && this.state.password != '') {
            const { email, password } = this.state;
        
            const responose = await fetch(LOGIN_URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ email, password }),
            })
            
            const data = await responose.json()

            if (data.error) {
                alert(data.error)
            } else {
                AsyncStorage.setItem('UserID', data.user.UserID)
                this.props.navigation.navigate('VolunteerTabs')
            }
        } else {
            Alert.alert('Tomme felter', 'Venligt indtast email og password for at logge ind')
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../images/1088.jpg')} style={styles.background} />
                
                <View>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />

                    <Icon type='material' name="person" size={25} />
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        placeholder={'Email'}
                        placeholderTextColor='white'
                        keyboardType='email-address'
                        style={styles.input}
                    />

                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder={'Password'}
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <Text style={styles.underlined}>Glemt dit login?</Text>

                    <Button 
                        title="Login" 
                        buttonStyle={styles.greenButton}
                        onPress={this.onLogin.bind(this)}
                    />

                    <Button 
                        title="Opret Konto" 
                        buttonStyle={styles.blueButton}
                        
                    />
                </View>

            </View>
        )
    }
}

export default LoginScreen;

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
});