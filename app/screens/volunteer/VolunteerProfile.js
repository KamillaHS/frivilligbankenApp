import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, AsyncStorage, ScrollView, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';

const VOLUNTEER_URL = 'http://kamilla-test.000webhostapp.com/app/volunteerInfo.php';

interests = [
  {'id': 1, 'interest': 'insterest1'}, 
  {'id': 2, 'interest': 'insterest2'}, 
  {'id': 3, 'interest': 'insterest3'},
];

unions = [
  {'id': 1, 'union': 'Nykøbing FC'}, 
  {'id': 2, 'union': 'Brydeklubben Thor'}, 
  {'id': 3, 'union': 'Nykøbing F. Petanque Klub'},
];

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
        userData: [] 
    }

    async getUser() {
        try {
          AsyncStorage.getItem('UserID');
          const response = await fetch(VOLUNTEER_URL)

          this.setState({ userData: await response.json() })
        } 
        catch (error) {
            console.error(error)  
        }
    }

    componentDidMount() {
        this.getUser();
    }
    
    render() {
        const { userData } = this.state;

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
                      source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                    />
                    <Text style={{fontSize: 20, paddingLeft: 10, color: '#4c4c4c'}}>Full Name</Text>
                  </View>

                  <View style={styles.infoBox}>
                    <View style={styles.rows}>
                      <View style={{width: '50%'}}><Text style={styles.titles}>Fødselsdato</Text></View>
                      <View style={{width: '50%'}}><Text style={styles.values}>00-00-0000</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '50%'}}><Text style={styles.titles}>Adresse</Text></View>
                      <View style={{width: '50%'}}><Text style={styles.values}>Randomvej 11</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '50%'}}><Text style={styles.titles}>By</Text></View>
                      <View style={{width: '50%'}}><Text style={styles.values}>0000, Ingensted</Text></View>
                    </View>
                    <Text style={styles.titles}>Beskrivelse</Text>
                    <Text style={styles.values}>Blaa... Blaaa... Blaaaa...</Text>
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
                      interests.map((item, i) => (
                        <View style={i % 4 == 1 || i % 4 == 2 ? styles.interestDark : styles.interestLight} key={i}>
                          <Text style={{fontSize: 16, color: '#4c4c4c'}}>{item.interest}</Text>
                        </View>
                      ))
                    }
                    </View>
                </View>

                <View style={styles.area}>
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Medlemskaber</Text>
                  <View>
                  {
                      unions.map((item, i) => (
                        <View style={i % 2 == 0 ? styles.unionDark : styles.unionLight} key={i}>
                          <Text style={{fontSize: 16, color: '#4c4c4c'}}>{item.union}</Text>
                        </View>
                      ))
                    }
                  </View>
                </View>

                <View style={styles.area}>
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Købte Gavekort</Text>
                    <Text>Købte Gavekort</Text>
                </View>

                <View style={styles.area}>
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Brugte Gavekort</Text>
                    <Text>Brugte Gavekort</Text>
                </View>

                <View style={styles.area}>
                  <Text style={{fontSize: 18, color: '#4c4c4c', paddingBottom: 10}}>Udløbne Gavekort</Text>
                    <Text>Udløbne Gavekort</Text>
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
});