export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    if(!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
}

export async function createTask(title: string, description?: string) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });
    if(!res.ok) throw new Error("Failed to create task");
    return res.json();
}