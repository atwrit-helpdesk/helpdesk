import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create Apollo Client instance
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://help-desk-atwrit.hasura.app/v1/graphql', // Replace with your GraphQL endpoint
      headers: {
        // Optional headers like authorization can go here
         'content-type': 'application/json',
         'x-hasura-admin-secret': 'wtuwPAjE5iQtAzZcxEF8DgdS51oQy95NPfAEZvuHW1l1esgvYXoKglceqigEEQXq', // Replace with your Hasura admin secret
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
