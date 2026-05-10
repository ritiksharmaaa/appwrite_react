import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import SafeImage from "./SafeImage";

function PostCard({
    $id , title , featureimage
}) {
  const resolvedImageId = featureimage;

  return (
    <Link to={`/post/${$id}`}>

    <div className='w-full  bg-gray-200 rounded-xl p-4'>
        <div className="w-full justify-center mb-4">
            <SafeImage
              src={appwriteService.getFilePreview(resolvedImageId)}
              alt={title}
              className="rounded-xl"
              fallbackSeed={$id || title}
              width={720}
              height={420}
            />


         </div>
         <h2 className='text-xl font-bold'>{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard
