import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', queryPost?: Array<{ __typename?: 'Post', id: string, title: string, datePublished?: any | null | undefined, category: { __typename?: 'Category', id: string, name: string }, author: { __typename?: 'User', username: string, displayName?: string | null | undefined, avatarImg?: string | null | undefined }, commentsAggregate?: { __typename?: 'CommentAggregateResult', count?: number | null | undefined } | null | undefined } | null | undefined> | null | undefined };


export const AllPostsDocument = gql`
    query allPosts {
  queryPost(order: {desc: datePublished}) {
    id
    title
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
    commentsAggregate {
      count
    }
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
export const namedOperations = {
  Query: {
    allPosts: 'allPosts'
  }
}