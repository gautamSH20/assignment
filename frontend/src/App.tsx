

import './App.css'

import { NavBar } from './components/NavBar';
import { PlusIcon } from './icons/PlusIcon';

import { Recurrance } from './components/Recurrance';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { useUserStore } from './store/userStore';
import { Loading } from './pages/loading';
const menu1=[
  {text2:"UserProfile",icon2:<PlusIcon/>},
  {text2:"Add Task",icon2:<PlusIcon/>},
]


function App() {

const {loading}=useUserStore();
  return (
    <div className='bg-linear-to-r from-[#d5e4ff] to-[#d5e4ff] min-h-screen '>
      <NavBar text1='TasktMaker' menuProp={menu1}/>
      {loading ? <Loading/> 
    :
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    }

    </div>
  )
}

export default App
