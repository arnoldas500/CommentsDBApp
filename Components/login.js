import React, { Component, PropTypes } from 'react';
import {
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

export default class Login extends Component {

  static propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    // Decode the user string and parse it into JSON
    const user = JSON.parse(decodeURI(user_string));
    // Call onLoggedIn function of parent component and pass user object
    this.props.onLoggedIn(user);
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('https://localhost:3000/auth/facebook');

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('https://localhost:3000/auth/google');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  press() {
    //execute any code here
  }

  render() {
    return (
<View style={styles.container}>

      <ScrollView style={styles.scroll}>
      <Container>
  <Button
      label="Forgot Login/Pass"
      styles={{button: styles.alignRight, label: styles.label}}
      onPress={this.press.bind(this)} />
</Container>

<Container>
    <Label text="Username or Email" />
    <TextInput
        style={styles.textInput}
    />
</Container>
<Container>
    <Label text="Password" />
    <TextInput
        secureTextEntry={true}
        style={styles.textInput}
    />
</Container>
        </ScrollView>

        <View style={styles.footer}>
            <Container>
                <Button
                    label="Sign In"
                    styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                    onPress={this.press.bind(this)} />
            </Container>
            <Container>
                <Button
                    label="CANCEL"
                    styles={{label: styles.buttonBlackText}}
                    onPress={this.press.bind(this)} />
            </Container>
        </View>

        <View style={styles.content}>
          {
          //   <Text style={styles.header}>
          //   Welcome Stranger!
          // </Text>
        }
          <View style={styles.avatar}>
            <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
          </View>
          {
          // <Text style={styles.text}>
          //   Please log in to continue {'\n'}
          //   to the awesomness
          // </Text>
        }
        </View>

        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Login with Facebook
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Or with Google
          </Icon.Button>
        </View>

      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  scroll: {
    padding: 10,
    flexDirection: 'column'
},
textInput: {
    height: 30,
    fontSize: 10,
    backgroundColor: '#FFF'
},
label: {
    color: '#0d8898',
    fontSize: 7
},
alignRight: {
    alignSelf: 'flex-end'
},
buttonWhiteText: {
    fontSize: 10,
    color: '#FFF',
},
buttonBlackText: {
    fontSize: 10,
    color: '#595856'
},
primaryButton: {
    backgroundColor: '#34A853'
},
footer: {
   marginTop: 0
},




  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});
