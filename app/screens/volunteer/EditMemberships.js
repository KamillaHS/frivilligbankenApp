import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { Button, Icon, Divider, CheckBox } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";
//import { TouchableOpacity } from "react-native-gesture-handler";

const USERMEMBERSHIPS_URL = 'http://kamilla-server.000webhostapp.com/app/userMemberships.php';
const UNIONLIST_URL = 'http://kamilla-server.000webhostapp.com/app/unionList.php';
const UPDATEMEMBERSHIPS_URL = 'http://kamilla-server.000webhostapp.com/app/updateMemberships.php'

class EditMemberships extends Component {

    static navigationOptions = {
        title: 'Rediger Medlemskaber',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
    };

    
    state = { 
        memberships: [],
        unions: [], unselectedUnion: [],
        checkedId: -1,
    }

    async getUserMemberships() {
        AsyncStorage.getItem('UserID');
  
        const response = await fetch(USERMEMBERSHIPS_URL, {
          credentials: 'include',
        })
  
        this.setState({ memberships: await response.json() })
        this.getAllUnions();
    }


    async getAllUnions() {
        const response = await fetch(UNIONLIST_URL);

        const unions = await response.json();
        const { memberships } = this.state;

        const unselectedUnion = unions.filter(data=>{
            const index=memberships.findIndex(item=>item.UnionID === data.UnionID) 
            return index < 0
        });

        this.setState({unions, unselectedUnion});
    
        // this.setState({ unions: await response.json() })
    }

    handleCheck = (index) => {
        const data = this.state.unions;
        const curRowData = {...data[index], checked: !data[index].checked};
        data.splice(index, 1, curRowData);
        this.setState({unions: data});
    }

    saveChanges = async() => {
        const checkedItems = this.state.unions.filter((item) => {return item.checked});

        const response = await fetch(UPDATEMEMBERSHIPS_URL, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ checkedItems }),
        })

        const data = await response.json();
        this.props.navigation.navigate('VolunteerProfile');
    }

    componentDidMount() {
        this.getUserMemberships();
        //this.getAllUnions();
    }

    

    render() {
        const { memberships, unions, unselectedUnion } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={memberships.length > 0 ? [styles.area, {marginBottom: 20}] : {display: 'none'}}> 
                    <View style={{marginBottom: 10}}>
                        <Text style={styles.text}>Dine Medlemskaber</Text>
                        <Text style={styles.text}>Blev medlem d.</Text>
                    </View>
                    {
                        memberships.map(( union, i ) => (
                            <View key={i.UnionID} style={union.isConfirmed == 1 ? {display: 'flex'} : {display: 'none'}}>
                                <View style={i % 2== 1 || i % 2 == 2 ? styles.unionDark : styles.unionLight}>
                                    <Text> {union.UnionName} </Text>
                                    <Text> {union.MemberSince} </Text>
                                </View>
                            </View>
                        ))
                    }

                    {
                        memberships.map(( union, i ) => (
                            <View key={i.UnionID} style={union.isConfirmed == 0 ? {display: 'flex', flexDirection: 'column'} : {display: 'none'}}>
                                <View style={union.isConfirmed == 0 ? styles.awaitingUnion : {display: 'none'}}>
                                    <Text>Du har søgt medlemskab hos: </Text>
                                    <Text>{union.UnionName}.</Text>
                                    <Text>Foreningen har dog ikke godkendt dit medlemskab endnu.</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.area}>
                    <Text>Andre foreninger her</Text>
                    {
                        unselectedUnion.map(( union, i ) => (
                            <View style={i % 2== 1 || i % 2 == 2 ? styles.unionDark : styles.unionLight}>
                                <Text style={{flex: 1, fontSize: 16, color: '#4c4c4c'}}> {union.UnionName} </Text>
                                <CheckBox
                                    //title={false}
                                    key={i.UnionID}
                                    checked={union.checked}
                                    onPress={() => this.handleCheck(i)}
                                    checkedIcon={'check-square'}
                                    size={30}
                                    checkedColor={'#517BBE'}
                                />
                            </View>
                        ))
                    }
                </View>

                <Button 
                        buttonStyle={styles.greenButton}
                        disabled={false}
                        title='Gem Ændringer'
                        onPress={this.saveChanges.bind(this)}
                    />
            </ScrollView>
        )
    }
}

export default EditMemberships;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        padding: 10,
        width: '90%',
    },
    text:{
        color: '#4c4c4c',
        fontSize: 15
    },
    awaitingUnion:{
        backgroundColor:"rgba(255, 128, 0, 0.5)",
        borderRadius: 10,
        padding: 10,
        marginTop: 20
    },
    unionDark:{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    unionLight:{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});