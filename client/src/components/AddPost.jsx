import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useForm from "react-hook-form";

import { ADD_POST, GET_POSTS_QUERY, GET_CATEGORIES_QUERY } from '../queries/queries';

const AddPost = () => {
  const { handleSubmit, register, errors } = useForm();
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);
  const [AddPost, { data: createdData }] = useMutation(ADD_POST);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const onSubmit = (data, e) => {
    const { categoryId, description, imageUrl, name } = data;
    AddPost({
      variables: {
        categoryId,
        description,
        imageUrl,
        name,
      },
      refetchQueries: [{ query: GET_POSTS_QUERY }]
    });
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {createdData && createdData.addPost && <div class="alert">Created {createdData.addPost.name}</div>}
        <div>
          <label>Name:</label>
          <input
            name="name"
            ref={register}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            ref={register}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            name="imageUrl"
            ref={register}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select name="categoryId" ref={register} required>
            <option value="">Please select</option>
            {data.categories.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}

export default AddPost;