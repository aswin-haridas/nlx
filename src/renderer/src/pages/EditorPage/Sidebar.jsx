import { Brain, House, Save, Sparkles } from 'lucide-react'
import useMemory from '../../core/store'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { summarizeText, expandText, shortenText, saveText } from '../../services/textServices'

export const SideBar = () => {
  const story = useMemory((state) => state.story)
  const setStory = useMemory((state) => state.setStory)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownRef])

  // Navigation helpers
  const navigate = useNavigate()
  const goTo = (path) => () => navigate(path)

  const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index)

  const icons = [
    { icon: House, onClick: goTo('/') },
    {
      icon: Sparkles,
      onClick: null,
      dropdown: true,
      options: [
        { label: 'Summarize', action: () => summarizeText(story, setStory) },
        { label: 'Expand', action: () => expandText(story, setStory) },
        { label: 'Shorten', action: () => shortenText(story, setStory) }
      ]
    },
    { icon: Save, onClick: () => saveText(story) },
    { icon: Brain, onClick: goTo('/brain') }
  ]

  return (
    <div className="fixed right-0 h-screen">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="space-y-5 bg-[#121212] p-3 m-2 rounded-md">
          {icons.map((item, index) => (
            <div key={index} className="relative" ref={item.dropdown ? dropdownRef : null}>
              {item.dropdown ? (
                <>
                  <div
                    className="p-1 hover:bg-[#3e3e3e] rounded-md cursor-pointer"
                    onClick={() => toggleDropdown(index)}
                  >
                    <item.icon className="hover:text-[#BB86FC]" size={20} />
                  </div>
                  {openDropdown === index && (
                    <div className="absolute right-10 top-0 bg-[#333] rounded-md shadow-md z-10 w-36 py-2 text-white">
                      {item.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className="px-4 py-2 hover:bg-[#444] cursor-pointer"
                          onClick={() => {
                            option.action()
                            setOpenDropdown(null)
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="p-1 hover:bg-[#3e3e3e] rounded-md cursor-pointer"
                  onClick={item.onClick}
                >
                  <item.icon className="hover:text-[#BB86FC]" size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
