import { atom } from "recoil";

export const loggedInState = atom({
    key: "loggedIn",
    default: false
})

export const userDataState = atom({
    key: "userData",
    default: { }
})