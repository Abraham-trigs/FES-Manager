import React, { useState } from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import SideBar from "../layout/SideBar";
import DepositForm from "../Deposite/DepositForm";
import DepositHistory from "../Deposite/DepositHistory";
import TransactionOverview from "../Deposite/TransactionOverview";

const DepositPage = () => {
  const [activeTab, setActiveTab] = useState("Deposit Funds");

  const tabs = [
    "Deposit Funds",
    "Deposit History",
    "Transaction Overview"
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

      {/* Sidebar for navigation */}
      <SideBar />

      {/* Navigation bar */}
      <MainNavBar />

      <div className="flex-grow flex flex-col items-center justify-center text-darkGreen z-10 w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Deposit Page</h2>
        
        {/* Tab Navigation */}
        <div className="flex border-b mb-4 w-full max-w-2xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`p-2 flex-1 text-center ${activeTab === tab ? "border-b-2 border-greenNeon text-greenNeon" : "text-gray-500"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-2xl">
          {activeTab === "Deposit Funds" && <DepositForm />}
          {activeTab === "Deposit History" && <DepositHistory />}
          {activeTab === "Transaction Overview" && <TransactionOverview />}
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default DepositPage;
