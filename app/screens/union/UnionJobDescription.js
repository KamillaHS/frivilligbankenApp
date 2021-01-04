import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";
import { NavigationEvents } from 'react-navigation';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const JOB_URL = 'http://kamilla-server.000webhostapp.com/app/union/jobInfo.php';
const APPLICANTS_URL = 'http://kamilla-server.000webhostapp.com/app/union/getJobApplicants.php';
const CONFIRMED_URL = 'http://kamilla-server.000webhostapp.com/app/union/getConfirmed.php';
const ADDHOURS_URL = 'http://kamilla-server.000webhostapp.com/app/union/addHours.php';

class UnionJobDescription extends Component {

    static navigationOptions = {
        title: 'Job Beskrivelse',
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
        jobData: [],
        applicants: [],
        confirmed: [],
        hoursValue: 0,
    }

    async getJob() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(JOB_URL + '?id=' + id)

            this.setState({ jobData: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async getApplicants() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(APPLICANTS_URL + '?id=' + id)

            this.setState({ applicants: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async getConfirmed() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(CONFIRMED_URL + '?id=' + id)

            this.setState({ confirmed: await response.json() })
        
        } catch (error) {
            console.error(error)  
        }
    }

    addToNum = (index, value) => {
        const {confirmed} = this.state;
        confirmed.splice(index, 1, {... confirmed[index], totalHours: value});
        this.setState({confirmed});
    }

    removeFromNum = () => {
        if(this.state.hoursValue > 0) {
            this.setState({ hoursValue: this.state.hoursValue - 1 });
        } else {
            Alert.alert('Ikke gyldig handling', 'Du kan ikke tildele et negativt antal timer.')
        }
    }

    async addHours(volID, jobID, hoursValue) {
        //const { hoursValue } = this.state;

        if(hoursValue > 0) {
            const response = await fetch(ADDHOURS_URL + '?volID=' + volID + '&jobID=' + jobID, {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ hoursValue }),
            })
    
            const data = await response.text();
            //this.props.navigation.navigate('UnionJobDescription');
        } else {
            Alert.alert('Advarsel', 'Indtast venligst et gyldigt antal timer')
        }
    }

    /*
    async apply() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(APPLY_URL + '?id=' + id, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })

        const data = await response.json()
    }
*/

    componentDidMount() {
        this.getJob();
        //this.getApplicants();
    }

    

