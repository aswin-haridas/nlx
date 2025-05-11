import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import useMemory from '../../core/store'
import useLocalStorage from '../../hooks/useLocalStorage'

const EditorComponent = () => {
  const story = useMemory((state) => state.story)
  const setStory = useMemory((state) => state.setStory)
  const [storedStory, setStoredStory] = useLocalStorage('story', '')

  useEffect(() => {
    if (storedStory && !story) {
      setStory(storedStory)
    }
  }, [storedStory, story, setStory])

  const extensions = [StarterKit]

  const editor = useEditor({
    extensions,
    content: story || storedStory,
    editorProps: {
      attributes: { class: 'prose prose-sm m-0 focus:outline-none dark:prose-invert' }
    },
    autofocus: true,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setStory(html)
      setStoredStory(html)
      console.log(story)
    }
  })
  return <EditorContent editor={editor} />
}

export default EditorComponent
