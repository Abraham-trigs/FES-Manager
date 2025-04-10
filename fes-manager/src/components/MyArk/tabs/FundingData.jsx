import React from 'react';

const FundingData = () => {
  const totalFunds = 1200;
  const fundingGoal = 5000;

  const progress = (totalFunds / fundingGoal) * 100;

  return (
    <div>
      <h2>Funding Progress</h2>
      <div>
        <strong>Progress:</strong>
        <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: '#4caf50',
              height: '24px',
            }}
          ></div>
        </div>
        <p>{progress.toFixed(2)}% of funding goal reached</p>
      </div>
    </div>
  );
};

export default FundingData;
