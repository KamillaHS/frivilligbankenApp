import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TextInput, Picker, TouchableOpacity, TouchableHighlight, Modal, DatePickerIOS, Platform, KeyboardAvoidingView } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const POSTJOB_URL = 'http://kamilla-server.000webhostapp.com/app/union/postJob.php';
const CATEGORIES_URL = 'http://kamilla-server.000webhostapp.com/app/union/getCategories.php';

class PostJob extends Component {

    static navigationOptions = {
        title: 'Opret Job',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
    };

    constructor(props) {
        super(props);

        this.state= {
            title: '',
            start_date: new Date(),
            end_date: new Date(),
            category: '',
            description: '',
            requirements: '',
            modalStartDate: false,
            modalEndDate: false,
            modalCategory: false,
            categories: [],
        };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({dob: newDate});
    }

    setModalStartDate(visible) {
        this.setState({modalStartDate: visible});
    }

    setModalEndDate(visible) {
        this.setState({modalEndDate: visible});
    }

    setModalCategory(visible) {
        this.setState({modalCategory: visible});
    }

    async getCategories() {
        const response = await fetch(CATEGORIES_URL)
  
        this.setState({ categories: await response.json() })
    }

    async createJob() {
        const { title, start_date, end_date, category, description, requirements } = this.state;

        try {
            if(this.state.title != '' && this.state.start_date != '' && this.state.end_date != '' && this.state.category != '' && this.state.description != '') {
                const response = await fetch(POSTJOB_URL, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({ title, start_date, end_date, category, description, requirements }),
                })
                
                const data = await response.json();
                
                if (data.error) {
                    alert(data.error);
                } else {
                    this.props.navigation.navigate('UnionJobs');
                }
                
            } else {
                Alert.alert('Tomme felter', 'Venligst udfyld alle felter.');
            }
        } catch(error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const { title, start_date, end_date, category, description, requirements, categories } = this.state;

        return(
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 

                    <Text>Jobtitel</Text>
                    <TextInput
                        value={title}
                        onChangeText={(title) => this.setState({title})}
                        placeholder={'Titel'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <Text>Start Dato</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            if(Platform.OS == 'ios') {
                                this.setModalStartDate(true);
                            } else if(Platform.OS == 'android') {

                            }
                        }}>
                        <TextInput
                            value={moment(this.state.start_date).format('L')}
                            placeholder={'00-00-0000'}
                            placeholderTextColor='#4c4c4c'
                            keyboardType='default'
                            style={styles.input}
                            editable={false}
                            pointerEvents='none'
                        />
                    </TouchableOpacity>

                            <Modal
                                animationType="slide"
                                visible={this.state.modalStartDate}
                                transparent={true}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={{marginTop: 'auto', backgroundColor: 'white', marginBottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                                    <View>
                                        <TouchableHighlight
                                            onPress={() => {
                                            this.setModalStartDate(!this.state.modalStartDate);
                                            }}>
                                            <View style={{marginRight: 10, marginLeft: 'auto', marginTop: 10}}>
                                                <Icon
                                                    name="close"
                                                    type='material'
                                                    size={30}
                                                    color="#4c4c4c"
                                                />
                                            </View>
                                        </TouchableHighlight>

                                        <DatePickerIOS
                                            date={this.state.start_date}
                                            mode='date'
                                            maximumDate={moment().subtract(1, 'years').toDate()}
                                            onDateChange={this.setDate}
                                        />
                                    </View>
                                </View>
                            </Modal>

                    <Text>Slut Dato</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            if(Platform.OS == 'ios') {
                                this.setModalStartDate(true);
                            } else if(Platform.OS == 'android') {

                            }
                        }}>
                        <TextInput
                            value={moment(this.state.end_date).format('L')}
                            placeholder={'00-00-0000'}
                            placeholderTextColor='#4c4c4c'
                            keyboardType='default'
                            style={styles.input}
                            editable={false}
                            pointerEvents='none'
                        />
                    </TouchableOpacity>

                            <Modal
                                animationType="slide"
                                visible={this.state.modalEndDate}
                                transparent={true}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={{marginTop: 'auto', backgroundColor: 'white', marginBottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                                    <View>
                                        <TouchableHighlight
                                            onPress={() => {
                                            this.setModalEndDate(!this.state.modalEndDate);
                                            }}>
                                            <View style={{marginRight: 10, marginLeft: 'auto', marginTop: 10}}>
                                                <Icon
                                                    name="close"
                                                    type='material'
                                                    size={30}
                                                    color="#4c4c4c"
                                                />
                                            </View>
                                        </TouchableHighlight>

                                        <DatePickerIOS
                                            date={this.state.end_date}
                                            mode='date'
                                            maximumDate={moment().subtract(14, 'years').toDate()}
                                            onDateChange={this.setDate}
                                        />
                                    </View>
                                </View>
                            </Modal>

                    <Text>Kategori</Text>
                    <TouchableOpacity 
                        onPress={() => {this.setModalCategory(true);}}>
                        <TextInput
                            value={category}
                            placeholder={'Vælg Kategori'}
                            placeholderTextColor='#4c4c4c'
                            keyboardType='default'
                            style={styles.input}
                            editable={false}
                            pointerEvents='none'
                        />
                    </TouchableOpacity>

                            <Modal
                                animationType="slide"
                                visible={this.state.modalCategory}
                                transparent={true}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={{marginTop: 'auto', backgroundColor: 'white', marginBottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                                    <View>
                                        <TouchableHighlight
                                            onPress={() => {
                                            this.setModalCategory(!this.state.modalCategory);
                                            }}>
                                            <View style={{marginRight: 10, marginLeft: 'auto', marginTop: 10}}>
                                                <Icon
                                                    name="close"
                                                    type='material'
                                                    size={30}
                                                    color="#4c4c4c"
                                                />
                                            </View>
                                        </TouchableHighlight>
                                        
                                        <Picker
                                            selectedValue={'Vælg Kategori'}
                                            /*style={{height: 50, width: 100}}*/
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({category: itemValue})
                                            }>
                                            <Picker.Item label="Vælg Kategori" value="0" enabled="false" />
                                            {
                                                categories.map((item, i) => (
                                                    <Picker.Item key={i} label={item.CategoryName} value={item.CategoryID} />
                                                ))
                                            }
                                        </Picker>
                                        
                                        
                                    </View>
                                </View>
                            </Modal>

                    <Text>Beskrivelse</Text>
                    <TextInput
                        value={description}
                        onChangeText={(description) => this.setState({description})}
                        placeholder={'Beskrivelse'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textArea}
                    />

                    <Text>Krav</Text>
                    <TextInput
                        value={requirements}
                        onChangeText={(requirements) => this.setState({requirements})}
                        placeholder={'Krav'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textArea}
                    />

                    <Button 
                        buttonStyle={styles.greenButton}
                        title='Opret Job'
                        onPress={this.createJob.bind(this)}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

export default PostJob;

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
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 44,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
        color: '#4c4c4c'
    },
    textArea: {
        width: '100%',
        height: 100,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
        color: '#4c4c4c'
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});