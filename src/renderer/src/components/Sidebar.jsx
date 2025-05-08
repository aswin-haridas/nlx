import { BookMarked, House, Save, Sparkles } from 'lucide-react'
import useMemory from '../core/store'

export const SideBar = () => {
  const story = useMemory((state) => state.story)
  const setStory = useMemory((state) => state.setStory)
  const loading = useMemory((state) => state.loading)
  const setLoading = useMemory((state) => state.setLoading)

  const bookMark = async () => {
    const res = await window.api.book('book')
    console.log(res)
    // Check if res is defined before accessing res.book
    if (res) {
      // Proceed to use res.book
      console.log(res.book)
    } else {
      // Handle the case where res is undefined, e.g., log an error
      console.error('Response from window.api.book is undefined')
    }
  }

  const summarizeText = async () => {
    if (!story.trim()) return

    try {
      console.log('Story content (first 100 chars):', story.substring(0, 100) + '...')
      console.log('Content type:', typeof story)

      setLoading(true)
      const result = await window.api.summarize(story)
      console.log('Summarizing result:', result)

      if (result) {
        setStory(result)
      } else {
        setStory('Failed to generate summary')
      }
    } catch (error) {
      console.error('Error during summarization:', error)
      setStory('An error occurred while generating the summary')
    } finally {
      setLoading(false)
    }
  }
  const saveText = async () => {
    console.log('Saving text:', story)
  }

  const icons = [
    { icon: House, onClick: null },
    { icon: Sparkles, onClick: summarizeText },
    { icon: Save, onClick: saveText },
    { icon: BookMarked, onClick: bookMark }
  ]

  return (
    <div className="fixed right-0 h-screen flex">
      <div className="relative">
        <div className="w-2 h-screen bg-[#202020]"></div>
        <div className="absolute w-2 h-screen left-0 top-0 bg-[#171717] rounded-r-xl"></div>
      </div>
      <div className="h-screen w-fit flex flex-col items-center justify-center bg-[#202020] p-1">
        <div className="space-y-4 text-[#a0a0a0]">
          {icons.map((item, index) => (
            <div
              key={index}
              className={`p-1 hover:bg-[#3e3e3e] rounded-md cursor-pointer ${
                loading && item.icon === Sparkles ? 'animate-pulse' : ''
              }`}
              onClick={item.onClick}
            >
              <item.icon size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
