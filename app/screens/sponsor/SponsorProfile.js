import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';

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

    render() {
        return(
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.area}>
                  <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{flex:1, width: 100, height: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50}}
                        source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                      />
                      <Text style={{fontSize: 20, paddingLeft: 10, color: '#4c4c4c'}}>Forenings Navn</Text>
                    </View>

                    <View style={styles.infoBox}>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>CVR</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>00000000</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Email</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>mail@mail.com</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Adresse</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>Randomvej 11</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>By</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>0000, Ingensted</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Telefon</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>00000000</Text></View>
                    </View>
                    <View style={styles.rows}>
                      <View style={{width: '40%'}}><Text style={styles.titles}>Hjemmeside</Text></View>
                      <View style={{width: '60%'}}><Text style={styles.values}>www.hjemmeside.dk</Text></View>
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