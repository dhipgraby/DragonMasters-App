import { writable } from "svelte/store"
import { createWritableStore } from "$lib/helpers/storage"

export const userEggs = createWritableStore('userEggs',[])
export const eggApproval = writable(false)