import './App.css';
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
    <AddGenus />
    <AllGenus />
    <AddLifeStage />
    <AllLifeStages />
    <AddHabitat />
    <AllHabitat />
    <AddTarantula />
    <AllTarantulas />
    </>
  );
}

export default App;
