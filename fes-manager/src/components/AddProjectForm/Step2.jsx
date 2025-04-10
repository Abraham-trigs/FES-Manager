import React from 'react';
import useAddProjectFormStore from '../../store/AddProjectFormStore'; // Zustand store

const Step2 = () => {
  // Zustand state & actions
  const { formData = {}, setFormData, errors = {} } = useAddProjectFormStore();
  const { tasks = [], fundingGoal = 0 } = formData;

  /**
   * Add an empty task object to the list
   */
  const addTask = () => {
    setFormData({
      ...formData,
      tasks: [...tasks, { name: '', amount: '' }],
    });
  };

  /**
   * Update individual task details (name or amount)
   * @param {number} index - Task index
   * @param {string} field - 'name' or 'amount'
   * @param {string|number} value - New value for the field
   */
  const updateTask = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setFormData({
      ...formData,
      tasks: updatedTasks,
    });
  };

  /**
   * Remove a task by index
   * @param {number} index
   */
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tasks: updatedTasks,
    });
  };

  /**
   * Set the funding goal from input
   */
  const handleFundingGoalChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setFormData({
      ...formData,
      fundingGoal: value,
    });
  };

  // Calculate how much of the funding goal is already allocated to tasks
  const totalAllocated = tasks.reduce((sum, task) => sum + Number(task.amount || 0), 0);
  const progress = fundingGoal > 0 ? (totalAllocated / fundingGoal) * 100 : 0;

  return (
    <div>
      <h2 className="text-lg font-semibold">Funding Details</h2>

      {/* Funding Goal Input */}
      <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700 mt-2">
        funding Goal $
      </label>
      <input
        type="number"
        id="fundingGoal"
        name="fundingGoal"
        value={fundingGoal}
        onChange={handleFundingGoalChange}
        placeholder="Enter funding goal"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.fundingGoal && <p className="text-red-500 text-sm">{errors.fundingGoal}</p>}

      {/* Task Inputs */}
      <h3 className="mt-4 text-md font-semibold">Add Task</h3>
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          {/* Task Name */}
          <input
            type="text"
            name={`task-name-${index}`}
            placeholder="Task Name"
            className="w-[50%] px-2 py-1 border rounded"
            value={task.name}
            onChange={(e) => updateTask(index, 'name', e.target.value)}
          />

          {/* Task Amount */}
          <input
            type="number"
            name={`task-amount-${index}`}
            placeholder="Amount"
            className="w-[50%] px-2 py-1 border rounded"
            value={task.amount}
            onChange={(e) => updateTask(index, 'amount', e.target.value)}
          />

          {/* Delete Task Button */}
          <button
            type="button"
            className="text-red-500"
            onClick={() => deleteTask(index)}
            aria-label={`Delete Task ${index + 1}`}
          >
            <div className="w-3 h-3 bg-[#f02929] rounded-full"></div>
          </button>
        </div>
      ))}

      {/* Add Task Button */}
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={addTask}
        disabled={totalAllocated >= fundingGoal}
      >
        Add Task
      </button>

      {/* Funding Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className={`h-2 rounded transition-all ${
            totalAllocated > fundingGoal ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      {/* Budget Feedback Text */}
      <p className={`text-sm mt-2 ${totalAllocated > fundingGoal ? 'text-red-500' : 'text-gray-700'}`}>
        {totalAllocated > fundingGoal
          ? 'Total amount exceeds funding goal!'
          : `Used: ${totalAllocated} / ${fundingGoal}`}
      </p>
    </div>
  );
};

export default Step2;
