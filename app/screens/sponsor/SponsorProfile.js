import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const SPONSOR_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/getSponsorInfo.php';

class SponsorProfile extends Component {

    static navigationOptions =  ({ navigation }) => { 
        return {
          title: 'Sponsor Profil',
          headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#517BBE',
            },
            headerBackTitle: null,
            headerRight: (
              <Button
                onPress={() => navigation.navigate('SponsorSettings')}
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
      sponsorData: [],
    }

    async getSponsorInfo() {
      try {
          const response = await fetch(SPONSOR_URL)

          this.setState({ sponsorData: await response.json() })
      } catch (error) {
          console.error(error)
      }
    }

    componentDidMount() {
      this.getSponsorInfo();
    }

    render() {
        const { sponsorData } = this.state;
        const encodedPicture = sponsorData.SponsorPic;

        return(
            <ScrollView contentContainerStyle={styles.container}>
              <NavigationEvents onWillFocus={ () => this.getSponsorInfo() }/>
              <View style={styles.area}>
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{flex:1, width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50, backgroundColor: 'white'}}
                        //source={{uri: sponsorData.SponsorPic}}
                        source={{uri: `data:image/gif;base64,${encodedPicture}`}}
                        resizeMode="contain"
                      />
                      <Text style={{flex: 0.5, fontSize: 20, paddingLeft: 10, color: '#4c4c4c'}}>{sponsorData.SponsorName}</Text>
                    </View>

                    <View style={styles.infoBox}>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>CVR</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>{sponsorData.SponsorCVR}</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Email</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>{sponsorData.SponsorEmail}</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Adresse</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>{sponsorData.Address}</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>By</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>{sponsorData.PostalCode}, {sponsorData.City}</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Telefon</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>{sponsorData.Phone}</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Status</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>{sponsorData.Status}</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Hjemmeside</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>{sponsorData.Website}</Text></View>
                    </View>
                  </View>
              </View>
            </ScrollView>
        )
    }
}

export default SponsorProfile;

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
});