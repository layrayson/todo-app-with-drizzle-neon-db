import { serial, text, timestamp, pgTable, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: text("task").notNull(),
  completed: boolean("completed").default(false),
});
