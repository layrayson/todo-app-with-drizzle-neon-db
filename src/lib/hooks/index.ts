import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  CreateTodoInput,
  DeleteTodoInput,
  FetchTodosResponse,
  TodoInterface,
  UpdateTodoInput,
} from "../types";
import { TodoService } from "../server/api";

const todoService = new TodoService();

export const useFetchTodos = (
  options?: UseQueryOptions<FetchTodosResponse | undefined>
) => {
  return useQuery({
    queryKey: ["fetch-todos"],
    queryFn: () => todoService.fetchTodos(),
    ...options,
  });
};

export const useCreateTodo = (
  options?: Omit<
    UseMutationOptions<
      TodoInterface | undefined,
      unknown,
      CreateTodoInput,
      unknown
    >,
    "mutationFn"
  >
) =>
  useMutation({
    mutationFn: (params: CreateTodoInput) => todoService.addTodo(params),
    ...options,
  });

export const useUpdateTodo = (
  options?: Omit<
    UseMutationOptions<
      TodoInterface | undefined,
      unknown,
      UpdateTodoInput,
      unknown
    >,
    "mutationFn"
  >
) =>
  useMutation({
    mutationFn: (params: UpdateTodoInput) => todoService.updateTodo(params),
    ...options,
  });

export const useDeleteTodo = (
  options?: Omit<
    UseMutationOptions<
      TodoInterface | undefined,
      unknown,
      DeleteTodoInput,
      unknown
    >,
    "mutationFn"
  >
) =>
  useMutation({
    mutationFn: (params: DeleteTodoInput) => todoService.deleteTodo(params),
    ...options,
  });
