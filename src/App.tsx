import { Route, Routes } from 'react-router-dom';
import { AddDiscipline } from './components/AddDiscipline/AddDiscipline';
import { AppLayout } from './components/AppLayout/AppLayout';
import { DisciplineList } from './components/DisciplineList/DisciplineList';

export const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<DisciplineList />} />
      <Route path="add" element={<AddDiscipline />} />
    </Route>
  </Routes>
);
