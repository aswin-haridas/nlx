// Text operation services

export const bookMark = async () => {
  const res = await window.api.book('book')
  console.log(res)
  if (res) {
    console.log(res.book)
  } else {
    console.error('Response from window.api.book is undefined')
  }
}

export const summarizeText = async (story, setStory) => {
  if (!story.trim()) return

  try {
    console.log('Story content (first 100 chars):', story.substring(0, 100) + '...')
    console.log('Content type:', typeof story)

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
  }
}

export const expandText = async (story, setStory) => {
  if (!story.trim()) return

  try {
    const result = await window.api.expand(story)

    if (result) {
      setStory(result)
    } else {
      setStory('Failed to expand text')
    }
  } catch (error) {
    console.error('Error during text expansion:', error)
    setStory('An error occurred while expanding the text')
  }
}

export const shortenText = async (story, setStory) => {
  if (!story.trim()) return

  try {
    const result = await window.api.shorten(story)

    if (result) {
      setStory(result)
    } else {
      setStory('Failed to shorten text')
    }
  } catch (error) {
    console.error('Error during text shortening:', error)
    setStory('An error occurred while shortening the text')
  }
}

export const saveText = async (story) => {
  try {
    if (!story.trim()) {
      console.log('Nothing to save, text is empty')
      return
    }

    console.log('Saving text to Brain:', story)

    const savedNotes = localStorage.getItem('brain-notes')
    let notes = savedNotes ? JSON.parse(savedNotes) : []

    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString()
    const title = formattedDate

    const pastelColors = [
      '#FFD1DC',
      '#B5EAD7',
      '#C7CEEA',
      '#FFDAC1',
      '#E2F0CB',
      '#F0E6EF',
      '#F9E2AE'
    ]
    const randomColorIndex = Math.floor(Math.random() * pastelColors.length)

    const newNote = {
      id: Date.now(),
      title: title,
      content: story,
      color: pastelColors[randomColorIndex]
    }

    notes.push(newNote)
    localStorage.setItem('brain-notes', JSON.stringify(notes))

    console.log('Note saved successfully to Brain')
  } catch (error) {
    console.error('Error saving to Brain:', error)
  }
}
