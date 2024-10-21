"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";
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
        className="w-1/2 h-full hover:cursor-pointer"
        onClick={router.back}></div>
      <div
        className={`bg-slate-200 w-1/2 h-full transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } dark:bg-slate-800`}>
        <form className="p-10">
          <h2 className="text-2xl font-bold mb-4 dark:text-slate-200">
            Add To Do
          </h2>
          <div>
            <label>Task</label>
            <input
              type="text"
              placeholder="Task"
              className="p-2 rounded-md mb-4 w-full"
            />
          </div>
          <div>
            <label>Date Only</label>
            <input
              type="checkbox"
              checked={dateOnly}
              onChange={() => setDateOnly((prev) => !prev)}
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {!dateOnly && (
              <input
                type="text"
                placeholder="HH:mm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            )}
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {!dateOnly && (
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="HH:mm"
              />
            )}
          </div>
          <div>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">-- select --</option>
              <option value="household">Household</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="errands">Errands</option>
              <option value="study">Study</option>
              <option value="health">Health</option>
              <option value="hobbies">Hobbies</option>
              <option value="finance">Finance</option>
              <option value="projects">Projects</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label>Memo</label>
            <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
          </div>
          <Button variant="blue" className="mr-2">
            Submit
          </Button>
          <Button onClick={handleClose} variant="red">
            Close
          </Button>
        </form>
      </div>
    </div>
  );
}
