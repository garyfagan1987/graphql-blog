const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const Category = require('../models/category');
const Post = require('../models/post');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.categoryId);
      }
    },
    description: {type: GraphQLID},
    id: {type: GraphQLID},
    imageUrl: {type: GraphQLString},
    name: {type: GraphQLString},
  })
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({});
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        categoryId: {type: new GraphQLNonNull(GraphQLID)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        imageUrl: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        let post = new Post({
          categoryId: args.categoryId,
          description: args.description,
          imageUrl: args.imageUrl,
          name: args.name,
        });
        return post.save();
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        let category = new Category({
          name: args.name,
        });
        return category.save();
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});