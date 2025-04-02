import React from 'react';
import useAddProjectFormStore from '../../store/AddProjectFormStore';

const Step2 = () => {
  const { formData, setFormData, errors } = useAddProjectFormStore(); // Access tasks from the Zustand store
  const { tasks, fundingGoal } = formData;

  const addTask = () => {
    setFormData({ tasks: [...tasks, { name: '', amount: '' }] });
  };

  const updateTask = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setFormData({ tasks: updatedTasks });
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setFormData({ tasks: updatedTasks });
  };

  const handleFundingGoalChange = (e) => {
    setFormData({ fundingGoal: e.target.value });
  };

  const totalAllocated = tasks.reduce((sum, task) => sum + Number(task.amount || 0), 0);
  const progress = fundingGoal > 0 ? (totalAllocated / fundingGoal) * 100 : 0;

  return (
    <div>
      <h2 className="text-lg font-semibold">Funding Details</h2>

      {/* Funding Goal */}
      <label className="block text-sm font-medium text-gray-700 mt-2">Funding Goal</label>
      <input
        type="number"
        value={fundingGoal}
        onChange={handleFundingGoalChange}
        placeholder="Enter funding goal"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.fundingGoal && <p className="text-red-500 text-sm">{errors.fundingGoal}</p>} {/* Error Message for funding goal */}

      {/* Task Fields */}
      <h3 className="mt-4 text-md font-semibold">Add Task</h3>
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Task Name"
            className="w-[50%] flex-1 px-2 py-1 border rounded"
            value={task.name}
            onChange={(e) => updateTask(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-[50%] px-2 py-1 border rounded"
            value={task.amount}
            onChange={(e) => updateTask(index, 'amount', e.target.value)}
          />
          <button className="text-red-500" onClick={() => deleteTask(index)}>
            <div className="w-3 h-3 bg-[#f02929] rounded-full"></div>
          </button>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={addTask}
        disabled={totalAllocated > fundingGoal}
      >
        Add Task
      </button>

      {/* Progress Indicator */}
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className={`h-2 rounded transition-all ${totalAllocated > fundingGoal ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={`text-sm mt-2 ${totalAllocated > fundingGoal ? 'text-red-500' : 'text-gray-700'}`}>
        {totalAllocated > fundingGoal
          ? 'Total amount exceeds funding goal!'
          : `Used: ${totalAllocated} / ${fundingGoal}`}
      </p>
    </div>
  );
};

export default Step2;
