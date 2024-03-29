import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, AsyncStorage, TouchableOpacity } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";
import RNSwipeVerify from 'react-native-swipe-verify'
import { NavigationEvents } from 'react-navigation';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const GIFTCARD_URL = 'http://kamilla-server.000webhostapp.com/app/singleGiftcard.php';
const USE_URL = 'http://kamilla-server.000webhostapp.com/app/useGiftcard.php';
const JOBHOURS_URL = 'http://kamilla-server.000webhostapp.com/app/userJobHours.php';


class BoughtGiftcard extends Component {

    static navigationOptions = {
        title: 'Købsbevis',
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
        jobHours: 0,
        isUnlocked: false
    }

    async getGiftcard() {
        try {
            const id = this.props.navigation.getParam('id');
            const purchaseId = this.props.navigation.getParam('purchaseId');
            const response = await fetch(GIFTCARD_URL + '?id=' + id + '&purchaseID=' + purchaseId)

            console.log(GIFTCARD_URL + '?id=' + id + '&purchaseID=' + purchaseId);

            this.setState({ giftcardData: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async useGiftcard() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(USE_URL + '?id=' + id, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })

        const data = await response.json()
        this.props.navigation.navigate('VolunteerProfile');
    }

    componentDidMount() {
        this.getGiftcard();
    }

    

    render() {
        const { giftcardData, jobHours, isUnlocked } = this.state;
        const encodedPicture = giftcardData.SponsorPic;
        //const myPoints = 55;

        const left = jobHours.totalHours - giftcardData.Value;

        if(left >= 0) {
            canBuy = true;
        } else {
            canBuy = false
        }

        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
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
                        </View>

                        <Text style={{color: '#4c4c4c', fontSize: 15, marginTop: 5}}>{giftcardData.Description}</Text>
                        
                        <Text style={{color: '#4c4c4c', fontSize: 15, marginTop: 5}}>{"\n"}{giftcardData.Requirements}</Text>
                    
                        <View style={giftcardData.isExpired == 1 ? {flex: 0, marginTop: 15, marginBottom: 5} : {display: 'none'}}>
                                <Text style={{color: 'rgb(232,67,53)', fontSize: 30, fontWeight: 'bold', alignSelf: 'center', letterSpacing: 10}}>UDLØBET</Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, marginTop: 20}}>
                            <Text style={{color: '#4c4c4c', fontSize: 18, fontWeight: 'bold'}}>Købs Dato</Text>
                            <Text style={{color: '#4c4c4c', fontSize: 18}}>{moment(giftcardData.PurchaseDate).format('L')}</Text>
                        </View>

                        <View style={giftcardData.isUsed == 1 && giftcardData.isExpired != 1 ? {flex: 0} : {display: 'none'}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                                <Text style={{color: '#4c4c4c', fontSize: 18, fontWeight: 'bold'}}>Brugs Dato</Text>
                                <Text style={{color: '#4c4c4c', fontSize: 18}}>{moment(giftcardData.UsageDate).format('L')}</Text>
                            </View>
                        </View>


                        <View style={giftcardData.isUsed != 1 ? {flex: 0} : {display: 'none'}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                                <Text style={{color: '#4c4c4c', fontSize: 18, fontWeight: 'bold'}}>Udløbs Dato</Text>
                                <Text style={{color: '#4c4c4c', fontSize: 18}}>{moment(giftcardData.ExpirationDate).format('L')}</Text>
                            </View>
                        </View>


                        <View style={giftcardData.isUsed == 1 || giftcardData.isExpired == 1 ? {display: 'none'} : {flex: 0}}>
                            <Text style={{color: '#4c4c4c', fontSize: 12, marginBottom: 20}}>
                                For at bruge gavekortet, vis venligst dette købsbevis til ekspedienten ved kassen. 
                                Ekspedienten vil derefter trykke på nedenstående knap for at godkende, at gavekortet er blevet brugt. 
                                Når der er blevet trykket på knappen, kan dette ikke fortrydes. Venligst lad være med at trykke på knappen selv. 
                                Hvis gavekortet er udløbet (se udløbs dato) kan gavekortet desværre ikke længere bruges.
                            </Text>

                            <View style={{ marginTop: 20 }}>
                                <RNSwipeVerify ref={ref => this.swipeVerify3 = ref}
                                    buttonSize={65}
                                        //borderColor="rgba(48,164,81,0.3)"
                                    borderRadius="40"
                                    buttonColor="#30A451"
                                    backgroundColor="rgba(48,164,81,0.2)"
                                    textColor="#4c4c4c"
                                    okButton={{ visible: false, duration: 400 }}
                                    onVerified={() => {
                                        
                                                Alert.alert('Bekræft', 'Er du sikker på at du vil bruge gavekortet ' + giftcardData.Title + '? Denne handling kan ikke fortrydes og burde kun godkendes af en ekspedient i den pågældende butik.', [
                                                {
                                                    text: 'Ja, fortsæt',
                                                    onPress: () => {this.useGiftcard(), this.setState({ isUnlocked: true })},
                                                    style: 'default'
                                                },
                                                {
                                                    text: 'Nej, luk',
                                                    onPress: () => { this.swipeVerify3.reset(), this.setState({ isUnlocked: false })},
                                                    style: 'cancel',
                                                },
                                            ])
                                    }}
                                    icon={
                                        <Icon
                                            name="redeem"
                                            type='material'
                                            size={30}
                                            color="white"
                                        />
                                    }
                                >
                    
                                    <Text>{isUnlocked ? 'Gavekortet er nu brugt' : 'Swipe for at bruge gavekortet'}</Text>

                                </RNSwipeVerify>
                            </View>


                        </View>


                    </View>
                    
                </View>
            </ScrollView>
        )
    }
}

export default BoughtGiftcard;

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