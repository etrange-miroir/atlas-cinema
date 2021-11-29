import { GraphQLClient } from 'graphql-request';

import { getSdk } from '~/generated/sdk';

export const getApi = () => {
  const endpoint = 'https://graphql.datocms.com';
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });
  return getSdk(client);
};
