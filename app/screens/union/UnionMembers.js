import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, TouchableHighlight, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Swipeable from 'react-native-swipeable-row';

const MEMBERS_URL = 'http://kamilla-server.000webhostapp.com/app/unionMembers.php';
const UNIONREQUESTS_URL = 'http://kamilla-server.000webhostapp.com/app/union/unionRequests.php';
const DELETEMEMBER_URL = 'http://kamilla-server.000webhostapp.com/app/union/deleteMember.php';

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
        headerBackTitle: null,
    };

    state = {
        members: [],
        requests: []
    };

    async getMembers() {
        try {
            const response = await fetch(MEMBERS_URL);

            this.setState({ members: await response.json() });
        } catch(error) {
            console.error(error);
        }
    }

    async getNewRequests() {
        try {
            const response = await fetch(UNIONREQUESTS_URL);

            this.setState({ requests: await response.json() });
        } catch(error) {
            console.error(error);
        }
    }

    async deleteMember() {
        try {
            //const id = item.VolunteerID;
            const response = await fetch(UNIONREQUESTS_URL // + '?volunteerID=' + id
            , 
            {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })

            const data = await response.json()
            alert('du har nu slettet et medlem.');
        } catch(error) {
            console.error(error);
            alert('du har ikke slettet et medlem.');
        }
    }

    componentDidMount() {
        //this.getMembers();
        //this.getNewRequests();
    }

    render() {
        const { members, requests } = this.state;

        //const encodedPicture = members.VolunteerPic;

        const rightButtons = [
            <TouchableHighlight 
                style={{backgroundColor: '#E84335', margin: 10, marginLeft: 15, height: '85%', borderRadius: 10, justifyContent: 'center', alignItems: 'left', paddingLeft: 10}} 
                onPress={() => Alert.alert('Bekræft Sletning', 'Er du sikker på at du vil slette dette medlem? Bemærk at medlemmet kun må slettes, hvis de har meldt sig ud af foreningen, eller ikke længere ønsker at bruge Frivilligbankens app. Hvis du er i tvivl kan du læse mere under vores regler og regulationer.', 
                [
                    {
                    text: 'Ja, fortsæt',
                    onPress: () => this.deleteMember(),
                    style: 'default'
                    },
                    {
                    text: 'Nej, luk',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel',
                    },
                ]
                )}>
                <Icon
                      name="delete"
                      type='material'
                      size={30}
                      color="white"
                />
                
            </TouchableHighlight>
          ];

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getMembers() }/>
                <NavigationEvents onWillFocus={ () => this.getNewRequests() }/>

                <View style={styles.topArea}>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Antal Frivillige</Text>
                    </View>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                    <Text style={styles.text}>{members.length}</Text>
                    </View>

                    <TouchableOpacity style={requests.length > 0 ? styles.newRequests : {display: 'none'}} onPress={() => this.props.navigation.navigate('NewRequests')}>
                        <Text style={{color: 'white', fontSize: 12}}>Nye anmodninger: </Text>
                        <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{requests.length}</Text>
                    </TouchableOpacity>
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
                            
                            <Swipeable rightButtons={rightButtons} rightButtonWidth={50}>
                            
                                <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate("VolunteerView", {id: item.volID})}>
                                    <View style={styles.listItem}>
                                        <View style={styles.volunteerPic}>
                                            <Image 
                                                style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                                //source={{uri: item.VolunteerPic}}
                                                source={{uri: `data:image/gif;base64,${item.VolunteerPic}`}}
                                            />
                                        </View>
                                        <View style={{width: '60%', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                                            <Text style={styles.text}>{item.FullName}</Text>
                                        </View>
                                        <View style={{width: '15%', justifyContent: 'center'}}>
                                            <Text style={styles.text}>{item.jobCount}</Text>
                                        </View>
                                        <View style={{width: '15%', justifyContent: 'center'}}>
                                            <Text style={styles.text}>{item.hoursCount}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                
                            </Swipeable>
                            
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