export interface Todo {
  id: number;
  task: string;
  category:
    | "household"
    | "work"
    | "personal"
    | "errands"
    | "study"
    | "health"
    | "hobbies"
    | "finance"
    | "projects";
  priority: "high" | "medium" | "low";
  dates: {
    startDate: string;
    endDate: string;
    dateOnly: boolean;
  };
  memo: string;
}
