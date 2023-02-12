import { writable } from "svelte/store"
import { createWritableStore } from "$lib/helpers/storage"

const expirationTime = new Date().getTime() + 1000 * 60; //1 minute 

export const userEggs = createWritableStore('userEggs',[],expirationTime)
export const eggApproval = writable(false)