"use client";

import { useEffect, useState } from "react";
import { TaskForm } from "./_components/task-form";
import { TaskList } from "./_components/task-list";
import { EditTaskDialog } from "./_components/edit-task-dialog";
import { Task } from "./_components/types";

export default function Page() {
  const [ tasks, setTasks ] = useState<Task[]>( [] );
  const [ editingTask, setEditingTask ] = useState<Task | null>( null );
  const [ isEditDialogOpen, setIsEditDialogOpen ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( true );

  const handleTaskCreated = ( newTask: Task ) => {
    setTasks( ( prev ) => [ ...prev, newTask ] );
  };

  const handleTaskToggled = ( updatedTask: Task ) => {
    setTasks( ( prev ) =>
      prev.map( ( t ) => ( t.id === updatedTask.id ? updatedTask : t ) )
    );
  };

  const handleTaskDeleted = ( taskId: string ) => {
    setTasks( ( prev ) => prev.filter( ( t ) => t.id !== taskId ) );
  };

  const handleTaskUpdated = ( updatedTask: Task ) => {
    setTasks( ( prev ) =>
      prev.map( ( t ) => ( t.id === updatedTask.id ? updatedTask : t ) )
    );
  };

  const openEditDialog = ( task: Task ) => {
    setEditingTask( task );
    setIsEditDialogOpen( true );
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen( false );
    setEditingTask( null );
  };

  // Carregar tasks do backend
  useEffect( () => {
    const loadTasks = async () => {
      try {
        const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/tasks` );
        const data = await res.json();
        // setTasks( data );
        setTasks(data.tasks);
      } catch ( err ) {
        console.error( "Erro ao buscar tasks:", err );
      }
    };

    // Garante que o loader apareça por pelo menos 800ms para uma experiência mais suave
    Promise.all( [
      loadTasks(),
      new Promise( ( resolve ) => setTimeout( resolve, 800 ) ),
    ] ).finally( () => {
      setIsLoading( false );
    } );
  }, [] );

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Tarefas</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />

      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onTaskToggled={handleTaskToggled}
        onTaskDeleted={handleTaskDeleted}
        onEditTask={openEditDialog}
      />

      <EditTaskDialog
        task={editingTask}
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        onTaskUpdated={handleTaskUpdated}
      />
    </main>
  );
}
