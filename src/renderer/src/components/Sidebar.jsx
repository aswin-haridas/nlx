import { BookMarked, House, Save, Sparkles } from 'lucide-react'
import useMemory from '../core/store'

export const SideBar = () => {
  const text = useMemory((state) => state.story)
  const setStory = useMemory((state) => state.setStory)

  const summarizeText = async () => {
    if (!text) return
    try {
      const result = await window.api.summarizeText(text)
      if (result) {
        setStory(result)
      }
    } catch (error) {
      console.error('Error summarizing text:', error)
    }
  }

  const icons = [
    { icon: House, onClick: null },
    { icon: Sparkles, onClick: summarizeText },
    { icon: Save, onClick: null },
    { icon: BookMarked, onClick: null }
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
              className="p-1 hover:bg-[#3e3e3e] rounded-md cursor-pointer"
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