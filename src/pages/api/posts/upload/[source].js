import * as fetcher from "../../../../services/fetcher";
import * as postService from "../../../../services/post";

export default async (req, res) => {
  const {
    query: { source, q },
  } = req;
  if (source === "medium") {
    const posts = await fetcher.fetchMediumPosts(q);
    const added_posts = await postService.uplaodPosts(posts);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ fetched: posts.length, uploaded: added_posts.length })
    );
  }
};
