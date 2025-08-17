"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Task } from "./types";

interface EditTaskDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated: (updatedTask: Task) => void;
}

export function EditTaskDialog({
  task,
  isOpen,
  onClose,
  onTaskUpdated,
}: EditTaskDialogProps) {
  const [editTitle, setEditTitle] = useState("");

  // Atualiza o título quando a task muda
  useEffect(() => {
    if (task && isOpen) {
      setEditTitle(task.title);
    }
  }, [task, isOpen]);

  const handleEdit = async () => {
    if (!task || !editTitle.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle }),
      });
      const updated = await res.json();
      onTaskUpdated(updated);
      onClose();

      toast.success("Tarefa editada!", {
        description: (
          <span className="text-blue-600 font-medium">
            A tarefa foi atualizada para {updated.title}.
          </span>
        ),
      });
    } catch (error) {
      toast.error("Erro ao editar tarefa", {
        description: "Não foi possível salvar as alterações. Tente novamente.",
      });
      console.error("Erro ao editar tarefa:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setEditTitle("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Faça as alterações na sua tarefa aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Título da tarefa"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleEdit}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
