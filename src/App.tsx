import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import { UserMenu } from './components/UserMenu'
import { useAuth } from './hooks/useAuth'
import './App.scss'

function App() {
  const { user, loading } = useAuth()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Agentic Task Manager</h1>
            <p>Create coding tasks for the agent to execute</p>
          </div>
          <UserMenu />
        </div>
      </header>
      <main className="app-main">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading...</p>
          </div>
        ) : user ? (
          <>
            <TaskForm />
            <TaskList />
          </>
        ) : (
          <div className="login-prompt">
            <h2>Welcome to Agentic Task Manager</h2>
            <p>Sign in with GitHub to create and manage your coding tasks.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
