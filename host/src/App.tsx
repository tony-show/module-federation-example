import { Suspense, lazy, useState, useEffect } from 'react';
import { SimpleComponent } from './SimpleComponent';
import { ErrorBoundary } from './ErrorBoundary';
import { Posts } from './components/Posts';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const Button = lazy(() => new Promise((resolve, reject) => {
  import('ui_kit/components')
    .then(({ Button }) => {
      console.log(Button);
      if (Button) {
        resolve({ default: Button })
      } else {
        resolve({
          default: () => <div style={{
            padding: '20px 30px',
            border: '1px dashed deepskyblue',
            margin: '20px 0'
          }}>Компонент из UI Kit недоступен</div>
        })
      }
    })
    .catch(reject)
})) // http://localhost:4002
import RemoteComponent from 'app1/RemoteComponent' // http://localhost:4001
import { StoreProvider } from 'host/store'
import { useSelector } from 'react-redux';

const Header = () => {
  const value = useSelector((state) => state.value)
  return <h1>
    Основное приложение (Host) {value}
  </h1>
}

const App = () => {
  const [isDisplay, setIsDisplay] = useState(false);

  return (
    <StoreProvider>
      <BrowserRouter>
        <Header />
        <SimpleComponent />
        <button onClick={() => setIsDisplay(!isDisplay)}>Click</button>
        <div style={{
          display: 'flex',
          gap: '15px'
        }}>
          <Link to='/'>Host</Link>
          <Link to='/app1'>App 1 (Microfront 1)</Link>
          <Link to='/posts'>Posts (Microfront 2)</Link>
        </div>
        <Routes>
          <Route
            path='/app1'
            element={(
              <ErrorBoundary>
                <Suspense fallback={<div>Загрузка...</div>}>
                  <RemoteComponent />
                  <Posts />
                </Suspense>
              </ ErrorBoundary>
            )}
          />
          <Route
            path='/posts'
            element={(
              <>
                <ErrorBoundary>
                  <Suspense fallback={<div>Загрузка...</div>}>
                    <Button>Кнопка из UI Kit (Микрофронт 2!)</Button>
                  </Suspense>
                </ ErrorBoundary>
              </>
            )}
          />
          <Route
            path='*'
            element='Not Found Page'
          />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
