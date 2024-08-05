import { eq } from "drizzle-orm";
import { db } from "../db";
import { todos } from "../schema";

const handleError = (error: any) => {
  throw new Error("An error occurred while processing your request.");
};

export const fetchTodos = async () => {
  try {
    return await db.select().from(todos).execute();
  } catch (error) {
    handleError(error);
  }
};

export const addTodo = async (task: string) => {
  try {
    return await db.insert(todos).values({ task }).returning().execute();
  } catch (error) {
    handleError(error);
  }
};

export const updateTodo = async (
  id: number,
  task: string,
  completed: boolean
) => {
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

export const deleteTodo = async (id: number) => {
  try {
    return await db.delete(todos).where(eq(todos.id, id)).returning().execute();
  } catch (error) {
    handleError(error);
  }
};
