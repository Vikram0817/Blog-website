import { Client, Databases, ID, Query, Storage } from "appwrite";
import {appwriteURL, appwriteCollectionId, appwriteProjectId, appwriteDatabaseId, appwriteBucketId} from "../config/conf"


// Using classes makes it super easy and efficient to make new methods inside the classs that uses instances like client and database again and again  because we then don't have to call/init/define them again and again
export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){  
        this.client
            .setEndpoint(appwriteURL) // Your API Endpoint
            .setProject(appwriteProjectId) // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await databases.createDocument(appwriteDatabaseId, appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            });
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(appwriteDatabaseId, appwriteCollectionId, slug, {
                title, 
                content, 
                featuredImage, 
                status, 
                userId
            })
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(appwriteDatabaseId, appwriteCollectionId, slug)
            return true;
        } catch (error) {
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(appwriteDatabaseId, appwriteCollectionId, slug)
        } catch (error) {
            throw error;
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(appwriteDatabaseId, appwriteCollectionId, 
            [
                Query.equal("status", "active")
            ]
            )
        } catch (error) {
            throw error;
        }
    }

    // file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Apprite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
           await this.bucket.deleteFile(appwriteBucketId, fileId)
           return true; 
        } catch (error) {
            console.log("Apprite service :: uploadFile :: error", error);
            return false;  
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(appwriteBucketId, fileId);
        } catch (error) {
            console.log("Apprite service :: uploadFile :: error", error);
            return false;
        }
    }
}

const service = new Service();

export default service;