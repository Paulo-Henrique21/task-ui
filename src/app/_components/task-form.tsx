"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { Task } from "./types";

const TaskFormSchema = z.object( {
  title: z
    .string()
    .min( 1, {
      message: "O título da tarefa é obrigatório.",
    } )
    .min( 3, {
      message: "O título deve ter pelo menos 3 caracteres.",
    } ),
} );

interface TaskFormProps {
  onTaskCreated: ( task: Task ) => void;
}

export function TaskForm( { onTaskCreated }: TaskFormProps ) {
  const form = useForm<z.infer<typeof TaskFormSchema>>( {
    resolver: zodResolver( TaskFormSchema ),
    defaultValues: {
      title: "",
    },
  } );

  const handleCreate = async ( data: z.infer<typeof TaskFormSchema> ) => {
    try {
      const res = await fetch( `${ process.env.NEXT_PUBLIC_API_URL }/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { title: data.title } ),
      } );

      const responseData = await res.json();

      if ( !res.ok ) {
        toast.error( "Erro ao criar tarefa", {
          description: (
            <span className="text-red-400">
              {responseData?.message || "Não foi possível criar a tarefa."}
            </span>
          ),
        } );
        return; // 🛑 Não adiciona na UI se deu erro
      }

      onTaskCreated( responseData ); // ✅ Só aqui adiciona
      form.reset();

      toast.success( "Tarefa criada com sucesso!", {
        description: (
          <span className="text-green-600 font-medium">
            A tarefa {data.title} foi adicionada à sua lista.
          </span>
        ),
      } );
    } catch ( error ) {
      toast.error( "Erro ao criar tarefa", {
        description: (
          <span className="text-red-400">
            Não foi possível criar a tarefa. Tente novamente.
          </span>
        ),
      } );
      console.error( "Erro ao criar tarefa:", error );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit( handleCreate )}
        className="flex gap-2 mb-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={( { field } ) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Digite a nova tarefa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
