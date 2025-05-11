import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditorPage from './pages/EditorPage/EditorPage'
import Brain from './pages/BrainPage/Brain'
import BootPage from './pages/BootPage/Boot'
import PageTransition from './components/PageTransition'

function App() {
  return (
    <Router>
      <PageTransition>
        <Routes>
          <Route path="/" element={<BootPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/brain" element={<Brain />} />
        </Routes>
      </PageTransition>
    </Router>
  )
}

export default App
