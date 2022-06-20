import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AllPets from './components/AllPets';
import EditPet from './components/EditPet';
import NewPet from './components/NewPet';
import ViewPet from './components/ViewPet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/new' element={<NewPet/>}/>
          <Route path='/' element={<AllPets/>}/>
          <Route path='/editPet/:id' element={<EditPet/>}/>
          <Route path='/viewPet/:id' element={<ViewPet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
