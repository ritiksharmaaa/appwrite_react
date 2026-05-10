import React , {useEffect  ,  useState }  from 'react'
import { Link } from "react-router-dom";
import appwriteService from '../appwrite/config'
import { Container , PostCard  } from '../components'

function Home() {
    const [posts , setPosts ] = useState([])

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })

    } , [])
    if (posts.length === 0){
        return (
        <div className="w-full py-8 mt-4 text-center">
            <Container> 
                <div className="flex flex-wrap">
                    <div className="py-2 w-full">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Publish smarter. Grow faster.
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Sign in to read posts, share your story, and turn your blog into
                            business.
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-3">
                          <Link
                            to="/login"
                            className="rounded-full bg-black px-5 py-2 text-white hover:bg-gray-800"
                          >
                            Log in
                          </Link>
                          <Link
                            to="/singup"
                            className="rounded-full border border-black px-5 py-2 text-black hover:bg-gray-100"
                          >
                            Create account
                          </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div> )
    }
  return (
    <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
 
  )
}

export default Home
