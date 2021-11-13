import { Routes, Route } from 'react-router';
import Header from './components/Header';
import IndexPage from './components/IndexPage';
import PlanogramsPage from './components/PlanogramsPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='' element={<IndexPage />} />
        <Route path='/planograms' element={<PlanogramsPage />} />
      </Routes>
    </div>
  );
}

export default App;
