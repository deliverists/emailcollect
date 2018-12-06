import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../Routing';
import { Auth } from "aws-amplify";
import { observer } from 'mobx-react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  async onLogin() {
    const { username, password } = this.state;
    await Auth.signIn(username, password);
    this.props.userStore.authenticate();
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
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
            title={'Login'}
            onPress={this.onLogin.bind(this)}
          />
        </View>


        <Link to={'/'} component={TouchableOpacity}>
            <Text>link home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(Login);
