export const fetchMediumPosts = async (q) => {
  
    const respponse = await fetch(`https://medium.com/search?q=${q}`, {
    headers: { Accept: "application/json" },
  });
  
  const textResp = await respponse.text();
  const jsonString = textResp.replace("])}while(1);</x>", "");
  const result = JSON.parse(jsonString);
  
  const posts = result.payload.value.posts.map((r) => ({
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    description: r.virtuals.metaDescription,
    links: r.virtuals.links.entries
      .filter((l) => l.httpStatus === "200")
      .map((l) => ({ url: l.url })),
    tags: r.virtuals.tags.map((t) => ({
      slug: t.slug,
      count: t.postCount,
      name: t.name,
    })),
    topics: r.virtuals.topics.map((tp) => ({
      slug: tp.slug,
      name: tp.name,
      description: tp.description,
    })),
  }));
  
  return posts;
};
