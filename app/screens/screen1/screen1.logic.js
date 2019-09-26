/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import updateCountry from 'app/data/client/mutation/updateCountry';
import getCountry from 'app/data/client/query/getCountry';
import client from '../../utils/apolloClient';

const countryNumber = val => {
  switch (val) {
    case 1:
      return 'CA';
    case 2:
      return 'AD';
    case 3:
      return 'IT';
    case 4:
      return 'AE';
    case 5:
      return 'AF';
    case 6:
      return 'AR';
    case 7:
      return 'AS';
    case 8:
      return 'AT';
    case 9:
      return 'AW';
    case 10:
      return 'BE';

    default:
      return 'BF';
  }
};

class Screen1Logic extends Component {
  state = {
    count: 0,
    isIncDisabled: false,
    isXDisabled: true,
  };

  increment = () => {
    const { count } = this.state;
    const updatedCount = count + 1;

    this.setState({
      count: updatedCount,
      isXDisabled: false,
    });

    if (updatedCount >= 10) {
      this.setState({ isIncDisabled: true });
    }
  };

  decrement = () => {
    const { count } = this.state;
    const updatedCount = count - 1;

    this.setState({
      count: updatedCount,
      isIncDisabled: false,
    });

    if (updatedCount <= 0) {
      this.setState({
        isIncDisabled: false,
        isXDisabled: true,
      });
    }
  };

  clear = () => {
    return this.setState({
      count: 0,
      isIncDisabled: false,
      isXDisabled: true,
    });
  };

  submit = () => {
    const { count } = this.state;
    const { updateCountry: update } = this.props;

    client
      .query({ query: getCountry, variables: { code: countryNumber(count) } })
      .then(data => {
        const { name, currency, emoji, continent } = data.data.country;

        update({
          variables: {
            code: countryNumber(count),
            name,
            continent: continent.name,
            currency,
            emoji,
          },
        });

        Navigation.push('upworkDemo', {
          component: {
            name: 'Screen2',
          },
        });
      })
      .catch(() => {});
  };

  render() {
    const { currentData, toStyle } = this.props;

    return toStyle({
      state: this.state,
      logic: {
        increment: this.increment,
        decrement: this.decrement,
        clear: this.clear,
        submit: this.submit,
      },
      data: {
        loading: currentData.loading,
        error: currentData.error,
        data: currentData.data,
      },
    });
  }
}

Screen1Logic.propTypes = {
  toStyle: PropTypes.func.isRequired,
  updateCountry: PropTypes.func.isRequired,
  currentData: PropTypes.func.isRequired,
};

const sendMutationTo = compose(graphql(updateCountry, { name: 'updateCountry' }));

export default sendMutationTo(Screen1Logic);
