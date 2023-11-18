import { Service } from "appwrite/types/service.js";
import conf from "../conf.js";
import { Client, ID  , Databases , Storage , Query  } from "appwrite";


export class Service{
    client = new Client();
    databases ;
    // this bucket is called storage here . 
    bucket ; 
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new  Storage(this.client)

        
        
    }
    async createPost({title , slug , content , featureImage , status ,userId}){
        
        try{
            return  await this.databases.createDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId,
                slug,
                {
                    title ,
                    content ,
                    featureImage,
                    status ,
                    userId 
                    
                    
                }
            )

    
        } catch (error){
            console.log("apperite service :: createpost :: error");
        }
        
    }
    
    async updatePost(slug ,{title , slug , content , featureImage , status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug , 
                {
                    title,
                    content,
                    featureImage,
                    status,
                    
                    
                }

            )
            
            
        }catch (error){
            
            console.log("apperite service :: updatePost :: error");
        }
    }




    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug


            )
            return true 
            
        }catch (error){
            console.log("apperite service :: deletepost :: error");
            return false 
            
        }

    }
    
    
    //  get one data so get method . 
    
    
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
                )
                
                
            }catch (error){
                console.log("apperite service :: getpost :: error");
                
            }
    }


    
    // query bsed get data  her we can pass multiple query . array . 
    
    
    // statud is key index which we create .
    async getPosts(queries = [Query.equal('status' , "active")]){
        try{
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // [you write whole ueries there]
                queries,
                // this number is actually pagination . 
                100, 
                0, 
                


                )
        }catch(error){
            console.log("apperite service :: getposts with query  :: error");
            
        }
        
    }
    
    
    
    async uploadFile(file){
        try{
            return await this.bucket.createFile(conf.appwriteBucketId , ID.unique() , file)

            
        }catch(error){
            
            console.log("apperite service :: UploadFile t :: error");
            return false 
        }
    }


    async deleteFile(fileid){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileid,
            
            )
            return true 

        }catch(error){
            console.log(error)
            return false 

        }
    }



    async getFilePreview(file){
        return  await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileid,
        )
    }
}
    const service = new Service()
    export default  service ;