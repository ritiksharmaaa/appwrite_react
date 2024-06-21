// import { Service } from "appwrite/types/service.js";
import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  // this bucket is called storage here .
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  // async createPost(...data) {
    // async createPost({ title, slug, content, featureimage, status, userid }) {
    async createPost({datas}) {
    // const data =  {
    //   title,
    //   content,
    //   featureimage,
    //   status,
    //   userid,
    // }
    console.log(datas , "this data is coming in config file ")
  // async createPost({datas}) {
    try {
      const documentId =  'unique()'; 
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        // {
        // i am tring this way to solve actual we giving extra field dat which we have to delete in form data 
        // via delete formdata.field ; this will delete the data .
        //   slug,
        //   title,
        //   content,
        //   featureimage,
        //   status,
        //   userid

        // }
        // ...data.title
        datas,
      
      );
    } catch (error) {
      console.log("apperite service :: createpost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("apperite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite service :: deletepost :: errorfrom service", error);
      return false;
    }
  }

  //  get one data so get method .

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite service :: getpost :: error from services", error);
    }
  }

  // query bsed get data  her we can pass multiple query . array .

  // statud is key index which we create .
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        // [you write whole ueries there]
        queries
        // this number is actually pagination .
        // 100,
        // 0,
      );
    } catch (error) {
      console.log("apperite service :: getposts with query  :: error", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("apperite service :: UploadFile t :: error");
      return false;
    }
  }

  async deleteFile(fileid) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileid);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileid) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileid);
  }
}
const service = new Service();
export default service;
