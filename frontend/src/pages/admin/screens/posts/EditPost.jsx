import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getSinglePost, updatePost } from "../../../../services/posts";
import { useParams, Link } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import parseJsonToHtml from "./../../../../utils/parseJsonToHtml";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "./../../../../components/Editor/Editor";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utils/multiSelectTagUtils";

const promiseOptions = async (inputValue) => {
  const categoriesData = await getAllCategories();
  // console.log("Category data: ", categoriesData)
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const { slug } = useParams();
  const [photo, setPhoto] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);

  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["singlePost", slug],
  });

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({ updatedData, slug, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated!");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(data);

  useEffect(() => {
    if (!isError && !isLoading) {
      setInitialPhoto(data?.photo);
      // setBody(parseJsonToHtml(data?.body));
      setCategories(data.categories.map((item) => item.value));
    }
  }, [data, isError, isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  let isPostDataLoaded = !isLoading && !isError;

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }

    updatedData.append("document", JSON.stringify({ body, categories }));

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want you to delete your post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={`Could not fetch post!`} />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:gap-x-5 lg:items-start">
          <label htmlFor="postPicture" className="w-full cursor-pointer">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt={data?.title}
                className="rounded-xl w-full"
              />
            ) : initialPhoto ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                alt={data?.title}
                className="rounded-xl w-full"
              />
            ) : (
              <div className="w-full min-h-[200px] bg-blue-50 opacity-50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="postPicture"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleDeleteImage}
            className="w-fit bg-red-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
          >
            Delete Image
          </button>
          <div className="mt-4 flex gap-2">
            {data?.categories.map((category, index) => (
              <Link
                key={index}
                to={`/blog?category=${category.name}`}
                className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            {data?.title}
          </h1>
          {/* categories  */}
          <div className="my-5 w-full">
            {isPostDataLoaded && (
              <MultiSelectTagDropdown
                loadOptions={promiseOptions}
                defaultValue={data.categories.map(categoryToOption)}
                onChange={(newValue) =>
                  setCategories(newValue.map((item) => item.value))
                }
              />
            )}
          </div>

          {/* content  */}
          {/* <div className="mt-4 prose prose-sm sm:prose-base">{body}</div> */}
          <div className="w-full">
            {isPostDataLoaded && (
              <Editor
                content={data?.body}
                editable={true}
                onDataChange={(data) => {
                  setBody(data);
                }}
              />
            )}
          </div>
          <button
            disabled={isLoadingUpdatePostDetail}
            type="button"
            onClick={handleUpdatePost}
            className="w-full bg-green-500 text-white font-semibold  rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Update
          </button>
        </section>
      )}
    </div>
  );
};

export default EditPost;
