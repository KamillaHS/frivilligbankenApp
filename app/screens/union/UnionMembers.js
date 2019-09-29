import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';

const MEMBERS_URL = 'http://192.168.0.22:8080/frivilligbanken/app/unionMembers.php';

class UnionMembers extends Component {

    static navigationOptions = {
        title: 'Frivillige Medlemmer',
        headerTitleStyle: {
            color: 'white',
          },
        headerStyle: {
            backgroundColor: '#517BBE',
        },
        headerTintColor: 'white',
    };

    state = {
        members: []
    };

    async getMembers() {
        try {
            const response = await fetch(MEMBERS_URL);

            this.setState({ members: await response.json() })
        } catch(error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getMembers();
    }

    render() {
        const { members } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.topArea}>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Antal Frivillige</Text>
                    </View>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>0</Text>
                    </View>
                </View>

                <View style={styles.area}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '70%'}}>
                            <Text style={styles.text}>Frivillig</Text>
                        </View>
                        <View style={{width: '15%'}}>
                            <Text style={styles.text}>Jobs</Text>
                        </View>
                        <View style={{width: '15%'}}>
                            <Text style={styles.text}>Timer</Text>
                        </View>
                    </View>

                    {
                        members.map((item, i) => (
                            <TouchableWithoutFeedback key={i}>
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
                                        <Text style={styles.text}>0</Text>
                                    </View>
                                    <View style={{width: '15%', justifyContent: 'center'}}>
                                        <Text style={styles.text}>0</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default UnionMembers;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    topArea:{
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
    greenButton: {
        backgroundColor:"#30A451",
        borderRadius:10,
        width: 100,
    },
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
        width: '100%',
    },
});