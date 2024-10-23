"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, Label, Select, Textarea } from "@/components";
import { Todo } from "../todo-type";

export default function AddTodo() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [dateOnly, setDateOnly] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex dark:bg-white dark:bg-opacity-50">
      <div
        className="w-2/3 h-full hover:cursor-pointer"
        onClick={router.back}></div>
      <div
        className={`bg-slate-200 w-1/3 h-full transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } dark:bg-slate-700`}>
        <form className="p-10 ">
          <h2 className="text-2xl font-bold mb-4 dark:text-slate-200">
            Add To Do
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Task</Label>
              <Input type="text" placeholder="Task" />
            </div>
            <div className="flex items-center gap-2">
              <Label>Date Only</Label>
              <Input
                type="checkbox"
                checked={dateOnly}
                onChange={() => setDateOnly((prev) => !prev)}
                className="w-5 h-5"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                {!dateOnly && (
                  <Input
                    type="text"
                    placeholder="HH:mm"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-1/3"
                  />
                )}
              </div>
            </div>
            <div>
              <Label>End Date</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                {!dateOnly && (
                  <Input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="HH:mm"
                    className="w-1/3"
                  />
                )}
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Select
                className="w-1/3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">-- Select --</option>
                <option value="household">Household</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="errands">Errands</option>
                <option value="study">Study</option>
                <option value="health">Health</option>
                <option value="hobbies">Hobbies</option>
                <option value="finance">Finance</option>
                <option value="projects">Projects</option>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select
                className="w-1/3"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </div>

            <div>
              <Label>Memo</Label>
              <Textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>
          </div>
          <div className="my-10">
            <Button variant="blue" className="mr-2">
              Submit
            </Button>
            <Button onClick={handleClose} variant="red">
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
