import faunadb from "faunadb";

const secret = process.env.DB_CONN;

const client = () => new faunadb.Client({ secret });

const q = faunadb.query;

export const getAll = async (collection) =>
  await client().query(
    q.Map(q.Paginate(q.Match(q.Index(`all_${collection}`))), (ref) =>
      q.Get(ref)
    )
  );

export const create = async (collection, data) =>
  await client().query(q.Create(q.Collection(collection), { data }));
