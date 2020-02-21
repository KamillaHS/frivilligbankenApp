import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, ImageBackground, Picker } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { TextInput } from "react-native-gesture-handler";

const GIFTCARDS_URL = 'http://kamilla-server.000webhostapp.com/app/allGiftcards.php';

class AllGiftcards extends Component {

    static navigationOptions = {
        title: 'Alle Gavekort',
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#517BBE',
        },
        headerBackTitle: null,
        headerTintColor: 'white',
    };

    state = { 
        giftcardsData: [],
    }

    async getGiftcards() {
        try {
            const response = await fetch(GIFTCARDS_URL)

            this.setState({ giftcardsData: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getGiftcards();
    }

    render() {
        const { giftcardsData } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.noBGarea}>
                    <Button
                        onPress={() => Alert.alert('Manglende side', 'Du kan endnu ikke vælge dette filter')}
                        buttonStyle={styles.filterButton}
                        icon={
                            <Icon
                            name="account-balance"
                            type='material'
                            size={30}
                            color="white"
                            />
                        }
                    />

                    <Button
                        onPress={() => Alert.alert('Manglende side', 'Du kan endnu ikke vælge dette filter')}
                        buttonStyle={styles.filterButton}
                        icon={
                            <Icon
                            name="list"
                            type='material'
                            size={30}
                            color="white"
                            />
                        }
                    />

                    <Button
                        onPress={() => Alert.alert('Manglende side', 'Du kan endnu ikke vælge dette filter')}
                        buttonStyle={styles.filterButton}
                        icon={
                            <Icon
                            name="place"
                            type='material'
                            size={30}
                            color="white"
                            />
                        }
                    />

                </View>

                <View style={styles.noBGarea}>
                    <View style={styles.searchField}>
                        <Icon 
                            name="search"
                            type='material'
                            size={30}
                            color="#4c4c4c"
                        />
                        <TextInput  
                            placeholder={'Søg'}
                            placeholderTextColor='#4c4c4c'
                            style={styles.searchInput}
                        />
                    </View>

                    
                </View>

                {
                    giftcardsData.map((item, i) => (
                        <TouchableOpacity style={styles.giftcard} key={i} onPress={() => this.props.navigation.navigate('SingleGiftcard', {id: item.GiftcardID})}>
                            <ImageBackground source={{uri: item.SponsorPic}} style={styles.cardImg} imageStyle={{ borderRadius: 10 }} />
                            <View style={styles.cardInfo}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{color: 'white', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', padding: 2}}>
                                        <Icon
                                            type='material' 
                                            name="control-point" 
                                            size={25}
                                            color='white'
                                        />
                                        <Text style={{color: 'white', fontSize: 18, padding: 1}}>{ item.Value }</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))    
                }
            </ScrollView>
        )
    }
}

export default AllGiftcards;

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
    filterButton:{
        backgroundColor:"#517BBE",
        borderColor: 'white',
        borderWidth: 2,
        borderRadius:10,
        height: 60,
        width: '61%'
      },
    searchField: {
        flex:1,
        flexDirection: 'row',
        width: '100%',
        height: 40,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#4c4c4c",
        borderRadius: 10,
    
    },
    searchInput:{
        width: '90%',
        fontSize: 16,
        paddingLeft: 5
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '90%',
    },
    text:{
        fontSize: 15,
        color: '#4c4c4c'
    },
    giftcard:{
        height: 200,
        width: '90%',
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
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        marginBottom: 0,
        marginTop: 'auto',
        padding: 5,
    },
});