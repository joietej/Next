import * as db from "../db/fauna";
import * as dbutil from "../db/utils";

export const getPosts = async () => {
  const res = await db.getAll("posts");
  return res.data.map((r) => ({
    id: dbutil.getId(r.ref),
    name: r.data.name,
  }));
};

export const addPost = async (name) => {
  const res = await db.create("posts", { name });
  return {
    id: dbutil.getId(res.ref),
    name: res.data.name,
  };
};
