
import './App.css';
import RenderTest from './components/game-test/RenderTest';
import NumberBaseball from './components/number-baseball/NumberBaseball';
// import ResponseCheck from './components/response-check/ResponseCheck';
import ResponseCheck from './components/response-check/ResponseCheckHooks';
import RSP from './components/rsp/RSP';


function App() {
  return (
    <div>
      {/* <RenderTest/> */}
      {/* <NumberBaseball/> */}
      <RSP />
    </div>
  );
}

export default App;
