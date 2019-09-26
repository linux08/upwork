import gql from 'graphql-tag';

const getCountry = gql`
  query {
    country @client {
      name
      continent
      currency
      emoji
    }
  }
`;

export default getCountry;
