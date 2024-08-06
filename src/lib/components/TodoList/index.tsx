"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ViewTodos } from "./ViewTodos";
import { Create } from "@mui/icons-material";
import { useState } from "react";
import { AddOrUpdateModal } from "./Modals/AddOrUpdateTodo";

const TodoList = () => {
  const [openCreateNewTodo, setOpenCreateNewTodo] = useState(false);
  return (
    <Box py={4}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Todos
        </Typography>

        <Box>
          <Button
            variant="contained"
            onClick={() => setOpenCreateNewTodo(true)}
          >
            Create &nbsp; <Create />
          </Button>
        </Box>
      </Box>
      <Box marginTop={8}>
        <ViewTodos />
      </Box>
      {openCreateNewTodo && (
        <AddOrUpdateModal
          open={openCreateNewTodo}
          handleClose={() => setOpenCreateNewTodo(false)}
        />
      )}
    </Box>
  );
};

export default TodoList;
