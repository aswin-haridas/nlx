import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useMemory = create(
  persist(
    (set, get) => ({
      story: '',
      setStory: (story) => set({ story }),
      getStory: () => get().story,
      clearStory: () => set({ story: '' })
    }),
    {
      name: 'current-story'
    }
  )
)

export default useMemory
