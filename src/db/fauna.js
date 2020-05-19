import faunadb from "faunadb";

const secret = process.env.FAUNADB_POSTS_SECRET_KEY;

const client = () => new faunadb.Client({ secret });

const q = faunadb.query;

export const getAll = async (collection) =>
  await client().query(
    q.Map(q.Paginate(q.Match(q.Index(`all_${collection}`))), (ref) =>
      q.Get(ref)
    )
  );

export const insert = async (collection, data) =>
  await client().query(q.Create(q.Collection(collection), { data }));

export const insertAll = async (collection, data) =>
  await client().query(
    q.Map(
      data,
      q.Lambda("d", q.Create(q.Collection(collection), { data: q.Var("d") }))
    )
  );

export const getCollections = async () =>
  await client().query(q.Paginate(q.Collections()));

export const deleteCollection = async (collection) =>
  await client().query(q.Delete(q.Collection(collection)));

export const createCollection = async (collection) =>
  await client().query(q.CreateCollection({ name: collection }));

export const createIndex = async (
  collection,
  indexName = `all_${collection}`
) =>
  await client().query(
    q.CreateIndex({ name: indexName, source: q.Collection(collection) })
  );
