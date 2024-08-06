import TodoList from "@/lib/components/TodoList";
import { SectionPadding } from "@/lib/components/wrappers/SectionPadding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Todo App`,
  description: `Write your Todos`,
};

export default function Home() {
  return (
    <SectionPadding>
      <TodoList />
    </SectionPadding>
  );
}
