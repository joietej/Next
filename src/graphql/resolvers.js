const resolvers = {
  Query: {
    posts: async (_, __, { service }) => await service.getPosts(),
  },
  Mutation: {
    addPost: (_, args, { service }) => service.addPost(args.name),
  },
};

export default resolvers;
