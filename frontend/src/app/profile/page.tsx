import Card from "../../components/Auth/Card";
import ProfileForm from "../../components/Auth/ProfileForm";
import React from "react";

function Profile() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card title="Personal Info">
        <ProfileForm />
      </Card>
    </div>
  );
}

export default Profile;
