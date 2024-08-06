import TodoList from "@/lib/components/TodoList";
import { SectionPadding } from "@/lib/components/wrappers/SectionPadding";

export default function Home() {
  return (
    <SectionPadding>
      <TodoList />
    </SectionPadding>
  );
}
