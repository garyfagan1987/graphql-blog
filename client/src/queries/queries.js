import { gql } from 'apollo-boost';

const ADD_POST = gql`
  mutation($categoryId: ID!, $description: String!, $imageUrl: String!, $name: String!) {
    addPost(categoryId: $categoryId, description: $description, imageUrl: $imageUrl, name: $name){
      name
    }
  }
`

const GET_POSTS_QUERY = gql`
  {
    posts {
      category {
        name
      }
      description
      id
      imageUrl,
      name
    }
  }
`

const ADD_CATEGORY = gql`
  mutation($name: String!) {
    addCategory(name: $name) {
      name
    }
  }
`

const GET_CATEGORIES_QUERY = gql`
  {
    categories {
      id
      name
    }
  }
`

export {
  ADD_POST,
  GET_POSTS_QUERY,
  ADD_CATEGORY,
  GET_CATEGORIES_QUERY,
};