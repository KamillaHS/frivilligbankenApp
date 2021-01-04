import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, AsyncStorage } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

const GIFTCARD_URL = 'http://kamilla-server.000webhostapp.com/app/singleGiftcard.php';
const BUY_URL = 'http://kamilla-server.000webhostapp.com/app/buyGiftcard.php';
//const JOBHOURS_URL = 'http://kamilla-server.000webhostapp.com/app/userJobHours.php';
const USERPOINTS_URL = 'http://kamilla-server.000webhostapp.com/app/userPoints.php';

class Giftcard extends Component {

    static navigationOptions = {
        title: 'Gavekort',
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
        giftcardData: [],
        userPoints: 0,
    }

    async getGiftcard() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(GIFTCARD_URL + '?id=' + id)

            this.setState({ giftcardData: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async getUserPoints() {
        AsyncStorage.getItem('VolunteerID');
  
        const response = await fetch(USERPOINTS_URL, {
          credentials: 'include',
        })
  
        this.setState({ userPoints: await response.json() })
    }

    async buy() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(BUY_URL + '?id=' + id, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })

        const data = await response.json()
    }

    componentDidMount() {
        this.getGiftcard();
        this.getUserPoints();
    }

    

    render() {
        const { giftcardData, userPoints } = this.state;
        const encodedPicture = giftcardData.SponsorPic;

        const left = userPoints.Points - giftcardData.ValueP;

        if(left >= 0) {
            canBuy = true;
        } else {
            canBuy = false
        }

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 
                    <View style={styles.giftCardLogo}>
                        <Image
                            style={{flex:1, width: undefined, height: undefined, borderRadius: 10}}
                            //source={{uri: giftcardData.SponsorPic}}
                            source={{uri: `data:image/gif;base64,${encodedPicture}`}}
                        />
                    </View>
                    <View style={{padding: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ giftcardData.Title }</Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', padding: 2}}>
                                <Image
                                    style={{ width: 26, height: 26, marginRight: 5 }}
                                    source={require('../../../assets/PointsColor.png')}
                                />
                                <Text style={{color: '#4c4c4c', fontSize: 18, padding: 1}}>{ giftcardData.ValueP }</Text>
                            </View>
                        </View>

                        <Text style={{color: '#4c4c4c', fontSize: 15, marginTop: 5}}>{giftcardData.Description}</Text>
                        
                        <Text style={{color: '#4c4c4c', fontSize: 15, marginTop: 5}}>{"\n"}{giftcardData.Requirements}</Text>
                    

                        <View style={{marginTop: 20, marginBottom: 10}}>
                            <View style={[styles.lightArea, {flex: 1, flexDirection: 'row'}]}>
                                <View style={{width: '30%'}}>
                                    <View>
                                        <Text style={styles.text}>Mine Point</Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                        <Image
                                            style={{ width: 26, height: 26, marginRight: 5 }}
                                            source={require('../../../assets/PointsColor.png')}
                                        />
                                        <Text style={{color: '#4c4c4c', fontSize: 18, padding: 1}}>{userPoints.Points}</Text>
                                    </View>
                                </View>
                                <View style={{width: '5%'}}>
                                    <View>
                                        <Text style={styles.text}>-</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.text}>-</Text>
                                    </View>
                                </View>
                                <View style={{width: '30%'}}>
                                    <View>
                                        <Text style={styles.text}>Gavekort Pris</Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                        <Image
                                            style={{ width: 26, height: 26, marginRight: 5 }}
                                            source={require('../../../assets/PointsColor.png')}
                                        />
                                        <Text style={{color: '#4c4c4c', fontSize: 18, padding: 1}}>{giftcardData.ValueP}</Text>
                                    </View>
                                </View>
                                <View style={{width: '5%'}}>
                                    <View>
                                        <Text style={styles.text}>=</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.text}>=</Text>
                                    </View>
                                </View>
                                <View style={{width: '30%'}}>
                                    <View>
                                        <Text style={styles.text}>Resterende</Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                        <Image
                                            style={{ width: 26, height: 26, marginRight: 5 }}
                                            source={require('../../../assets/PointsColor.png')}
                                        />
                                        <Text style={[{fontSize: 18, padding: 1}, canBuy ? styles.textGreen : styles.textRed]}>{left}</Text>
                                    </View>
                                </View>
                            </View>
                            <Button 
                                buttonStyle={styles.greenButton}
                                disabled={!canBuy}
                                title='Byt for point'
                                onPress={() => Alert.alert('Bekræft', 'Er du sikker på at du vil bytte ' + giftcardData.ValueP +' point for gavekortet: ' + giftcardData.Title + '?', 
                                [
                                    {
                                    text: 'Ja, fortsæt',
                                    onPress: () => {this.buy(); this.props.navigation.navigate('VolunteerProfile')},
                                    style: 'default'
                                    },
                                    {
                                    text: 'Nej, luk',
                                    onPress: () => console.log('Cancel pressed'),
                                    style: 'cancel',
                                    },
                                ],)
                                }
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Giftcard;

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
    },
    giftCardLogo:{
        height: 200,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    lightArea:{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10, 
    },
    text:{
        color: '#4c4c4c',
        textAlign: 'center',
    },
    textGreen:{
        color: '#30A451',
    },
    textRed: {
        color: '#E84335',
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});