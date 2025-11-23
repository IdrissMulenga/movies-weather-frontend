"use client"
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// apollo link
const httpLink = new HttpLink({
    uri: "/api/graphql", // get next.js proxy router
    credentials: "include",
    fetchOptions: { cache: "no-store" } // prevent Next.js from caching requests
});

const client = new ApolloClient({
    // apollo client pipeline
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(), //apollo built in cache engine
    defaultOptions: {
        watchQuery: { fetchPolicy: "cache-and-network" }, //cached data immediately, then refresh from network.
        query: { fetchPolicy: "network-only" },
        mutate: { errorPolicy: "all" },
    },
});

export const Apollo = ({children}: {children:React.ReactNode}) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}