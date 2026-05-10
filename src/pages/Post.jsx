import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import SafeImage from "../components/SafeImage";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthore = post && userData ? post.userid === userData.$id : false;
  const resolvedImageId =
    post?.featureimage || post?.featuredImage || post?.featureImage || "";

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        const fileId =
          post.featureimage || post.featuredImage || post.featureImage;
        if (fileId) appwriteService.deleteFile(fileId);
        navigate("/");
      }
    });
  };

  // console.log(post)

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex-justify-center mb-4 relative border rounded-xl p-2">
          <SafeImage
            src={appwriteService.getFilePreview(resolvedImageId)}
            alt={post.title}
            className="rounded-xl"
            fallbackSeed={post.$id || post.title}
            width={1200}
            height={630}
          />
          {isAuthore ? (
            <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                    <Button bgcolor="bg-green-500" className="mr-3">
                        Edit

                    </Button>
                
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>

            </div>
          ): null }
        </div>
        <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">
                {post.title}
            </h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
