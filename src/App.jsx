import NavBar from './components/pageComponent/navbar'
import HomeBody from './components/pageComponent/homeContent'
import MusicPlayer from './components/pageComponent/musicPlayer';
import MusicPlayState from './context/musicPlayInfo/playContextProvider'

function App() {

  return (
    <MusicPlayState>
      <NavBar/>
      <HomeBody/>
      <MusicPlayer/>
    </MusicPlayState>
  );
}

export default App;
