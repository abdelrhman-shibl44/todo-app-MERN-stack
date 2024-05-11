import Card from "../../components/Auth/Card";
import DashboardForm from "../../components/Auth/DashboardForm";
import React from "react";

function Dashboard() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card title="Personal Info">
        <DashboardForm />
      </Card>
    </div>
  );
}

export default Dashboard;
