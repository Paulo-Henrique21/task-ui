"use client";

import { TaskItem } from "./task-item";
import { Plus, Loader2 } from "lucide-react";
import { Task } from "./types";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onTaskToggled: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskList({
  tasks,
  isLoading,
  onTaskToggled,
  onTaskDeleted,
  onEditTask,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-start gap-1.5 h-6 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p className=" text-md">Carregando tarefas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">Nenhuma tarefa foi criada ainda.</p>
        <p className="text-gray-400 text-sm">Crie sua primeira tarefa acima!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskToggled={onTaskToggled}
          onTaskDeleted={onTaskDeleted}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}
