import gql from 'graphql-tag';

const getCountry = gql`
  query($code: String!) {
    country(code: $code) {
      name
      continent {
        name
      }
      currency
      emoji
    }
  }
`;

export default getCountry;
