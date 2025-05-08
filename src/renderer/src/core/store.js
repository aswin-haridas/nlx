import { create } from 'zustand'

const useMemory = create((set, get) => ({
  story: '',
  loading: false,
  setStory: (story) => set({ story }),
  setLoading: (loading) => set({ loading }),
  getStory: () => get().story
}))

export default useMemory
