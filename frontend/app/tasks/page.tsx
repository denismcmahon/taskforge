"use client";

import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "@/lib/api";

interface Task {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchTasks().then(setTasks).catch(console.error);
    }, []);

    async function handleAddTask(e: React.FormEvent) {
        e.preventDefault();
        if(!title.trim()) return;

        const newTask = await createTask(title, description);
        setTasks((prev) => [...prev, newTask]);
        setTitle("");
        setDescription("");
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">TaskForge Tasks</h1>

            <form onSubmit={handleAddTask} className="mb-6 space-y-2">
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="w-full p-2 border rounded"
                />
                <input 
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task description"
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Task
                </button>
            </form>

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className="p-3 border rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="font-medium">{task.title}</p>
                            {task.description && (
                                <p className="text-sm text-gray-600">{task.description}</p>
                            )}
                        </div>
                        <span
                            className={`px-2 py-1 rounded text-sm ${
                                task.completed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {task.completed ? "Done" : "Pending" }
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}