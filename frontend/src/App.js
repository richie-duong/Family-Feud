import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { RulePage } from './pages/RulePage';
import { QuestionPage } from './pages/QuestionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { WinnerPage } from './pages/WinnerPage';
import { TeamNamePage } from './pages/TeamNamePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/names' element={<TeamNamePage />}/>
          <Route path='/rules' element={<RulePage />} />
          <Route path='/question/:id' element={<QuestionPage />} />
          <Route path='/winner' element={<WinnerPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
