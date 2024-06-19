import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButton from "../../components/SocialShareButton";
import { useQuery } from "@tanstack/react-query";
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import { getSinglePost } from "../../services/posts";
import parse from "html-react-parser";

const postData = [
  {
    _id: "1",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "random date",
  },
  {
    _id: "2",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "random date",
  },
  {
    _id: "3",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "random date",
  },
  {
    _id: "4",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "random date",
  },
];

const tags = [
  "Medical",
  "Education",
  "News",
  "Healthy",
  "Food",
  "Diet",
  "Technology",
];

const ArticleDetailPage = () => {
  const { slug } = useParams();

  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [body, setBody] = useState(null);

  const { data } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["singlePost"],
    onSuccess: (data) => {
      console.log(data);
      setBreadCrumbs([
        { name: "Home", link: `/` },
        { name: "Blog", link: `/blog` },
        { name: "Article Title", link: `/blog/${data.slug}` },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Bold, Italic, Paragraph, Document, Text])
        )
      );
    },
  });

  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbs} />
          <img
            src={
              data?.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                : images.samplePostImage
            }
            alt={data?.title}
            className="rounded-xl w-full"
          />
          <div className="mt-4 flex gap-2">
            {data?.categories.map((category) => (
              <Link
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
          {/* content  */}
          <div className="mt-4 prose prose-sm  sm:prose-base">
            {/* <p className="leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque. In egestas erat
              imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
              senectus et netus. Mattis pellentesque id nibh tortor id aliquet
              lectus proin.
            </p> */}
           {console.log(data?.body.caption)}
            {body}
          </div>
          {/* comments section  */}
          <CommentsContainer className="mt-10" loggedinUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            posts={postData}
            tags={tags}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          {/* social media buttons  */}
          <div className="mt-7">
            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
              Share on:
            </h2>
            <SocialShareButton
              url={encodeURI("https://twitter.com/iamyogess")}
              title={encodeURIComponent("Yogesh's X profile")}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;
