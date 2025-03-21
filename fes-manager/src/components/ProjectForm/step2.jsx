import React, { useState } from "react";
import useProjectFormStore from "../../store/useProjectFormStore";

const Step2 = () => {
  const { updateFormData, setStep, formData, addTask, removeTask } =
    useProjectFormStore();
  const [taskName, setTaskName] = useState("");
  const [taskAmount, setTaskAmount] = useState("");
  const [error, setError] = useState("");

  // Calculate total allocated percentage
  const totalAllocated = formData.tasks.reduce(
    (sum, task) => sum + (task.amount / formData.fundingGoal) * 100,
    0
  );

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.fundingGoal || !formData.currentFunds) {
      setError("Please fill in all required fields.");
      return;
    }
    setStep(3);
  };

  const handleAddTask = () => {
    if (!taskName || !taskAmount) {
      setError("Task name and amount are required.");
      return;
    }

    const taskValue = parseFloat(taskAmount);
    if (isNaN(taskValue) || taskValue <= 0) {
      setError("Enter a valid amount for the task.");
      return;
    }

    if (totalAllocated + (taskValue / formData.fundingGoal) * 100 > 100) {
      setError("Total task allocation cannot exceed 100% of the project budget.");
      return;
    }

    addTask({ name: taskName, amount: taskValue });
    setTaskName("");
    setTaskAmount("");
    setError("");
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Funding Goal */}
      <div>
        <label className="block font-medium">Total Project Budget ($)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={formData.fundingGoal}
          onChange={(e) => updateFormData("fundingGoal", e.target.value)}
          required
        />
      </div>

      {/* Current Funds Raised */}
      <div>
        <label className="block font-medium">Current Funds Raised ($)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={formData.currentFunds}
          onChange={(e) => updateFormData("currentFunds", e.target.value)}
          required
        />
      </div>

      {/* Task Breakdown Section */}
      <div className="mt-4 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Task Breakdown</h3>
        <p className="text-sm text-gray-600">
          Define tasks within the project. FES-Manager will calculate their percentage
          from the total budget.
        </p>

        {/* Task Inputs */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Task Name"
            className="border p-2 flex-1 rounded"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Task Amount ($)"
            className="border p-2 w-32 rounded"
            value={taskAmount}
            onChange={(e) => setTaskAmount(e.target.value)}
          />
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-2 rounded"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        {formData.tasks.length > 0 && (
          <ul className="mt-3 space-y-2">
            {formData.tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {task.name} - ${task.amount} (
                  {((task.amount / formData.fundingGoal) * 100).toFixed(2)}%)
                </span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeTask(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Total Allocation Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${totalAllocated}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {totalAllocated.toFixed(2)}% of budget allocated
        </p>
      </div>

      {/* Next Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Next: Trust & Verification
      </button>
    </form>
  );
};

export default Step2;
