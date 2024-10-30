export type TodoCategory =
  | "household"
  | "work"
  | "personal"
  | "errands"
  | "study"
  | "health"
  | "hobbies"
  | "finance"
  | "projects";

export type TodoPriority = "high" | "medium" | "low";

export interface InputTodo {
  id: number;
  task: string;
  category: TodoCategory;
  priority: TodoPriority;
  dates: {
    startDate: string;
    startTime?: string;
    endDate: string;
    endTime?: string;
    dateOnly: boolean;
  };
  memo: string;
}

export interface Todo {
  id: number;
  task: string;
  category: TodoCategory;
  priority: TodoPriority;
  startTimeStamp: string;
  endTimeStamp: string;
  memo: string;
}
