import { useState } from "react";
import { Button } from "./Button";
import { useTaskStore } from "../store/taskStore";

interface Recurrence {
  frequency: string;
  interval: number;
  startDate: string;
  endDate?: string;
}

interface Task {
  title: string;
  description: string;
  status: string;
  tags: string;
  recurrence: Recurrence[];
}

const frequencies = ["daily", "weekly", "monthly", "yearly"];

const RecurrenceModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (rec: Recurrence) => void;
}) => {
  const [frequency, setFrequency] = useState("daily");
  const [interval, setInterval] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold">Recurrence Settings</h2>

        <div>
          <label className="block mb-1">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full border-2 border-black rounded-md p-1"
          >
            {frequencies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Interval</label>
          <input
            type="number"
            min={1}
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="w-full border-2 border-black rounded-md p-1"
          />
        </div>

        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border-2 border-black rounded-md p-1"
          />
        </div>

        <div>
          <label className="block mb-1">End Date (Optional)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border-2 border-black rounded-md p-1"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            title="Cancel"
            variant="secondary"
            size="md"
            onclick={onClose}
          />
          <Button
            title="Save"
            variant="primary"
            size="md"
            onclick={() =>
              onSave({
                frequency,
                interval,
                startDate,
                endDate: endDate || undefined,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export const AddTask = () => {
  const { createTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [recurrence, setRecurrence] = useState<Recurrence[]>([]);
  const [showRecModal, setShowRecModal] = useState(false);

  const handleAddTask = async () => {
    const newTask: Task = {
      title,
      description,
      status: "Pending",
      tags: "default",
      recurrence,
    };

    console.log(newTask);

    try {
      createTask(newTask);

      alert("Task added successfully!");
      setTitle("");
      setDescription("");
      setStartDate("");
      setRecurrence([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="fixed bg-black min-h-screen opacity-40 min-w-full z-10"></div>
      <div className="z-40 bg-white rounded-md p-4 flex flex-col gap-4">
        <section className="text-lg font-semibold">New Task to Add</section>

        <div>
          <label className="block mb-1">Task Name</label>
          <input
            type="text"
            className="border-2 border-black rounded-md p-1 w-full"
            placeholder="Add task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="border-2 border-black rounded-md p-1 w-full"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              className="border-2 border-black rounded-md p-1 w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1">Recurrence</label>
            <input
              readOnly
              className="border-2 border-black rounded-md p-1 w-full"
              value={
                recurrence.length
                  ? `${recurrence[0].frequency} every ${recurrence[0].interval} day(s)`
                  : "Set Recurrence"
              }
              onClick={() => setShowRecModal(true)}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse gap-4">
          <Button
            title="Add Task"
            variant="primary"
            size="md"
            onclick={handleAddTask}
          />
          <Button
            title="Cancel"
            variant="secondary"
            size="md"
            onclick={() => {
              setTitle("");
              setDescription("");
              setStartDate("");
              setRecurrence([]);
            }}
          />
        </div>
      </div>

      {showRecModal && (
        <RecurrenceModal
          onClose={() => setShowRecModal(false)}
          onSave={(rec) => {
            setRecurrence([rec]);
            setShowRecModal(false);
          }}
        />
      )}
    </div>
  );
};
