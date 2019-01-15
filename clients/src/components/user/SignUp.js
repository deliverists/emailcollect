import React from 'react';
import { View, Text, TextInput, Button } from "react-native";
import { Link } from '../../routing/Components';
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
    const { success } = await this.props.userStore.signUp(this.state.email, this.state.password)
    if (success) this.props.history.push("/verify");
  };

  render() {
    const { error, state, signedIn } = this.props.userStore;

    const signUpForm = <View>
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

    return (
      <View>
        <Text>Sign up:</Text>

        {signedIn && <SignedIn />}
        {!signedIn && signUpForm}

        <Text>State: {state}</Text>
        <Text>Error: {error}</Text>

        <Link to={'/'}>
            <Text>home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(SignUp);
