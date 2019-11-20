import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_POSTS_QUERY } from '../queries/queries';

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.posts.map(({ category, description, id, imageUrl, name }) => (
        <article class="card" key={id}>
          <img src={imageUrl} />
          <h1>{name}</h1>
          <p>{description}</p>
          <p>Category: {category.name}</p>
        </article>
      ))}
    </div>
  );
}

export default Posts;