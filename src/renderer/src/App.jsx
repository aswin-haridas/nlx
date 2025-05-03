import EditorComponent from './components/Editor'
import SideBar from './components/SideBar'

function App() {
  return (
    <>
      <div className="flex w-[100%] h-screen">
        <div className="flex-1 w-full m-2 pr-10">
          <EditorComponent />
        </div>
        <SideBar />
      </div>
    </>
  )
}

export default App
