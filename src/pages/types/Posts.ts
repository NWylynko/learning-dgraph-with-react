import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllPostsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPostsSubscription = { __typename?: 'Subscription', queryPost?: Array<{ __typename?: 'Post', id: string, title: string, datePublished?: any | null | undefined, category: { __typename?: 'Category', id: string, name: string }, author: { __typename?: 'User', username: string, displayName?: string | null | undefined, avatarImg?: string | null | undefined }, commentsAggregate?: { __typename?: 'CommentAggregateResult', count?: number | null | undefined } | null | undefined } | null | undefined> | null | undefined };


export const AllPostsDocument = gql`
    subscription allPosts {
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
 * __useAllPostsSubscription__
 *
 * To run a query within a React component, call `useAllPostsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AllPostsSubscription, AllPostsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AllPostsSubscription, AllPostsSubscriptionVariables>(AllPostsDocument, options);
      }
export type AllPostsSubscriptionHookResult = ReturnType<typeof useAllPostsSubscription>;
export type AllPostsSubscriptionResult = Apollo.SubscriptionResult<AllPostsSubscription>;
export const namedOperations = {
  Subscription: {
    allPosts: 'allPosts'
  }
}