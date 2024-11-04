import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Page",
};

const Dashboard = () => {
  return (
    <div className="bg-slate-200">
      <h1 className="text-4xl">dashboard page</h1>
    </div>
  );
};

export default Dashboard;
