import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, AsyncStorage, ScrollView, Image, TouchableOpacity, ImageBackground, Modal, TouchableHighlight, Platform } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');


const VOLUNTEER_URL = 'http://kamilla-server.000webhostapp.com/app/union/getVolInfo.php';
const CURRENTUNIONID_URL = 'http://kamilla-server.000webhostapp.com/app/union/getUnionID.php';
const USERINTERESTS_URL = 'http://kamilla-server.000webhostapp.com/app/union/getVolInts.php';
const USERMEMBERSHIPS_URL = 'http://kamilla-server.000webhostapp.com/app/union/getVolMemberships.php';
const LATESTJOBS_URL = 'http://kamilla-server.000webhostapp.com/app/union/getVolJobs.php';
const RESPONSE_URL = 'http://kamilla-server.000webhostapp.com/app/union/requestResponse.php';
const VOLJOBAPPLICATION_URL = 'http://kamilla-server.000webhostapp.com/app/union/volJobApplicationMatch.php';
const JOB_URL = 'http://kamilla-server.000webhostapp.com/app/union/jobInfo.php';
const APPLICATIONRESPONSE_URL = 'http://kamilla-server.000webhostapp.com/app/union/applicationResponse.php';

class VolunteerView extends Component {
    static navigationOptions = {
        title: 'Frivillig',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
    };

    state = { 
      userData: [],
      currentUnionID: '',
      userInterests: [],
      userMemberships: [],
      jobs: [],
      jobApplicationStatus: [],
      jobData: [],

      modalVisible: false,
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    async getUser() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(VOLUNTEER_URL + '?id=' + id, {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
    
            this.setState({ userData: await response.json() })
          
        } 
        catch (error) {
            console.error(error)  
        }
    }

    async getUserInterests() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(USERINTERESTS_URL + '?id=' + id);

      this.setState({ userInterests: await response.json() })
      //console.log( await response.text() );
    }


    async getUserMemberships() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(USERMEMBERSHIPS_URL + '?id=' + id);

