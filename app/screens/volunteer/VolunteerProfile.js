import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, AsyncStorage, ScrollView, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Button, Icon } from 'react-native-elements';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');


const VOLUNTEER_URL = 'http://kamilla-test.000webhostapp.com/app/volunteerInfo.php';
const USERINTERESTS_URL = 'http://kamilla-test.000webhostapp.com/app/volunteerInterests.php';
const USERMEMBERSHIPS_URL = 'http://kamilla-test.000webhostapp.com/app/userMemberships.php';
const USREGIFTCARDS_URL = 'http://kamilla-test.000webhostapp.com/app/userGiftcards.php';

class VolunteerProfile extends Component {
    static navigationOptions =  ({ navigation }) => { 
      return {
        title: 'Frivillig Profil',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => navigation.navigate('VolunteerSettings')}
              icon={
                <Icon
                  name="settings"
                  type='material'
                  size={30}
                  color="white"
                />
              }
              type="clear"
            />
          ),
    }};

    state = { 
        userData: [],
        userInterests: [],
        userMemberships: [],
        userGiftcards: [],
    }

    async getUser() {
        try {
          AsyncStorage.getItem('UserID');

          /*
          alert(await AsyncStorage.getItem('sessionID'));
          */

          const response = await fetch(VOLUNTEER_URL, {
            credentials: 'include',
          })

          /*
          const response = await fetch(VOLUNTEER_URL, {
            headers: {'Session-ID': await AsyncStorage.getItem('sessionID')}
          })
          */

          this.setState({ userData: await response.json() })
          
        } 
        catch (error) {
            console.error(error)  
        }
    }

    async getUserInterests() {
      AsyncStorage.getItem('UserID');

      const response = await fetch(USERINTERESTS_URL, {
        credentials: 'include',
      })

      this.setState({ userInterests: await response.json() })
    }

    async getUserMemberships() {
      AsyncStorage.getItem('UserID');

      const response = await fetch(USERMEMBERSHIPS_URL, {
        credentials: 'include',
      })

      this.setState({ userMemberships: await response.json() })
    }
    
    async getUserGiftcards() {
      AsyncStorage.getItem('VolunteerID');

      const response = await fetch(USREGIFTCARDS_URL, {
        credentials: 'include',
      })

      this.setState({ userGiftcards: await response.json() })
    }

    componentDidMount() {
        this.getUser();
        this.getUserInterests();
        this.getUserMemberships();
        this.getUserGiftcards();
    }
    
    render() {
        const { userData } = this.state;
        const { userInterests } = this.state;
        const { userMemberships } = this.state;
        const { userGiftcards } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.noBGarea}>
                  <View style={styles.smallArea} > 
                      <Icon
                          type='material' 
                          name="control-point" 
                          size={30}
                          color='#4c4c4c'
                      />
                      <Text style={{color: '#4c4c4c', fontSize: 18, padding: 3}}>
                          {userData.Points}
                      </Text>
                      { /* number is supposed to come from db */} 
                  </View>
                  <View style={styles.smallArea}> 
                      <Icon
                          type='material' 
                          name="control-point" 
                          size={30}
                          color='#4c4c4c'
                      />
                      <Text style={{color: '#4c4c4c', fontSize: 18, padding: 3}}>
                          55
                      </Text>
                      { /* number is supposed to come from db */} 
                  </View>
                </View>

                <View style={styles.area}>
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{flex:1, width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50}}
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
                      <View style={{width: '50%'}}><Text style={styles.titles}>Adresse</Text></View>
                      <View style={{width: '50%'}}><Text style={styles.values}>{userData.Address}</Text></View>
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
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Købte Gavekort</Text>
                  <View styles={{flex:1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                  {
                    userGiftcards.map((item, i) => (
                      <TouchableOpacity style={[item.isUsed == 1 ? {display: 'none'} : styles.giftcard, item.isExpired == 1 ? {display: 'none'} : styles.giftcard]} key={i}>
                        <ImageBackground source={{uri: item.SponsorPic}} style={styles.cardImg} imageStyle={{borderRadius: 10}} />
                        <View style={styles.cardInfo}>   
                          <Text style={{color: 'white', fontSize: 12 }}>Brug før: { moment(item.ExpirationDate).format('L') }</Text>     
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                  </View>
                </View>

                <View style={styles.area}>
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Brugte Gavekort</Text>
                  {
                    userGiftcards.map((item, i) => (
                      <TouchableOpacity style={item.isUsed == 1 ? styles.giftcard : {display: 'none'}} key={i}>
                        <ImageBackground source={{uri: item.SponsorPic}} style={styles.cardImg} imageStyle={{borderRadius: 10}} />
                        <View style={styles.cardInfo}>   
                          <Text style={{color: 'white', fontSize: 12 }}>Brugt d. { moment(item.ExpirationDate).format('L') }</Text>     
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>

                <View style={styles.area}>
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Udløbne Gavekort</Text>
                  {
                    userGiftcards.map((item, i) => (
                      <TouchableOpacity style={item.isExpired == 1 ? styles.giftcard : {display: 'none'}} key={i}>
                        <ImageBackground source={{uri: item.SponsorPic}} style={styles.cardImg} imageStyle={{borderRadius: 10}} />
                        <View style={styles.cardInfo}>   
                          <Text style={{color: 'white', fontSize: 12 }}>Udløb d. { moment(item.ExpirationDate).format('L') }</Text>     
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
                
            </ScrollView>
        )
    }
}

export default VolunteerProfile;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    noBGarea:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10
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
      backgroundColor: 'lightgrey',
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