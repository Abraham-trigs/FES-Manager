import React from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step2 = () => {
  const { updateFormData, setStep, formData, addTask, removeTask } = useAddProjectFormStore();
  const [error, setError] = React.useState("");

  const handleNext = (e) => {
    e.preventDefault();

    // Validate funding goal and current funds
    if (!formData.fundingGoal || !formData.currentFunds) {
      setError("Please provide both funding goal and current funds.");
      return;
    }

    // Validate tasks
    if (formData.tasks.length === 0) {
      setError("Please add at least one task.");
      return;
    }

    // Move to next step if all is valid
    setStep(3); // Go to Step 3
  };

  const handleAddTask = () => {
    addTask({ name: "", amount: "" });
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks[index][field] = value;
    updateFormData("tasks", updatedTasks);
  };

  const handleRemoveTask = (index) => {
    removeTask(index);
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block font-medium">Funding Goal</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={formData.fundingGoal}
          onChange={(e) => updateFormData("fundingGoal", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Current Funds</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={formData.currentFunds}
          onChange={(e) => updateFormData("currentFunds", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Tasks</label>
        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>

        {formData.tasks.map((task, index) => (
          <div key={index} className="flex justify-between items-center space-x-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Task Name"
                value={task.name}
                onChange={(e) => handleTaskChange(index, "name", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Amount"
                value={task.amount}
                onChange={(e) => handleTaskChange(index, "amount", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveTask(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Next: Verify & Submit
      </button>
    </form>
  );
};

export default Step2;