        this.setState({ userMemberships: await response.json() });
        //console.log( await response.text() );
    }

    async getCurrentUnionID() {
        const response = await fetch(CURRENTUNIONID_URL);

        this.setState({ currentUnionID: await response.json() });
        //console.log( await response.text() );
    }


    async getLatestJobs() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(LATESTJOBS_URL + '?id=' + id)

        this.setState({ jobs: await response.json() });
        //console.log( await response.text() );
    }


    async confirmVol() {
        const id = this.props.navigation.getParam('id');
        const responseType = 'confirm';

        const response = await fetch(RESPONSE_URL + '?id=' + id, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ responseType }),
        })

        const data = await response.json();
        this.props.navigation.navigate('NewRequests');
    }

    async denyVol() {
        const id = this.props.navigation.getParam('id');
        const responseType = 'deny';

        const response = await fetch(RESPONSE_URL + '?id=' + id, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ responseType }),
        })

        const data = alert(await response.text());
        this.props.navigation.navigate('NewRequests');
    }

    async getJobApplicationStatus() {
        const volID = this.props.navigation.getParam('id');
        const jobID = this.props.navigation.getParam('id2');

        const response = await fetch(VOLJOBAPPLICATION_URL + '?volID=' + volID + '&jobID=' + jobID)

        this.setState({ jobApplicationStatus: await response.json() });
    }

    async getJob() {
        try {
            const jobID = this.props.navigation.getParam('id2');
            const response = await fetch(JOB_URL + '?id=' + jobID)

            this.setState({ jobData: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async confirmVolJob() {
        const volID = this.props.navigation.getParam('id');
        const jobID = this.props.navigation.getParam('id2');
        const responseType = 'confirm';

        const response = await fetch(APPLICATIONRESPONSE_URL + '?volID=' + volID + '&jobID' + jobID, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ responseType, jobID }),
        })

        const data = await response.json();
        this.props.navigation.navigate('UnionJobDescription', {id: jobID});
    }

    async denyVolJob() {
        const volID = this.props.navigation.getParam('id');
        const jobID = this.props.navigation.getParam('id2');
        const responseType = 'deny';

        const response = await fetch(APPLICATIONRESPONSE_URL + '?volID=' + volID + '&jobID' + jobID, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ responseType }),
        })

        const data = await response.text();
        this.props.navigation.navigate('UnionJobDescription', {id: jobID});
    }


    componentDidMount() {
        this.getUser();
        this.getCurrentUnionID();
        this.getUserInterests();
        this.getUserMemberships();
        this.getLatestJobs();
        this.getJobApplicationStatus();
        this.getJob()
    }
    
    render() {
        const { userData, currentUnionID, userInterests, userMemberships, jobs, jobApplicationStatus, jobData } = this.state;
        const id = this.props.navigation.getParam('id');

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}>
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{flex:1, width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50, backgroundColor: 'white'}}
                      source={{uri: userData.VolunteerPic}}
                    />
                    <Text style={{fontSize: 20, paddingLeft: 10, color: '#4c4c4c'}}>{userData.FullName}</Text>
                  </View>

                  <View style={styles.infoBox}>
                    <View style={styles.rows}>
                      <View style={{width: '50%'}}><Text style={styles.titles}>Fødselsdato</Text></View>
                      <View style={{width: '50%'}}><Text style={styles.values}>{moment(userData.DoB).format('L')}</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '50%'}}><Text style={styles.titles}>By</Text></View>
                      <View style={{width: '50%'}}><Text style={styles.values}>{userData.PostalCode}, {userData.City}</Text></View>
                    </View>
                    <Text style={styles.titles}>Beskrivelse</Text>
                    <Text style={styles.values}>{userData.Description}</Text>
                    <Button 
                      buttonStyle={styles.blueButton}
                      title='CV'
                      onPress={() => { this.setModalVisible(true) }}
                    />

                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.8)', marginBottom: 0}}>
                            <View>
                                <TouchableHighlight
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <View style={{marginRight: 10, marginLeft: 'auto', marginTop: 10}}>
                                      <Icon
                                        name="close"
                                        type='material'
                                        size={30}
                                        color="white"
                                      />
                                    </View>
                                </TouchableHighlight>

                                <View style={{width: '100%', height: '95%'}}>
                                  <Image source={{uri: userData.CV}} style={{position: 'relative', width: '100%', height: '100%'}} resizeMode='contain' />
                                </View>
                            </View>
                        </View>
                    </Modal>

                  </View>
                </View>

                {
                    userMemberships.map((item, i) => (
                        <View key={i.UnionID} style={item.UnionID == currentUnionID && item.isConfirmed != 1 ? styles.noBGarea : {display: 'none'} }>
                            <Text style={styles.text}>{userData.FullName} har ansøgt om at være medlem af din forening. Vil du godkende at vedkommende er medlem af din forening?</Text>
                        </View>
                        
                    ))
                }

                {
                    userMemberships.map((item, i) => (
                        <View key={i.UnionID} style={item.UnionID == currentUnionID && item.isConfirmed != 1 ? styles.noBGarea : {display: 'none'} }>
                            <Button 
                                buttonStyle={styles.greenButton}
                                title='Godkend'
                                onPress={() => { this.confirmVol() }}
                            />
                            <Button 
                                buttonStyle={styles.redButton}
                                title='Afvis'
                                onPress={() => { this.denyVol() }}
                            />
                        </View> 
                    ))
                }



                <View style={jobApplicationStatus.Status == 'Afventer' ? [styles.noBGarea, {flexDirection: 'column'}] : {display: 'none'}}>
                    <Text>Vil du godkende {userData.FullName} til jobbet som {jobData.Title}?</Text>

                    <View style={[styles.noBGarea, {width: '100%', padding: 0, paddingTop: 10}]}>
                        <Button 
                            buttonStyle={styles.greenButton}
                            title='Godkend'
                            onPress={() => { this.confirmVolJob() }}
                        />
                        <Button 
                                buttonStyle={styles.redButton}
                                title='Afvis'
                                onPress={() => { this.denyVolJob() }}
                            />
                    </View> 
                </View>



		        <View style={styles.area}>
                    <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Interesser</Text>
                    <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                      userInterests.map((item, i) => (
                        <View style={i % 4 == 1 || i % 4 == 2 ? styles.interestDark : styles.interestLight} key={i}>
                          <Text style={{fontSize: 16, color: '#4c4c4c'}}>{item.InterestName}</Text>
                        </View>
                      ))
                      }
                    </View>
                </View>

                <View style={styles.area}>
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Medlemskaber</Text>
                  <View>
                    {
                    userMemberships.map((item, i) => (
                        <View style={i % 2 == 0 ? styles.unionDark : styles.unionLight} key={i}>
                          <Text style={{fontSize: 16, color: '#4c4c4c'}}>{item.UnionName}</Text>
                        </View>
                    ))
                    }
                  </View>
                </View>

                <View style={styles.area}>
                    <Text style={{fontSize: 18, color: '#4c4c4c'}}>Seneste Jobs</Text>
                    {
                    jobs.map((item, i) => (
                        <TouchableOpacity key={i.JobID} onPress={() => this.props.navigation.navigate('UnionJobDescription', {id: item.JobID})}>
                                <View style={styles.jobListItem}>
                                    <View style={styles.jobLogo}>
                                        <Image
                                            style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                            source={{uri: item.UnionLogo}}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                        <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                    </View>
                                    <View style={{ width: 80, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                        <Text style={{color: '#4c4c4c' }} >{item.EndDate}</Text>
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

export default VolunteerView;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    noBGarea:{
        flex:1,
        flexDirection: 'row',
        width: '90%',
        marginBottom: 10,
    },
    smallArea:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '30%',
        padding: 10,
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '90%',
        padding: 10,
        marginBottom: 10
    },
    infoBox:{
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
    },
    jobListItem:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
    },
    jobLogo:{
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 25,
    },
    rows:{
      flex:1, 
      flexDirection: 'row', 
      marginBottom: 3
    },
    titles: {
      fontSize: 16,
      color: '#4c4c4c'
    },
    values:{
      fontSize: 16,
      color: 'rgba(76,76,76,0.5)'
    },
    blueButton: {
      backgroundColor:"#517BBE",
      borderRadius:10,
      width: '100%',
      marginTop: 10,
    },
    greenButton: {
        backgroundColor:"#31A853",
        borderRadius:10,
        width: '85%',
    },
    redButton: {
        backgroundColor:"#E84335",
        borderRadius:10,
        width: '85%',
    },
    interestDark:{
      width: '50%',
      backgroundColor: 'rgba(255,255,255,0.3)',
      padding: 10,
    },
    interestLight:{
      width: '50%',
      backgroundColor: 'rgba(255,255,255,0.6)',
      padding: 10,
    },
    unionDark:{
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.3)',
      padding: 10,
    },
    unionLight:{
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.6)',
      padding: 10,
    },
    giftcard: {
      height: 100,
      width: '45%',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#4c4c4c',
      borderRadius: 10,
      marginBottom: 10,
    },
    cardImg:{
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: 10,
    },
    cardInfo:{
      height: 25,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderBottomLeftRadius: 9,
      borderBottomRightRadius: 9,
      marginBottom: 0,
      marginTop: 'auto',
      padding: 5,
  }
});