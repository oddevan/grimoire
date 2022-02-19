import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'

export interface UserInfo {
	username: string;
	displayName: string;
}

export async function getCurrentUserInfo(apollo?: ApolloClient<NormalizedCacheObject>) : Promise<UserInfo | undefined> {
  if (!apollo) return undefined;
	
	const response = await apollo.query({
    query: gql`
      query MyQuery {
				viewer {
					username
					name
				}
				contentTypes {
					nodes {
						name
					}
				}
			}
    `
  });

	console.log({response});

  return {
		username: response.data.viewer.username,
		displayName: response.data.viewer.name,
	}
}
