import React from 'react';
import './App.css';
import NewTaskBar from './NewTaskBar';
import TaskList from './TaskList';

class App extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  render() {
    return (
      <div>
        <NewTaskBar></NewTaskBar>
        <TaskList></TaskList>
      </div>
    );
  }
}


// function App() {
//   // fetch(`/api/tasks`).then(res => console.log(res))
//   fetch(`/api/tasks`)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           I'm a text<code>src/App.js</code> and save to reload.
//         </p>
//       </header>
//     </div>
//   );
// }

export default App;

