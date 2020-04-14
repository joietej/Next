import React from "react";
import { GraphQLProvider } from "graphql-react";
import { withGraphQLApp } from "next-graphql-react";
import "../styles/main.css";
import Header from "../components/Hedaer/Header";


const MyApp = ({ Component, pageProps, graphql }) => {
  return (
    <GraphQLProvider graphql={graphql}>
      <Header />
      <Component {...pageProps} />
      </GraphQLProvider>
  );
}

export default withGraphQLApp(MyApp);