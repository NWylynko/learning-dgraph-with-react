import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetPostQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', id: string, title: string, text: string, datePublished?: any | null | undefined, category: { __typename?: 'Category', id: string, name: string }, author: { __typename?: 'User', username: string, displayName?: string | null | undefined, avatarImg?: string | null | undefined }, comments?: Array<{ __typename?: 'Comment', id: string, text: string, commentsOn: { __typename?: 'Post', comments?: Array<{ __typename?: 'Comment', id: string, text: string, author: { __typename?: 'User', username: string, displayName?: string | null | undefined, avatarImg?: string | null | undefined } }> | null | undefined }, author: { __typename?: 'User', username: string, displayName?: string | null | undefined, avatarImg?: string | null | undefined } }> | null | undefined } | null | undefined };


export const GetPostDocument = gql`
    query getPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    text
    datePublished
    category {
      id
      name
    }
    author {
      username
      displayName
      avatarImg
    }
    comments {
      id
      text
      commentsOn {
        comments {
          id
          text
          author {
            username
            displayName
            avatarImg
          }
        }
      }
      author {
        username
        displayName
        avatarImg
      }
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const namedOperations = {
  Query: {
    getPost: 'getPost'
  }
}