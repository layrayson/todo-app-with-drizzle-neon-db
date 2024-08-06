import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { todos } from "../schema";
import {
  CreateTodoInput,
  DeleteTodoInput,
  FetchTodosResponse,
  TodoInterface,
  UpdateTodoInput,
} from "@/lib/types";

const handleError = (error: any) => {
  throw new Error("An error occurred while processing your request.");
};

export class TodoService {
  fetchTodos = async (): Promise<FetchTodosResponse | undefined> => {
    try {
      return await db
        .select()
        .from(todos)
        .orderBy(desc(todos.createdAt))
        .execute();
    } catch (error) {
      handleError(error);
    }
  };

  addTodo = async ({
    task,
  }: CreateTodoInput): Promise<TodoInterface | undefined> => {
    try {
      const data = await db
        .insert(todos)
        .values({ task })
        .returning()
        .execute();

      return data[0];
    } catch (error) {
      handleError(error);
    }
  };

  updateTodo = async ({
    id,
    task,
    completed,
  }: UpdateTodoInput): Promise<TodoInterface | undefined> => {
    try {
      const data = await db
        .update(todos)
        .set({ task, completed })
        .where(eq(todos.id, id))
        .returning()
        .execute();

      return data[0];
    } catch (error) {
      handleError(error);
    }
  };

  deleteTodo = async ({
    id,
  }: DeleteTodoInput): Promise<TodoInterface | undefined> => {
    try {
      const data = await db
        .delete(todos)
        .where(eq(todos.id, id))
        .returning()
        .execute();
      return data[0];
    } catch (error) {
      handleError(error);
    }
  };
}
