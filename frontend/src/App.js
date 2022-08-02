import './App.css';
import {Routes,Route} from 'react-router-dom'
import Start from './components/LoginPages/Start';
import Home from './components/Home/Home';
import Task from './components/Home/Task';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Start/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/task/:taskID' element={<Task/>}/>
      </Routes>
    </div>
  );
}

export default App;
