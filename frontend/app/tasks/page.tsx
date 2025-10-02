'use client';

import { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export default function TasksPage() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (token) {
      fetchTasks(token).then(setTasks).catch(console.error);
    }
  }, [token]);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !token) return;

    const newTask = await createTask(token, title, description);
    setTasks((prev) => [...prev, newTask]);
    setTitle('');
    setDescription('');
  }

  async function handleToggleComplete(id: string, completed: boolean) {
    if (!token) return;
    const updated = await updateTask(token, id, { completed: !completed });
    setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
  }

  async function handleDelete(id: string) {
    if (!token) return;
    await deleteTask(token, id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  }

  if (!token) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">You must log in to view tasks.</p>
        <a href="/login" className="text-blue-600 underline">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        {/* New Task Form */}
        <form onSubmit={handleAddTask} className="mb-6 space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full p-3 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="w-full p-3 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task._id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>
                  {task.title}
                </p>
                {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                  className={`px-2 py-1 rounded text-sm ${
                    task.completed ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {task.completed ? 'Mark Pending' : 'Mark Done'}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-2 py-1 rounded text-sm bg-red-100 text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
