import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import './App.scss'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Agentic Task Manager</h1>
        <p>Create coding tasks for the agent to execute</p>
      </header>
      <main className="app-main">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  )
}

export default App
