import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/login';
import { Main } from './pages/main/main';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import { UpdatePost } from './pages/update-post/update-post';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/main' element={<Main/>} />
          <Route path='/createpost' element={ <CreatePost/>} />
          <Route path='/updatepost' element={ <UpdatePost/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
