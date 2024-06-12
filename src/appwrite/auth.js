import conf from '../conf/conf.js';
import { Client , Account , ID } from "appwrite";


// const  client = new Client()

export class AuthService {
    client = new Client();
    account ;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)



    }

    async createAccount({email , password , name}){
        try{
             const userAccount = await this.account.create(ID.unique() , email , password , name)
             if (userAccount){
                // call another methods . or login to user o say succefully created . 
                // or call niche wala function 
                return  this.login({email , password})
                // return userAccount ;
             } else{
                return userAccount;
             }

        } catch(error){
            throw error ;
        }
    }

    async login({email, password}){
        try{
             return await this.account.createEmailSession(email , password)
        } catch {
            throw error ;
        }
    }

    async getCurrentUser(){
        //  here we check  current user that which we know so that function is already is create d. 4
        try{
            return await this.account.get() 
            //  but here case not handel what happen if not 


        }catch (error){
            console.log("appwrite service ;: getcurrentUser :: error" , error )
            // throw error ;
            
        }
        //  this is writen if user is not get so it return none 
        
        return null; 
    }
    
    
    //  for logout is delete sessionn , 
    async logout(){
        try{
           await  this.account.deleteSessions();
        }catch(error){
            
            console.log("appwrite service ;:log out  :: error" , error )
        }
    }
};

const authService = new AuthService();


export default authService ; 
