import { createWritableStore } from "$lib/helpers/storage"

const _PERPAGE = 6

export const perpage = createWritableStore('perpage', (_PERPAGE - 1));//means 6 counting 0 index

export const updatePerpage = (amount) => {
    perpage.set((amount))
}
