import { useState } from 'react'
import { createTask } from '../../services/taskService'
import { useAuth } from '../../hooks/useAuth'
import styles from './styles.module.scss'

export function TaskForm() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !user) return

    setIsSubmitting(true)
    setError(null)

    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        userId: user.uid,
        userDisplayName: user.displayName,
        userPhotoUrl: user.photoURL,
      })
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Task</h2>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Change header background to blue"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details or instructions for the agent..."
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting || !title.trim()}>
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  )
}
