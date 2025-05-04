import { Button } from "../components/Button";
import { useTaskStore } from "../store/taskStore";

import Card from "../components/Card";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const [toggle1, setToggle1] = useState(false);
  const navigate = useNavigate();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="min-h-90 flex justify-center">
      <div>
        <Button
          title="add"
          variant="primary"
          size="md"
          onclick={() => {
            navigate("/addTask");
          }}
        />
        {tasks.map((items, key) => (
          <div className=" flex gap-4 flex-wrap">
            <Card
              key={key}
              title={items.title}
              status={items.status}
              description={items.description}
              tags={items.tags}
              recurrence={items.recurrence}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
