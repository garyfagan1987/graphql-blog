import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import useForm from "react-hook-form";

import { ADD_CATEGORY, GET_CATEGORIES_QUERY } from '../queries/queries';

const AddPost = () => {
  const { handleSubmit, register, errors } = useForm();
  const [AddPost, { data: createdData }] = useMutation(ADD_CATEGORY);
  
  const onSubmit = (data, e) => {
    const { name } = data;
    AddPost({
      variables: {
        name,
      },
      refetchQueries: [{ query: GET_CATEGORIES_QUERY }]
    });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Category Name:</label>
        <input
          name="name"
          ref={register}
          required
        />
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  );
}

export default AddPost;