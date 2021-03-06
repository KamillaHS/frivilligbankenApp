import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const JOBS_URL = 'http://kamilla-server.000webhostapp.com/app/jobHistory.php';

class History extends Component {
    static navigationOptions = {
        title: 'Jobhistorik',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
            height: 60
          },
          headerBackTitle: null,
      };

    state = { 
        historyData: [] 
    }

    async getJobs() {
        try {
            const response = await fetch(JOBS_URL)
 
            this.setState({ historyData: await response.json() })

        } catch (error) {
            console.error(error)
        }
    }

    /*
    componentDidMount() {
        this.getJobs();
    }
    */

    render() {
        const { historyData } = this.state;

        //const encodedPicture = historyData.UnionLogo;
        
        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getJobs() }/> 
                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Godkendt</Text>
                        <Text style={{color: '#4c4c4c', marginRight: 0, marginLeft: 'auto', paddingTop: 3}}>Start dato</Text>
                    </View>
                    {
                        historyData.map((item, i) => (
                            <TouchableOpacity style={item.Status == 'Godkendt' ? styles.jobListItemGreen : {display: 'none'}} key={i} onPress={() => this.props.navigation.navigate('JobDescription', {id: item.JobID})}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        //source={{uri: item.UnionLogo}}
                                        source={{uri: `data:image/gif;base64,${item.UnionLogo}`}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, maxWidth: '60%' }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                                <View style={{ width: 75, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                    <Text style={{color: '#4c4c4c' }} >{ moment(item.StartDate).format('L') }</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Afventer</Text>
                        <Text style={{color: '#4c4c4c', marginRight: 0, marginLeft: 'auto', paddingTop: 3}}>Start dato</Text>
                    </View>
                    {
                        historyData.map((item, i) => (
                            <TouchableOpacity style={item.Status == 'Afventer' ? styles.jobListItemYellow : {display: 'none'}} key={i} onPress={() => this.props.navigation.navigate('JobDescription', {id: item.JobID})}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        //source={{uri: item.UnionLogo}}
                                        source={{uri: `data:image/gif;base64,${item.UnionLogo}`}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, maxWidth: '60%' }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                                <View style={{ width: 75, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                    <Text style={{color: '#4c4c4c' }} >{ moment(item.StartDate).format('L') }</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Afvist</Text>
                    </View>
                    {
                        historyData.map((item, i) => (
                            <TouchableOpacity style={item.Status == 'Afvist' ? styles.jobListItemRed : {display: 'none'}} key={i} onPress={() => this.props.navigation.navigate('JobDescription', {id: item.JobID})}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        //source={{uri: item.UnionLogo}}
                                        source={{uri: `data:image/gif;base64,${item.UnionLogo}`}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, maxWidth: '60%' }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Afviklet</Text>
                        <Text style={{color: '#4c4c4c', marginRight: 0, marginLeft: 'auto', paddingTop: 3}}>Slut dato</Text>
                    </View>
                    {
                        historyData.map((item, i) => (
                            <TouchableOpacity style={item.Status == 'Afsluttet' ? styles.jobListItemGrey : {display: 'none'}} key={i} onPress={() => this.props.navigation.navigate('JobDescription', {id: item.JobID})}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        //source={{uri: item.UnionLogo}}
                                        source={{uri: `data:image/gif;base64,${item.UnionLogo}`}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, maxWidth: '60%' }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                                <View style={{ width: 75, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                    <Text style={{color: '#4c4c4c' }} >{ moment(item.StartDate).format('L') }</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default History;

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
        marginBottom: 10,
    },
    jobListItemGreen:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(49,168,83,0.5)',
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    jobListItemYellow:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,128,0,0.5)',
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10, 
        alignItems: 'center',
    },
    jobListItemRed:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(232,67,53,0.5)',
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    jobListItemGrey:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(76,76,76,0.4)',
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    jobLogo:{
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 25,
    }
});