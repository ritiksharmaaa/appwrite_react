import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue ,getValues , control } = useForm({
    // we pass those value which we want to pass it || here we have to know about may be user came for update so pasiing defaut val is not good because sometime  we are passing a update data like put in form . so we put dynamic data in defualt val
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || " ",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  // console.log( "i am coming ", getValues('content'))
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log("====================== id user data is commingor not ======== " , userData)

  const submit = async (data) => {
    // console.log(data , "---------------------------------check what data came from form--------------")
    if (post) {
      console.log("post iside update button run or not " , post)
      const file =  data.image[0]
        ?  await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        // if we are update a post so first we have to dele those img which we made at time of creation  so that why at the time of post we have to delete first previos img than we uploard agin in update way .
        appwriteService.deleteFile(post.featureimage);
      }
      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featureimage: file ? file.id : undefined,
      });
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      //  always do first uplord file  or use upper method it optional but good practice
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        // console.log("--------------------file-----------upload succefully we are furethure running code -----------")
        delete data.image;
        const fileId = file.$id;
        const datatosend = {
          ...data,
          userid : userData?.$id,
          featureimage : fileId 
        }
        const datas = JSON.stringify(datatosend)
        // console.log(datas)
        const dbpost = await appwriteService.createPost({
          // ...data,
          // userId: userData.$id,
          datas
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

//    uper button closed 

  const slugTransform = useCallback((value)=>{
    if (value && typeof(value) === 'string')
        // const slug = value.toLowerCase().replace(/ /g, '-') way of slugify 
        return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]/g,'-')
        .replace(/\s/g,'-')
        //  '''is writen by chat gpt '''
    return " ";
    
  } , []);
  React.useEffect(()=>{
    const subscription = watch((value , {name})=>{
        if (name === 'title'){
            setValue('slug' , slugTransform(value.title , {shouldValidate : true }))
        }
    })
    //  her we can give any name not subscribe to call any function 
    return () => {
        // so we have to unsubscribe  it agood method to optemize so it caan not came under loop . 
        subscription.unsubscribe 
    }

  }, [watch , slugTransform , setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="border">
      </div>
        <div className="w-2/3 px-2">
            <Input
            label="Title"
            placeholder='Title'
            className='mb-4'
            {...register('title' , {
              required : true,
              
            })}
            />
            <Input
            label="slug"
            placeholder='slug'
            className='mb-4'
            {...register('slug' , {
              required : true,
              
            })}
            onInput={(e)=>{
              setValue('slug' , slugTransform(e.currentTarget.value) , {
                shouldValidate : true 
              });
            }}
            />

            <RTE 
            label='content :' 
            name='content'
            control={control}
            defaultValue={getValues('content')}
            
            />
        </div>
        
        <div>

        <div className="w-5/3 px-2">
          <Input 
          label="Feature Image"
          type='file'
          className='mb-3'
          accept="image/png, image/jpg, image/jpeg , image/gif"
          {...register('image', { required : !post})}
          
          />

          {post && (
            <div className="w-full mb-4">
              <img src={appwriteService.getFilePreview(post.featureimage)} alt={post.title} className="round-lg" />

            </div>
          )}

        </div>
        <div className="w-5/3 px-2 mt-6">
        <Select
        options={['active' ,'inactive']}
        label="Status"
        className="mb-4"
        {...register('status' , {required : true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined } className="w-full  mt-5">
          {post ? "Update" : "Submit"}


        </Button>
        </div>
        </div>

    </form>
  )
}

export default PostForm;
