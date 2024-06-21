import React ,{ useEffect , useState} from 'react'
import { PostCard  , Container } from '../components'
import appwriteService from '../appwrite/config'
// import Container from '../components'


function AllPosts() {
    const [posts , setPost] = useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if (posts){

                setPost(posts.documents)
            }
        })

    } , [])
    console.log(posts)
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                     </div>
                ))}
            </div>

        </Container>

    </div>
  )
}

export default AllPosts