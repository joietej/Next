import * as db from "../db/fauna";
import * as dbutil from "../db/utils";

const postsCollection = "medium";

const mapToPost = (res) => ({
  ref: dbutil.getRef(res.ref),
  id: res.data.id,
  title: res.data.title,
  links: res.data.links,
  description: res.data.description,
  tags: res.data.tags,
  topics: res.data.topics,
});

export const getPosts = async () => {
  const res = await db.getAll(postsCollection);
  return res.data.map((r) => mapToPost(r));
};

export const addPost = async (post) => {
  const res = await db.insert(postsCollection, post);
  return mapToPost(res);
};

export const addPosts = async (posts) => {
  const results = await db.insertAll(postsCollection, posts);
  return results.map((res) => mapToPost(res));
};

export const uplaodPosts = async (posts) => {
  const res = await db.getCollections();
  if (
    res &&
    res.data &&
    res.data.length &&
    res.data.some((r) => r.value.id === postsCollection)
  ) {
    await db.deleteCollection(postsCollection);
  }
  await db.createCollection(postsCollection);
  await db.createIndex(postsCollection);
  return await addPosts(posts);
};
