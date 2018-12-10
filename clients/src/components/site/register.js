import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Link } from '../../Routing';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      domainName: "",
    };
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true });

    try {
    } catch (e) {
      alert(typeof e === 'string' ? e : e.message);
    }

    this.setState({ isLoading: false });
  }

  render() {
    const form = <View>
      <TextInput
        value={this.state.domainName}
        onChangeText={(domainName) => this.setState({ domainName })}
        placeholder={'Domain name'}
      />

      <Button
        title={'Register domain'}
        onPress={this.handleSubmit.bind(this)}
      />
    </View>;

    return (
      <View>
        <Text>Register a new site:</Text>

        {form}

        <Link to={'/'} component={TouchableOpacity}>
            <Text>home</Text>
        </Link>
      </View>
    );
  }
};

export default observer(Register);
