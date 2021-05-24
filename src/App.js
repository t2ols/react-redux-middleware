import './App.css';
import { Route } from 'react-router-dom';

// import CounterContainer from './containers/CounterContainer';
// import PostListcontainer from './containers/PostListContatiner';

import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <>
      {/* <CounterContainer />
      <PostListcontainer /> */}      
      <Route path="/" component={PostListPage} exact />
      <Route path="/:id" component={PostPage} />
    </>
  );
}

export default App;
