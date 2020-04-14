import React from "react";
import Link from "next/link";
import { useGraphQL } from "graphql-react";

const PostLink = ({ title }) => (
  <li>
    <Link href="/posts/[id]" as={`/posts/${title}`}>
      <a title={title}>{title}</a>
    </Link>
  </li>
);

const Index = () => {
  const { loading, cacheValue: { data } = {} } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url = "http://localhost:3000/api/graphql";
    },
    operation: {
      query: /* GraphQL */ `
        {
          posts {
            id
            name
          }
        }
      `,
    },
    loadOnMount: true,
    loadOnReload: true,
    loadOnReset: true,
  });

  return data ? (
    <ol>
      {data.posts.map((p) => (
        <PostLink key={p.id} title={p.name} />
      ))}
    </ol>
  ) : loading ? (
    <div>loading...</div>
  ) : (
    <div>Error !</div>
  );
};

export default Index;
