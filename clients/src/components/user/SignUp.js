import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../../Routing';
import { observer } from 'mobx-react';

import SignedIn from './SignedIn';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmationCode: "",
    };
  }

  handleSubmit = async () => {
    await this.props.userStore.signUp(this.state.email, this.state.password)
  }

  handleConfirmationSubmit = async () => {
    const { success } = await this.props.userStore.confirmSignUp(this.state.email, this.state.confirmationCode)
    if (success) this.props.history.push("/");
  };

  render() {
    const { error, state, signedIn, awaitingVerification } = this.props.userStore;

    const signup = <View>
      <TextInput
        value={this.state.email}
        onChangeText={(email) => this.setState({ email })}
        placeholder={'Email'}
      />
      <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        placeholder={'Password'}
        secureTextEntry={true}
      />

      <Button
        title={'Sign up'}
        onPress={this.handleSubmit.bind(this)}
      />
    </View>;

    const confirmation = <View>
      <TextInput
        value={this.state.confirmationCode}
        onChangeText={(confirmationCode) => this.setState({ confirmationCode })}
        placeholder={'Confirmation code'}
      />

      <Button
        title={'Verify'}
        onPress={this.handleConfirmationSubmit.bind(this)}
      />
    </View>;

    let form;
    if (signedIn) {
      form = <SignedIn />
    } else {
      form = awaitingVerification ? confirmation : signup
    }

    return (
      <View>
        <Text>Sign up:</Text>

        {form}

        <Text>State: {state}</Text>
        <Text>Error: {error}</Text>

        <Link to={'/'} component={TouchableOpacity}>
            <Text>home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(SignUp);
