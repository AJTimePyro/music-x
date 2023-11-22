import NavBar from './components/pageComponent/navbar'
import MusicPlayer from './components/pageComponent/musicPlayer';
import MusicPlayState from './context/musicPlayInfo/playContextProvider';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <MusicPlayState>
      <NavBar/>
      <Outlet/>
      <MusicPlayer/>
    </MusicPlayState>
  );
}

export default App;
