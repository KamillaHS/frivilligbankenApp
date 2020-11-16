import React, { Component } from "react";

/* login url */ const CHECKLOGIN_URL = 'http://kamilla-server.000webhostapp.com/app/checkLogin.php';

class App extends Component {

    state = { 
      checkLogin: '',
    }
  
    /* check login */
  
    async loginCheck() {
      const { checkLogin } = this.state;
      let logInState;
  
      try {
          const response = await fetch(CHECKLOGIN_URL)
          logInState = await response.text();
          //this.setState({ checkLogin: await response.json() })
      } catch (error) {
          console.error(error)  
      }
      console.log("test", logInState);
      if(! loggedInState.loggedIn || loggedInState.loggedIn==='false') {
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('VolunteerTabs');
      }
  
    }
  
    componentDidMount() {
      this.loginCheck();
  }
  
    render() {
      return;
    }
  };
  
  export default App;