import React, { FC } from "react";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import Main from "./subcomponents/Main";

import Welcome from './Welcome'

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  )
}

export default App
