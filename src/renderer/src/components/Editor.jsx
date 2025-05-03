import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const content = ''
import useMemory from '../core/store'
import { useCallback, useMemo } from 'react'
const EditorComponent = () => {
  const story = useMemory((state) => state.story)
  const setStory = useMemory((state) => state.setStory)

  const extensions = useMemo(() => [StarterKit], [])

  const handleUpdate = useCallback(
    ({ editor }) => {
      const content = editor.getHTML()
      setStory(content)
    },
    [setStory]
  )

  const editor = useEditor({
    extensions,
    content: story || content,
    editorProps: {
      attributes: { class: 'prose prose-sm m-0 focus:outline-none dark:prose-invert ' }
    },
    onUpdate: handleUpdate
  })

  return <EditorContent editor={editor} />
}

export default EditorComponent
