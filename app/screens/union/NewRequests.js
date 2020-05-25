import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
//import { TouchableOpacity } from "react-native-gesture-handler";

const UNIONREQUESTS_URL = 'http://kamilla-server.000webhostapp.com/app/union/unionRequests.php'

class NewRequests extends Component {

    static navigationOptions = {
        title: 'Frivillige Medlemmer',
        headerTitleStyle: {
            color: 'white',
          },
        headerStyle: {
            backgroundColor: '#517BBE',
        },
        headerTintColor: 'white',
        headerBackTitle: null,
    };

    state = {
        requests: []
    };

    async getNewRequests() {
        try {
            const response = await fetch(UNIONREQUESTS_URL);

            this.setState({ requests: await response.json() });
        } catch(error) {
            console.error(error);
        }
    }

    componentDidMount() {
        //this.getNewRequests();
    }

    render() {
        const { requests } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getNewRequests() }/>

                <View style={styles.area}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '70%'}}>
                            <Text style={styles.text}>Frivillig</Text>
                        </View>
                        <View style={{width: '30%'}}>
                            <Text style={styles.text}>Postnummer</Text>
                        </View>
                    </View>

                    <View style={requests < 1 ? {marginTop: 10} : {display: 'none' }}>
                        <Text style={styles.text}>Der er ingen nye anmodninger</Text>
                    </View>

                    {
                        requests.map((item, i) => (
                            <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('VolunteerView', {id: item.VolunteerID})}>
                                <View style={styles.listItem}>
                                    <View style={styles.volunteerPic}>
                                        <Image 
                                            style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                            source={{uri: item.VolunteerPic}}
                                        />
                                    </View>
                                    <View style={{width: '60%', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                                        <Text style={styles.text}>{item.FullName}</Text>
                                    </View>
                                    <View style={{width: '15%', justifyContent: 'center'}}>
                                        <Text style={styles.text}>{item.PostalCode}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default NewRequests;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    topArea:{
        position: 'relative',
        width: '90%', 
        flex: 1, 
        flexDirection: 'row', 
        borderRadius: 10, 
        backgroundColor: '#517BBE',
        marginBottom: 10,
    },
    text:{
        fontSize: 15,
        color: '#4c4c4c'
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        marginBottom: 10
    },
    text:{
        color: '#4c4c4c',
    },
    noBGarea:{
        width: '90%',
        marginBottom: 10
    },
    listItem:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
    },
    volunteerPic:{
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 25,
    },
    newRequests:{
        flex: 1, 
        flexDirection: 'row', 
        position: 'absolute',
        marginTop: -15,
        right: -5,
        backgroundColor: '#E84335', 
        padding: 10, 
        borderRadius: 50
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
        width: 100,
    },
    blueButton:{
        backgroundColor:"#517BBE",
        borderRadius:10,
        width: '100%',
    },
});