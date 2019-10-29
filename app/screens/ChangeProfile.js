import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';

const PROFILES_URL = 'http://kamilla-test.000webhostapp.com/app/getUserProfiles.php';

class ChangeProfile extends Component {

    static navigationOptions = {
        title: 'Skift Profil',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
    };

    state = { 
        userProfiles: [],
        currentID: []
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
        let type = this.props.navigation.getParam('type');

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <Text style={styles.title}>Nuværende Profil</Text>
                    <TouchableOpacity style={styles.profileLine} onPress={() => this.props.navigation.navigate('Home', {id: userProfiles.VolunteerID})}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Frivillig</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>Navn Navnesen</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.title}>Andre Profiler</Text>
                    <TouchableOpacity style={styles.profileLine} onPress={() => this.props.navigation.navigate('UnionHome', {id: userProfiles.UnionID})}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Forening</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>Forening Navn</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileLine} onPress={() => this.props.navigation.navigate('SponsorHome', {id: userProfiles.SponsorID})}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Sponsor</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>Sponsor Navn</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.noBGarea}>
                    <Button 
                        title="Tilføj Ny Profil"
                        buttonStyle={styles.greenButton}
                    />
                </View>
            </ScrollView>
        )
    }

}

export default ChangeProfile;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '90%',
    },
    noBGarea:{
        width: '90%',
        marginBottom: 10,
        marginTop: 10,
    },
    title:{
        fontSize: 18,
        color: '#4c4c4c',
        fontWeight: 'bold',
        margin: 10
    },
    text:{
        fontSize: 15,
        color: '#4c4c4c',
    },
    profileLine: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginTop: 5,
        marginBottom: 10,
    },
    lightTitle:{
        width: '30%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    darkName:{
        width: '70%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
        width: '100%',
    },
})