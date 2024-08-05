import { eq } from "drizzle-orm";
import { db } from "../db";
import { todos } from "../schema";
import {
  CreateTodoInput,
  DeleteTodoInput,
  FetchTodosResponse,
  UpdateTodoInput,
} from "@/lib/types";

const handleError = (error: any) => {
  throw new Error("An error occurred while processing your request.");
};

export class TodoService {
  fetchTodos = async (): Promise<FetchTodosResponse | undefined> => {
    try {
      return await db.select().from(todos).execute();
    } catch (error) {
      handleError(error);
    }
  };

  addTodo = async ({ task }: CreateTodoInput) => {
    try {
      return await db.insert(todos).values({ task }).returning().execute();
    } catch (error) {
      handleError(error);
    }
  };

  updateTodo = async ({ id, task, completed }: UpdateTodoInput) => {
    try {
      return await db
        .update(todos)
        .set({ task, completed })
        .where(eq(todos.id, id))
        .returning()
        .execute();
    } catch (error) {
      handleError(error);
    }
  };

  deleteTodo = async ({ id }: DeleteTodoInput) => {
    try {
      return await db
        .delete(todos)
        .where(eq(todos.id, id))
        .returning()
        .execute();
    } catch (error) {
      handleError(error);
    }
  };
}
