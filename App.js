import React, { Component } from 'react';
import { Image } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import * as navigationPersistence from './navigation-persistence';

import LoginScreen from './app/screens/LoginScreen';
import Jobs from './app/screens/volunteer/Jobs';
import JobDescription from './app/screens/volunteer/JobDescription';
import History from './app/screens/volunteer/History';
import VolunteerDashScreen from './app/screens/volunteer/VolunteerDashScreen';
import GiftcardShop from './app/screens/volunteer/GiftcardShop';
import Giftcard from './app/screens/volunteer/Giftcard';
import VolunteerProfile from './app/screens/volunteer/VolunteerProfile';
import VolunteerSettings from './app/screens/volunteer/VolunteerSettings';
import ChangeProfile from './app/screens/ChangeProfile';


const JobTab = createStackNavigator({
  Jobs: { screen: Jobs },
  JobDescription: { screen: JobDescription}
})
JobTab.navigationOptions = {
  tabBarIcon: <Icon name="work" type='material' size={35} color="white" />
}

const HistoryTab = createStackNavigator({
  History: { screen: History },
})
HistoryTab.navigationOptions = {
  tabBarIcon: <Icon name="restore" type='material' size={35} color="white" />
}

const HomeTab = createStackNavigator({
  Home: { screen: VolunteerDashScreen },
})
HomeTab.navigationOptions = {
  tabBarIcon: <Image source={require('./assets/logo.png')} style={{width: 38, height: 35}} />
}

const ShopTab = createStackNavigator({
  Shop: { screen: GiftcardShop },
  Giftcard: { screen: Giftcard }
})
ShopTab.navigationOptions = {
  tabBarIcon: <Icon name="shopping-cart" type='material' size={35} color="white" />
}

const VolunteerProfileTab = createStackNavigator({
  VolunteerProfile: { screen: VolunteerProfile },
  VolunteerSettings: { screen: VolunteerSettings },
  ChangeProfile: { screen: ChangeProfile },
})
VolunteerProfileTab.navigationOptions = {
  tabBarIcon: <Icon name="person" type='material' size={35} color="white" />
}

const VolunteerTabs = createBottomTabNavigator(
  {
  JobTab,
  HistoryTab,
  HomeTab,
  ShopTab,
  VolunteerProfileTab,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#517BBE',
      },
      showLabel: false,
      showIcon: true,
    },
    initialRouteName: 'HomeTab',
  }
)

const RootStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    VolunteerTabs,
  },
  {
    headerMode: 'none', 
    initialRouteName: 'Login',
  }, 
)

const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return <AppContainer {...navigationPersistence}/>;
  }
};

export default App;
