import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const UserStore = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
})

const useUserStore = create(devtools(persist(UserStore, {
    name: "user"
})))

export default useUserStore