import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Edit, Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'
import useMemory from '../../core/store'

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div
      className="fixed bottom-6 inset-x-0 mx-auto w-72 max-w-[18rem] backdrop-blur-md bg-[#1E1E1E]/70 rounded-full shadow-lg border border-[#2A2A2A]/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-[#aaaaaa]" size={16} />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-5 pl-10 bg-transparent rounded-full focus:outline-none text-sm"
          aria-label="Search notes"
        />
      </div>
    </motion.div>
  )
}

const Brain = () => {
  const [notes, setNotes] = useLocalStorage('brain-notes', [])
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const setStory = useMemory((state) => state.setStory)

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [notes, searchQuery])

  const handleEditNote = (note) => {
    setStory(note.content)
    navigate('/editor')
  }

  const handleDeleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter((note) => note.id !== id))
    }
  }

  return (
    <div className="relative min-h-screen mx-auto p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredNotes.map((note) => (
          <motion.div
            key={note.id}
            className="rounded-xl shadow-md relative flex flex-col overflow-hidden bg-[#121212] text-[#FFFFFF]"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full pb-[120%] relative">
              <div className="absolute inset-0 p-4 flex flex-col">
                <h3 className="mt-0 mb-2 text-lg font-semibold text-[#FFFFFF] line-clamp-2">
                  {note.title}
                </h3>
                <p className="mb-6 leading-relaxed text-xs text-[#DDDDDD] flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#4B5563] pr-2">
                  {note.content}
                </p>
                <div className="flex gap-1 absolute bottom-3 right-3">
                  <button
                    aria-label="Edit note"
                    className="bg-[#222222] border-none cursor-pointer w-6 h-6 rounded-full flex items-center justify-center opacity-70 transition-all hover:opacity-100 hover:bg-[#4B5563]"
                    onClick={() => handleEditNote(note)}
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    aria-label="Delete note"
                    className="bg-[#222222] border-none cursor-pointer w-6 h-6 rounded-full flex items-center justify-center opacity-70 transition-all hover:opacity-100 hover:bg-[#4B5563] text-[#FF4D4D]"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {filteredNotes.length === 0 && (
        <div className="text-center py-10 text-[#AAAAAA]">
          {notes.length === 0
            ? 'No notes found. Create your first note!'
            : 'No matching notes found.'}
        </div>
      )}
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <motion.button
        className="fixed bottom-6 right-6 bg-[#4B5563] rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate('/editor')}
        aria-label="Create new note"
      >
        <Plus size={24} className="text-[#FFFFFF]" />
      </motion.button>
    </div>
  )
}

export default Brain
