import React , {useEffect  , useEffect, useState }  from 'react'
import appwriteService from '../appwrite/config'
import { Container , PostCard  } from '../components'

function Home() {
    const [posts , setPosts ] = useState([])
    useEffect(()=>{
        appwriteService.getPost().then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })

    } , [])
    if (posts.length === 0){
        return 
        <div className="w-full py-8 mt-4 text-center">
            <Container> 
                <div className="flex flex-wrap">
                    <div className="py-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to Read post 
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    }
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div  keys={post.$id} className="py-2 w-1/4">
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home