
import './App.css';
import RenderTest from './components/game-test/RenderTest';
import NumberBaseball from './components/number-baseball/NumberBaseball';
// import ResponseCheck from './components/response-check/ResponseCheck';
import ResponseCheck from './components/response-check/ResponseCheckHooks';


function App() {
  return (
    <div>
      {/* <RenderTest/> */}
      {/* <NumberBaseball/> */}
      <ResponseCheck />
    </div>
  );
}

export default App;
