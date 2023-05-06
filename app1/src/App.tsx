import { Post } from './components/Post';
import RemoteComponent from './RemoteComponent';

const App = () => {
  return (
    <div>
      <h1>
        Приложение микросервис App 1
      </h1>
      <RemoteComponent />
      <Post />
    </div>
  );
}

export default App
