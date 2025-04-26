import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProfileTailwind from '../pages/ProfileTailwind';
import ProfileStyled from '../pages/ProfileStyled';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile-tailwind" replace />} />
      <Route path="/profile-tailwind" element={<ProfileTailwind />} />
      <Route path="/profile-styled" element={<ProfileStyled />} />
    </Routes>
  );
};

export default AppRoutes;

