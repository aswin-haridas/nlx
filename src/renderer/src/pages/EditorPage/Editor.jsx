import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import useMemory from '../../core/store'
import useLocalStorage from '../../hooks/useLocalStorage'

const ws = new WebSocket('ws://localhost:8080') // Replace with your WebSocket server address

ws.onopen = () => {
  console.log('WebSocket connection opened')
  ws.send('Hello from Electron!')
}

ws.onmessage = (event) => {
  console.log('Received message:', event.data)
}

ws.onclose = () => {
  console.log('WebSocket connection closed')
}

ws.onerror = (error) => {
  console.error('WebSocket error:', error)
}

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
