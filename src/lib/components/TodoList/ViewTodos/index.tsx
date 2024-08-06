"use client";
import { useFetchTodos } from "@/lib/hooks";
import { Box } from "@mui/material";
import { TodoTile } from "../TodoTile";

type Props = {};
export const ViewTodos = ({}: Props) => {
  const { data: todos, isLoading, refetch } = useFetchTodos();

  return (
    <Box>
      {todos?.map((el) => (
        <TodoTile key={el.id} todo={el} />
      ))}
    </Box>
  );
};
