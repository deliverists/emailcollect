import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../../Routing';
import { Auth } from "aws-amplify";
import { observer } from 'mobx-react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  async onSignUp() {
    const { username, password } = this.state;
    await Auth.signUp(username, password);
    this.props.userStore.hasSignedIn();
  }

  render() {
    return (
      <View>
        <Text>Sign up:</Text>

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
            title={'Sign up'}
            onPress={this.onSignUp.bind(this)}
          />
        </View>


        <Link to={'/'} component={TouchableOpacity}>
            <Text>home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(SignUp);
