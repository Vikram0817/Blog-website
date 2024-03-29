import { Client, Account, ID } from "appwrite";
import conf from "../config/conf";

const { appwriteURL, appwriteProjectId, appwriteDatabaseId, appwriteCollectionId, appwriteBucketId } = conf;

class AuthService {
    client = new Client();
    account;
    
    constructor() {
        this.client = new Client()
            .setEndpoint(appwriteURL)
            .setProject(appwriteProjectId);
        this.account = new Account(this.client);
    }

    async creatAccount({email, password, name}){
        try {
            const useAccount = await this.account.create(ID.unique(), email, password, name);
            if(useAccount){
                return this.login(email, password);
            }else{
                return useAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession();
            return true;
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;