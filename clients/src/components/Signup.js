import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../Routing';
import { Auth } from "aws-amplify";
import { observer } from 'mobx-react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  async onSignup() {
    const { username, password } = this.state;
    await Auth.signUp(username, password);
    this.props.userStore.hasAuthenticated();
  }

  render() {
    return (
      <View>
        <Text>Sign up:</Text>
        <Text>Logged in: {this.props.userStore.authenticated.toString()}</Text>

        <View>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
          />

          <Button
            title={'Signup'}
            onPress={this.onSignup.bind(this)}
          />
        </View>


        <Link to={'/'} component={TouchableOpacity}>
            <Text>link home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(Signup);
