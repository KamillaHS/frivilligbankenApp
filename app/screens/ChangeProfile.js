import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';

const PROFILES_URL = 'http://kamilla-server.000webhostapp.com/app/getUserProfiles.php';
const CURRENT_URL = 'http://kamilla-server.000webhostapp.com/app/getCurrentProfile.php';

class ChangeProfile extends Component {

    static navigationOptions = {
        title: 'Skift Profil',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
            height: 60
          },
          headerBackTitle: null,
          headerTintColor: 'white',
    };

    state = { 
        userProfiles: [],
        currentProfile: [],
    }

    async getProfiles() {
        try {
            const response = await fetch(PROFILES_URL)

            this.setState({ userProfiles: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async getCurrentProfile() {
        try {
            const response = await fetch(CURRENT_URL)

            this.setState({ currentProfile: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getProfiles();
        this.getCurrentProfile();
    }


    render() {
        const { userProfiles, currentProfile } = this.state;
        let type = this.props.navigation.getParam('type');
        console.log(userProfiles);
        console.log(currentProfile);

        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <Text style={styles.title}>Nuværende Profil</Text>

                    <TouchableOpacity style={currentProfile.current == 'volunteer' ? styles.profileLine : {display: 'none'}} onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Frivillig</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>{currentProfile.FullName}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={currentProfile.current == 'union' ? styles.profileLine : {display: 'none'}} onPress={() => this.props.navigation.navigate('UnionHome')}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Forening</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>{currentProfile.UnionName}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={currentProfile.current == 'sponsor' ? styles.profileLine : {display: 'none'}} onPress={() => this.props.navigation.navigate('SponsorHome')}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Sponsor</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>{currentProfile.SponsorName}</Text>
                        </View>
                    </TouchableOpacity>



                    <Text style={styles.title}>Andre Profiler</Text>

                    <TouchableOpacity style={currentProfile.current != 'volunteer' && userProfiles.VolunteerID && userProfiles.VolunteerID.length > 0 ? styles.profileLine : {display: 'none'}} onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Frivillig</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>{userProfiles.FullName}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={currentProfile.current != 'union' && userProfiles.UnionID && userProfiles.UnionID.length > 0 ? styles.profileLine : {display: 'none'}} onPress={() => this.props.navigation.navigate('UnionHome')}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Forening</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>{userProfiles.UnionName}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={currentProfile.current != 'sponsor' && userProfiles.SponsorID && userProfiles.SponsorID.length > 0 ? styles.profileLine : {display: 'none'}} onPress={() => this.props.navigation.navigate('SponsorHome')}>
                        <View style={styles.lightTitle}>
                            <Text style={styles.text}>Sponsor</Text>
                        </View>
                        <View style={styles.darkName}>
                            <Text style={styles.text}>{userProfiles.SponsorName}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={!userProfiles.UnionID && !userProfiles.SponsorID ? {marginLeft: 10, marginRight: 10} : {display: 'none'}}>
                        <Text>Der findes ingen andre profiler for din bruger. Hvis du ønsker at oprette en profil som en forening eller som en sponsor, kan du gøre dette ved at trykke på knappen "Tilføj Ny Profil" nedenfor.</Text>
                    </View>

                </View>
                <View style={styles.noBGarea}>
                    <Button 
                        title="Tilføj Ny Profil"
                        buttonStyle={styles.greenButton}
                        onPress={() => this.props.navigation.navigate('AddNewProfile')}
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
        //backgroundColor: '#E7EBF0',
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