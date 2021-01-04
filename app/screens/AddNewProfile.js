import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const PROFILES_URL = 'http://kamilla-server.000webhostapp.com/app/getUserProfiles.php';

class AddNewProfile extends Component {

    static navigationOptions = {
        title: 'Tilføj Ny Profil',
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

    state = { 
        userProfiles: [],
    }

    async getProfiles() {
        try {
            const response = await fetch(PROFILES_URL)

            this.setState({ userProfiles: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    componentDidMount() {
        this.getProfiles();
    }


    render() {
        const { userProfiles } = this.state;
        console.log(userProfiles);
        return(
            <View style={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getProfiles() }/>

                <View style={styles.noBGarea}>
                    <Text style={styles.text}>Hvilken type profil vil du oprette?</Text>
                    <Text style={styles.smallText}>Du kan maksimalt have tilknyttet én profil af hver type til én konto.</Text>

                    <Button 
                        title="Frivillig"
                        buttonStyle={userProfiles.VolunteerID && userProfiles.VolunteerID.length > 0 ? styles.greyButton : styles.blueButton}
                        disabled={userProfiles.VolunteerID && userProfiles.VolunteerID.length > 0}
                        //onPress={() => this.props.navigation.navigate('AddNewProfile')}
                    />

                    <Button 
                        title="Forening"
                        buttonStyle={userProfiles.UnionID && userProfiles.UnionID !== 'null' ? styles.greyButton : styles.blueButton}
                        disabled={userProfiles.UnionID && userProfiles.UnionID.length > 0}
                        onPress={() => this.props.navigation.navigate('UnionEasySignUp')}
                    />

                    <Button 
                        title="Sponsor"
                        buttonStyle={userProfiles.SponsorID && userProfiles.SponsorID.length > 0 ? styles.greyButton : styles.blueButton}
                        disabled={userProfiles.SponsorID && userProfiles.SponsorID.length > 0}
                        onPress={() => this.props.navigation.navigate('SponsorEasySignUp')}
                    />

                </View>
            </View>
        )
    }

}

export default AddNewProfile;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
        height: '100%',
    },
    noBGarea:{
        width: '90%',
        marginBottom: 10,
        marginTop: 10,
    },
    text:{
        color: '#4c4c4c',
        fontSize: 20, 
        textAlign: 'center'
    },
    smallText:{
        color: '#4c4c4c',
        fontSize: 15, 
        textAlign: 'center'
    },
    blueButton:{
        backgroundColor:"#517BBE",
        borderRadius:10,
        width: '100%',
        height: 60,
        marginTop: 20
    },
    greyButton:{
        backgroundColor: "rgba(76,76,76,0.6)",
        borderRadius:10,
        width: '100%',
        height: 60,
        marginTop: 20
    }
})