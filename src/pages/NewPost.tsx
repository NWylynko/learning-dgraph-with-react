import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { LoadingContainer } from "../components/Loading";
import { useFirebase } from "../firebase/provider";
import {
  useCreatePostMutation,
  useGetAllCategoriesQuery,
} from "./types/NewPost";
import { useNavigate } from "react-router-dom";

type FormData = { title: string; text: string } & (
  | {
      category: never;
      category_id: string;
    }
  | {
      category: string;
      category_id: never;
    }
);

const NewPostPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const query = useGetAllCategoriesQuery();
  const [createPostMutation, post] = useCreatePostMutation();

  const { register, handleSubmit, watch } = useForm<FormData>();

  if (firebase.loading) {
    return <LoadingContainer text="Loading User" />;
  }

  if (firebase.error) {
    return <span>Error: {firebase.error.message}</span>;
  }

  if (query.loading) {
    return <LoadingContainer text="Loading Form" />;
  }

  if (query.error) {
    return <span>Error: {query.error.message}</span>;
  }

  if (post.loading) {
    return <LoadingContainer text="Submitting Post" />;
  }

  if (post.error) {
    return <span>Error: {post.error.message}</span>;
  }

  const categories = query.data?.queryCategory;

  const onSubmit = handleSubmit(async (form) => {
    console.log(form);

    const author_id = firebase.user?.uid;

    if (!author_id) {
      throw new Error("No user id found");
    }

    const category = form.category
      ? { name: form.category }
      : { id: form.category_id };

    if (category?.id === "-1") {
      throw new Error("No category selected");
    }

    const response = await createPostMutation({
      variables: {
        post: {
          title: form.title,
          text: form.text,
          author: {
            id: author_id,
          },
          category,
        },
      },
    });

    console.log(response);

    const newPost = response.data?.addPost?.post;

    if (!newPost) {
      throw new Error("No post returned");
    }

    const newPostId = newPost[0]?.id;

    if (!newPostId) {
      throw new Error("No post id returned");
    }

    console.log(newPostId);

    navigate(`/post/${newPostId}`);
  });

  return (
    <>
      <h2>Create New Post</h2>
      <Form onSubmit={onSubmit}>
        <label>Title</label>
        <Input
          placeholder="Give me an Awesome name"
          {...register("title")}
          autoFocus
        />
        <label>Category</label>
        {watch().category_id === "-2" ? (
          <>
            <Input
              placeholder="Create a new Category"
              {...register("category")}
            />
          </>
        ) : (
          <>
            <Select {...register("category_id")}>
              <option value="-1">Select Category</option>
              {categories?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
              <option value="-2">Create New Category</option>
            </Select>
          </>
        )}

        <label>Text</label>
        <TextArea
          {...register("text")}
          placeholder="Tell me your awesome story"
          rows={10}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default NewPostPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 32px);
  max-width: 400px;
  margin: 16px;
`;

const baseCss = css`
  border: 2px solid var(--color-one);
  background-color: white;
  color: var(--color-four);
  border-radius: 8px;
  padding: 8px;
  margin-top: 2px;
  margin-bottom: 8px;
  font-size: 16px;
`;

const Input = styled.input`
  ${baseCss}
  max-width: calc(400px - 16px - 4px);
`;

const Select = styled.select`
  ${baseCss}
  max-width: 400px;
  height: 38px;
`;

const TextArea = styled.textarea`
  ${baseCss}
  max-width: calc(400px - 16px - 4px);
`;

const Button = styled.button`
  ${baseCss}
  max-width: 400px;
  font-weight: bold;
  cursor: pointer;
`;
