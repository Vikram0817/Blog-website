import { Client, Account, ID } from "appwrite";
import {appwriteURL, appwriteProjectId} from "../config/conf"

class AuthService {
    client = new Client();
    account;
    
    constructor() {
        this.client = new Client()
            .setEndpoint(appwriteURL)
            .setProject(appwriteProjectId);
        this.account = new Account(client);
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

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSession()
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;