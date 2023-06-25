// components/UserDetails.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserDetails: React.FC = () => {
  const { id } = useParams();
//   const user = useSelector((state) => state.users.find((u) => u.id === parseInt(id)));
    const user = {};
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
    </div>
  );
};

export default UserDetails;