    render() {
        const { jobData, applicants, confirmed } = this.state;
        let { hoursValue } = this.state;
        const route = this.props.navigation.getParam('route');

        const encodedJobPicture = jobData.UnionLogo;
        //const encodedVolPicture = applicants.VolunteerPic;
        //const encodedVol2Picture = confirmed.VolunteerPic;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getApplicants() }/>
                <NavigationEvents onWillFocus={ () => this.getConfirmed() }/>
                
                <View style={styles.area}> 
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.jobLogo}>
                            <Image
                                style={{flex:1, width: undefined, height: undefined, borderRadius: 50}}
                                //source={{uri: jobData.UnionLogo}}
                                source={{uri: `data:image/gif;base64,${encodedJobPicture}`}}
                            />
                        </View>
                        <View style={{ padding: 10, maxWidth: '70%'}}>
                            <Text style={{fontSize: 20, color: '#4c4c4c'}}>{jobData.Title}</Text>
                            <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                            <Text style={{fontSize: 15, color: '#4c4c4c'}}>{jobData.AreaName}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.infoBox}>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Udbyder</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{jobData.UnionName}</Text></View>
                        </View>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Startdato</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{moment(jobData.StartDate).format('L')}</Text></View>
                        </View>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Slutdato</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{moment(jobData.EndDate).format('L')}</Text></View>
                        </View>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Kategori</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{jobData.CategoryName}</Text></View>
                        </View>
                        <Text style={styles.titles}>Beskrivelse</Text>
                        <Text style={styles.values}>{jobData.Description}</Text>
                        <Text style={styles.titles}>Krav</Text>
                        <Text style={styles.values}>{jobData.Requirements}</Text>
                    </View>
                </View>

                <View style={route == 'application' ? {marginTop: 20, width: '100%', alignItems: 'center'} : {display: 'none'}}>
                    <View style={jobData.UnionID == jobData.currentUnionID ? styles.area : {display: 'none'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.text}>Ansøgere</Text>
                            <Text style={styles.text}>Status</Text>
                        </View>

                        <View style={applicants.length < 1 ? {display: 'flex'} : {display: 'none'}}>
                            <Text>Der er endnu ingen ansøgere til dette job.</Text>
                        </View>

                        <View style={applicants.length > 0 ? {display: 'flex'} : {display: 'none'}}>
                            {
                                applicants.map((item, key) => (
                                    <TouchableOpacity key={key.VolunteerID} onPress={() => this.props.navigation.navigate("VolunteerView", {id: item.VolunteerID, id2: jobData.JobID})}>
                                        <View style={item.Status == 'Godkendt' ? styles.confirmed : {display: 'none'}}>

                                            <View style={styles.profileImage}>
                                                <Image
                                                    style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                                    //source={{uri: item.VolunteerPic}}
                                                    source={{uri: `data:image/gif;base64,${item.VolunteerPic}`}}
                                                />
                                            </View>
                                            <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                                <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.FullName }</Text>
                                            </View>
                                            <View style={{ width: 35, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                                <View style={{height: 35, width: 35, backgroundColor: '#30A451', borderRadius: 20, padding: 2}}>
                                                    <Icon
                                                        name="done"
                                                        type='material'
                                                        size={30}
                                                        color="white"
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                        <View style={item.Status == 'Afventer' ? styles.awaiting : {display: 'none'}}>
                                            
                                            <View style={styles.profileImage}>
                                                <Image
                                                    style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                                    //source={{uri: item.VolunteerPic}}
                                                    source={{uri: `data:image/gif;base64,${item.VolunteerPic}`}}
                                                />
                                            </View>
                                            <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                                <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.FullName }</Text>
                                            </View>
                                            <View style={{ width: 35, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                                <View style={{height: 35, width: 35, backgroundColor: '#FF8000', borderRadius: 20}}>
                                                    <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>?</Text>
                                                </View>
                                            </View>

                                        </View>

                                        <View style={item.Status == 'Afvist' ? styles.denied : {display: 'none'}}>

                                            <View style={styles.profileImage}>
                                                <Image
                                                    style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                                    //source={{uri: item.VolunteerPic}}
                                                    source={{uri: `data:image/gif;base64,${item.VolunteerPic}`}}
                                                />
                                            </View>
                                            <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                                <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.FullName }</Text>
                                            </View>
                                            <View style={{ width: 35, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                                <View style={{height: 35, width: 35, backgroundColor: '#E84335', borderRadius: 20, padding: 2}}>
                                                    <Icon
                                                        name="close"
                                                        type='material'
                                                        size={30}
                                                        color="white"
                                                    />
                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        
                    </View>
                </View>

                <View style={route == 'hours' ? {marginTop: 20, width: '100%', alignItems: 'center'} : {display: 'none'}}>
                    <View style={jobData.UnionID == jobData.currentUnionID ? styles.area : {display: 'none'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.text}>Frivillig</Text>
                            <Text style={styles.text}>Tildelte Timer</Text>
                        </View>
                        {
                            confirmed.map((item, i) => (
                                <View key={i.JobID}>
                                    <View style={styles.alreadyConfirmed}>
                                        <View style={styles.profileImage}>
                                            <Image
                                                style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                                //source={{uri: item.VolunteerPic}}
                                                source={{uri: `data:image/gif;base64,${item.VolunteerPic}`}}
                                            />
                                        </View>
                                        <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                            <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 15 }}>{ item.FullName }</Text>
                                        </View>
                                        <View style={{ width: 35, justifyContent: 'center', marginRight: 0, marginLeft: 'auto', paddingTop: 15 }}>
                                            <Text style={[styles.titles, {fontSize: 18}]}>{item.Hours}</Text>
                                        </View>

                                        <View style={styles.addHoursBox}> 
                                            <TouchableOpacity style={styles.addOrRemove} onPress={() =>{const val = item.totalHours || 0
                                                                                                        if(val>0) {this.addToNum(i, val-1)}
                                                                                                        }}>
                                                <Text style={styles.addOrRemoveText}>-</Text>
                                            </TouchableOpacity>
                                            <TextInput 
                                                value={String(item.totalHours || 0)}
                                                //onChangeText={(hoursValue) => this.setState({hoursValue})}
                                                //placeholder={'0'}
                                                placeholderTextColor='#4c4c4c'
                                                keyboardType='numeric'
                                                style={styles.hoursNum}
                                            />
                                            <TouchableOpacity style={styles.addOrRemove} onPress={() =>{const val = item.totalHours || 0
                                                                                                        this.addToNum(i, val+1) 
                                                                                                        }}>
                                            <Text style={styles.addOrRemoveText}>+</Text>
                                            </TouchableOpacity>
                                            <Button 
                                                buttonStyle={[styles.greenButton, {width: 'auto'}]}
                                                title='Godkend'
                                                onPress={() => Alert.alert('Bekræft', 'Er du sikker på at du vil give ' + item.FullName + ' ' + item.totalHours + ' timer?', [
                                                    {
                                                        text: 'Ja, fortsæt',
                                                        onPress: () => {
                                                            this.addHours(item.VolunteerID, item.JobID, item.totalHours), 
                                                            this.setState({jobData: [], confirmed: [], hoursValue: 0}), 
                                                            this.getJob(),
                                                            this.getConfirmed(),
                                                            this.forceUpdate()},
                                                        style: 'default'
                                                        
                                                    },
                                                    {
                                                        text: 'Nej, luk',
                                                        onPress: () => { console.log('nothing happened, and that was intented') },
                                                        style: 'cancel',
                                                    },
                                                ])
                                                } 
                                                
                                            />
                                        </View>

                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default UnionJobDescription;

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
        padding: 10,
    },
    infoBox:{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    jobLogo:{
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 50,
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
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
        width: '100%',
    },
    confirmed:{
        flex:1,
        flexDirection: 'row',
        height: 70,
        backgroundColor:"rgba(48, 164, 81, 0.5)",
        padding: 10,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
    },
    awaiting:{
        flex:1,
        flexDirection: 'row',
        height: 70,
        backgroundColor:"rgba(255, 128, 0, 0.5)",
        padding: 10,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
    },
    denied:{
        flex:1,
        flexDirection: 'row',
        height: 70,
        backgroundColor:"rgba(232, 67, 53, 0.5)",
        padding: 10,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
    },
    alreadyConfirmed:{
        flex:1,
        flexDirection: 'row',
        backgroundColor:"rgba(255,255,255,0.3)",
        padding: 10,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    addHoursBox:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 10,
    },
    hoursNum:{
        backgroundColor: 'white',
        width: '30%',
        height: 40,
        textAlign: 'center',
    },
    addOrRemove:{
        height: 40,
        width: '20%'
    },
    addOrRemoveText:{
        color: '#4c4c4c',
        fontSize: 40,
        textAlign: 'center',
        marginTop: -8,
    },
    profileImage:{
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 25,
    },
    confirmedButton:{
        backgroundColor:"rgba(48, 164, 81, 0.5)",
        borderRadius:10,
        width: '100%',
    },
    waitingButton:{
        backgroundColor:"rgba(255, 128, 0, 0.5)",
        borderRadius:10,
        width: '100%',
    },
    rejectedButton:{
        backgroundColor:"rgba(232, 67, 53, 0.5)",
        borderRadius:10,
        width: '100%',
    },
    endedButton:{
        backgroundColor:"grey",
        borderRadius:10,
        width: '100%',
    }
});