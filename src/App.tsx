import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AllTarantulas from './components/AllTarantulas';
import AddTarantula from './components/AddTarantula';
import AddGenus from './components/AddGenus';
import AllGenus from './components/AllGenus';
import AddLifeStage from './components/AddLifeStage';
import AllLifeStages from './components/AllLifeStages';
import AddHabitat from './components/AddHabitat';
import AllHabitat from './components/AllHabitat';

function App() {
  return (
    <>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AllTarantulas />} />
          <Route path="add-tarantula" element={<AddTarantula />} />
          <Route path="add-genus" element={<AddGenus />} />
          <Route path="all-genus" element={<AllGenus />} />
          <Route path="add-life-stage" element={<AddLifeStage />} />
          <Route path="all-life-stages" element={<AllLifeStages />} />
          <Route path="add-habitat" element={<AddHabitat />} />
          <Route path="all-habitats" element={<AllHabitat />} />
        </Route>
      </Routes>
    </BrowserRouter>    </>
  );
}

export default App;
