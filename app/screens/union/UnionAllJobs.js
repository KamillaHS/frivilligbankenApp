import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableWithoutFeedback, Image, TextInput } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const JOBS_URL = 'http://kamilla-server.000webhostapp.com/app/allJobs.php';

class UnionAllJobs extends Component {

    static navigationOptions = {
        title: 'Alle Jobs',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
            height: 60
          },
          headerTintColor: 'white',
      };

    state = { 
        jobsData: [] 
    }

    async getJobs() {
        try {
            const response = await fetch(JOBS_URL)

            this.setState({ jobsData: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        //this.getJobs();
    }

    render() {
        const { jobsData } = this.state;

        //const encodedPicture = jobsData.UnionLogo;

        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getJobs() }/>
                {/*
                <View style={styles.noBGarea}>
                    <Button
                            onPress={() => Alert.alert('Manglende side', 'Du kan endnu ikke vælge dette filter')}
                            buttonStyle={styles.filterButton}
                            icon={
                                <Icon
                                name="account-balance"
                                type='material'
                                size={30}
                                color="white"
                                />
                            }
                        />

                        <Button
                            onPress={() => Alert.alert('Manglende side', 'Du kan endnu ikke vælge dette filter')}
                            buttonStyle={styles.filterButton}
                            icon={
                                <Icon
                                name="list"
                                type='material'
                                size={30}
                                color="white"
                                />
                            }
                        />

                        <Button
                            onPress={() => Alert.alert('Manglende side', 'Du kan endnu ikke vælge dette filter')}
                            buttonStyle={styles.filterButton}
                            icon={
                                <Icon
                                name="place"
                                type='material'
                                size={30}
                                color="white"
                                />
                            }
                        />
                </View>

                <View style={styles.noBGarea}>
                    <View style={styles.searchField}>
                        <Icon 
                            name="search"
                            type='material'
                            size={30}
                            color="#4c4c4c"
                        />
                        <TextInput  
                            placeholder={'Søg'}
                            placeholderTextColor='#4c4c4c'
                            style={styles.searchInput}
                        />
                    </View>
                </View>
                */}

                <View style={ styles.area }>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>
                        <Text style={styles.text}>Alle Jobs</Text>
                        <Text style={styles.text}>Start Dato</Text>
                    </View>

                    {
                        jobsData.map((item, key) => (
                            <TouchableWithoutFeedback key={key.JobID} onPress={() => this.props.navigation.navigate('UnionJobDescription', {id: item.JobID})}>
                                <View style={styles.jobListItem}>
                                    <View style={styles.jobLogo}>
                                        <Image
                                            style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                            //source={{uri: item.UnionLogo}}
                                            source={{uri: `data:image/gif;base64,${item.UnionLogo}`}}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                        <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    </View>
                                    <View style={{ width: 80, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                        <Text style={{color: '#4c4c4c' }} >{moment(item.StartDate).format('L')}</Text>
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

export default UnionAllJobs;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        //backgroundColor: '#E7EBF0',
    },
    noBGarea:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '90%',
    },
    filterButton:{
        backgroundColor:"#517BBE",
        borderColor: 'white',
        borderWidth: 2,
        borderRadius:10,
        height: 60,
        width: '61%'
    },
    searchField: {
        flex:1,
        flexDirection: 'row',
        width: '100%',
        height: 40,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#4c4c4c",
        borderRadius: 10,
    },
    jobListItem:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
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
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
    },
});