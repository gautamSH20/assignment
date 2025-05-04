import React from "react";

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

const Card: React.FC<Task> = ({
  title,
  description,
  status,
  tags,
  recurrence,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          Status: {status}
        </span>
        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
          Tags: {tags}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-700">Recurrence:</h3>
        {recurrence.length === 0 ? (
          <p className="text-gray-500 text-sm">No recurrence data</p>
        ) : (
          recurrence.map((rec: any, index: any) => (
            <div
              key={index}
              className="bg-gray-50 p-3 rounded-lg border border-gray-200"
            >
              <p className="text-sm text-gray-700">
                <strong>Frequency:</strong> {rec.frequency}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Interval:</strong> {rec.interval}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Start:</strong> {rec.startDate}
              </p>
              {rec.endDate && (
                <p className="text-sm text-gray-700">
                  <strong>End:</strong> {rec.endDate}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
