import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, AsyncStorage } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

UNION_URL = 'http://kamilla-server.000webhostapp.com/app/union/unionInfo.php';

class UnionProfile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Forenings Profil',
            headerTitleStyle: {
                color: 'white',
              },
              headerStyle: {
                backgroundColor: '#517BBE',
                height: 60
              },
              headerBackTitle: null,
              headerRight: (
                <Button
                  onPress={() => navigation.navigate('UnionSettings')}
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
        }
    };

  state = { 
      unionData: []
  }

  async getUnion() {
    try {
      const response = await fetch(UNION_URL, {
        credentials: 'include',
      })
    
      this.setState({ unionData: await response.json() })
      
    } 
    catch (error) {
        console.error(error)  
    }
  }

  componentDidMount() {
    this.getUnion();
  }

  render() {
    const { unionData } = this.state;
    const encodedPicture = unionData.UnionLogo;

    return(
      <ScrollView contentContainerStyle={styles.container}>
        <NavigationEvents onWillFocus={ () => this.getUnion() }/>
        <View style={styles.area}>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{flex:1, minWidth: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50, backgroundColor: 'white'}}
              //source={{uri: unionData.UnionLogo}}
              source={{uri: `data:image/gif;base64,${encodedPicture}`}}
            />
            <Text style={{flex: 0.5, fontSize: 20, paddingLeft: 10, color: '#4c4c4c'}}>{unionData.UnionName}</Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.rows}>
              <View style={{width: '40%'}}><Text style={styles.titles}>CVR</Text></View>
              <View style={{width: '60%'}}><Text style={styles.values}>{unionData.UnionCVR}</Text></View>
            </View>
            <View style={styles.rows}>
              <View style={{width: '40%'}}><Text style={styles.titles}>Email</Text></View>
              <View style={{width: '60%'}}><Text style={styles.values}>{unionData.UnionEmail}</Text></View>
            </View>
            <View style={styles.rows}>
              <View style={{width: '40%'}}><Text style={styles.titles}>Adresse</Text></View>
              <View style={{width: '60%'}}><Text style={styles.values}>{unionData.Address}</Text></View>
            </View>
            <View style={styles.rows}>
              <View style={{width: '40%'}}><Text style={styles.titles}>By</Text></View>
              <View style={{width: '60%'}}><Text style={styles.values}>{unionData.PostalCode}, {unionData.City}</Text></View>
            </View>
            <View style={styles.rows}>
              <View style={{width: '40%'}}><Text style={styles.titles}>Telefon</Text></View>
              <View style={{width: '60%'}}><Text style={styles.values}>{unionData.Phone}</Text></View>
            </View>
            <View style={styles.rows}>
              <View style={{width: '40%'}}><Text style={styles.titles}>Hjemmeside</Text></View>
              <View style={{width: '60%'}}><Text style={styles.values}>{unionData.Website}</Text></View>
            </View>
            <Text style={styles.titles}>Beskrivelse</Text>
            <Text style={styles.values}>{unionData.Description}</Text>
          </View>
        </View>          
      </ScrollView>          
    )
  }
}

export default UnionProfile;

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