"use client";
import { useFetchTodos } from "@/lib/hooks";
import { Box, CircularProgress, Typography } from "@mui/material";
import { TodoTile } from "../TodoTile";

type Props = {};
export const ViewTodos = ({}: Props) => {
  const { data: todos, isLoading } = useFetchTodos();

  return (
    <Box>
      {isLoading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingY={4}
        >
          <CircularProgress />
        </Box>
      ) : todos?.length == 0 ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingY={4}
        >
          <Typography variant="h5">You have no todos</Typography>
        </Box>
      ) : (
        todos?.map((el) => <TodoTile key={el.id} todo={el} />)
      )}
    </Box>
  );
};
