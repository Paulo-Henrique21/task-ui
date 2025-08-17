"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onTaskToggled: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskItem({
  task,
  onTaskToggled,
  onTaskDeleted,
  onEditTask,
}: TaskItemProps) {
  const handleToggle = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updated = await res.json();
      onTaskToggled(updated);

      toast.success(
        updated.completed ? "Tarefa concluída!" : "Tarefa reaberta!",
        {
          description: (
            <span
              className={updated.completed ? "text-green-600" : "text-blue-600"}
            >
              {updated.title} foi{" "}
              {updated.completed ? "marcada como concluída" : "reaberta"}.
            </span>
          ),
        }
      );
    } catch (error) {
      toast.error("Erro ao atualizar tarefa", {
        description: (
          <span className="text-red-400">
            Não foi possível atualizar o status da tarefa.
          </span>
        ),
      });
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: "DELETE",
      });
      onTaskDeleted(task.id);

      toast.success("Tarefa excluída!", {
        description: (
          <span className="text-red-500 font-medium">
            A tarefa {task.title} foi removida da sua lista.
          </span>
        ),
      });
    } catch (error) {
      toast.error("Erro ao excluir tarefa", {
        description: "Não foi possível excluir a tarefa. Tente novamente.",
      });
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  return (
    <li className="flex justify-between items-center border px-3 py-2 rounded-lg">
      <span
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
        onClick={handleToggle}
      >
        {task.title}
      </span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onEditTask(task)}>
          <Edit className="w-4 h-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso irá excluir
                permanentemente a tarefa {task.title}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
