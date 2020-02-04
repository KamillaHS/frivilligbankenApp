import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, AsyncStorage, Image } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const USERSTATUS_URL = 'http://kamilla-server.000webhostapp.com/app/checkUserStatus.php';
const MEMBERJOBS_URL = 'http://kamilla-server.000webhostapp.com/app/userMemberJobs.php';
const NAME_URL = 'http://kamilla-server.000webhostapp.com/app/getVolunteerName.php';

class VolunteerDashScreen extends Component {

    static navigationOptions = {
        title: 'Forside',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerBackTitle: null,
    };

    state = {
        userStatus: [],
        memberJobs: [],
        name: []
    }

    async getUserStatus() {
        AsyncStorage.getItem('UserID')
        const response = await fetch(USERSTATUS_URL, {
            credentials: 'include',
        });
        
        this.setState({ userStatus: await response.json() })
    }

    async getMemberJobs() {
        AsyncStorage.getItem('UserID')
        const response = await fetch(MEMBERJOBS_URL, {
            credentials: 'include',
        });
        
        this.setState({ memberJobs: await response.json() })
    }

    async getName() {
        const response = await fetch(NAME_URL, {
            credentials: 'include',
        });
        
        this.setState({ name: await response.json() })
    }

    componentDidMount() {
        this.getUserStatus();
        this.getMemberJobs();
        this.getName();
    }

    render() {
        const { userStatus } = this.state;
        const { memberJobs } = this.state;
        const { name } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <Text style={[styles.text, {fontSize: 18}]}>Velkommen {name.FullName}</Text>
                </View>

                <View style={{width: '100%'}}>
                    <TouchableOpacity style={userStatus.Interests > 0 ? {display: 'none'} : styles.fillInterest} onPress={() => this.props.navigation.navigate('EditInterests')}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[styles.text, {fontSize: 18}]}>Din Profil er Inaktiv</Text>
                        <Icon
                            name='clear'
                            type='material'
                            size={25}
                            color='#4c4c4c'
                            
                        />
                    </View>
                    <Text style={[styles.text, {fontSize: 15}]}>For at aktivere din profil skal du tilføje dine interesser. Klik her for at tilføje dine interesser.</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.area}>
                    <View style={userStatus.Memberships > 0 ? {display: 'none'} : styles.fillMemberships}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.text}>Aktuelle Jobs</Text>
                            <Text style={styles.text}>Start dato</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.noMemberships}>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>Du er ikke medlem af en forening</Text>
                            <Text style={styles.text}>Du behøber ikke at være medlem af en forening, for at se og søge frivilligt arbejde. Du får dog kun vist aktuelle jobs, hvis du er medlem af en forening. </Text>
                            <Text style={styles.text}>Klik her for at tilmelde dig en forening</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={userStatus.memberships > 0 ? styles.jobList : {display: 'none'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.text}>Aktuelle Jobs</Text>
                            <Text style={styles.text}>Start dato</Text>
                        </View>
                        {
                            memberJobs.map((item, i) => (
                                <TouchableOpacity style={styles.jobItem} key={i} onPress={() => this.props.navigation.navigate('JobDescription', {id: item.JobID})}>
                                    <View style={styles.jobLogo}>
                                        <Image
                                            style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                            source={{uri: item.UnionLogo}}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, maxWidth: '60%' }}>
                                        <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                        <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                        <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                    </View>
                                    <View style={{ width: 75, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                        <Text style={{color: '#4c4c4c' }} >{ moment(item.StartDate).format('L') }</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        <Button 
                            title="Se Alle Jobs"
                            buttonStyle={[styles.greenButton, {marginTop: 10}]}
                            onPress={() => this.props.navigation.navigate('Jobs')}
                        />
                    </View>
                </View>

                <Button
                    title="Press me"
                    buttonStyle={styles.greenButton}
                    onPress={() => Alert.alert('Godkendt', 'Du har nu søgt jobbet xxx')}
                    />

                <Button
                    title="Press me"
                    buttonStyle={styles.blueButton}
                    onPress={() => Alert.alert('Bekræft', 'Er du sikker på at du vil søge jobbet xxx?', 
                    [
                        {
                        text: 'Ja, fortsæt',
                        onPress: () => Alert.alert('Godkendt', 'Du har nu søgt jobbet xxx', {
                            text: 'Gå til Jobhistorik',
                            onPress: () => this.props.navigation.navigate('History'),
                            style: 'cancel'
                        }),
                        style: 'default'
                        },
                        {
                        text: 'Nej, luk',
                        onPress: () => console.log('Cancel pressed'),
                        style: 'cancel',
                        },
                    ],
                    )}
                    />

                <Button 
                    buttonStyle={styles.blueButton} 
                    icon={
                        <Icon
                        name='account-balance'
                        type='material'
                        size={30}
                        color='white'
                        />
                    } 
                />

                <Button 
                    title="Debug" 
                    onPress={() => this.props.navigation.navigate('Debug')}
                />

            </ScrollView>
        )
    }
}

export default VolunteerDashScreen;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
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
    fillInterest:{
        backgroundColor: 'rgba(232,67,53,0.3)',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        marginBottom: 10,
        alignSelf: 'center'
    },
    noMemberships:{
        backgroundColor: 'rgba(232,67,53,0.3)',
        borderRadius: 10,
        width: '100%',
        padding: 10,
        marginTop: 10,
    },
    jobList:{

    },
    jobItem:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 5,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text:{
        color: '#4c4c4c',
        fontSize: 15,
    },
    jobLogo:{
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 25,
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
        
      },
    blueButton:{
        backgroundColor:"#517BBE",
        borderRadius:10,
    },
});