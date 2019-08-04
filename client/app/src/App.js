import React from 'react';
import NewTaskBar from './NewTaskBar';
import TaskList from './TaskList';

import static_data from './static_task_list';

// working with this palette: http://paletton.com/#uid=13E0u0ka-cw7dx8aNlygu83lZ4u
const containerStyles = {
  maxWidth: 550,
  minHeight: 300,
  margin: `100px auto`,
  backgroundColor: `#dfe1e6`,
  color: `#090F17`,
  boxShadow: `0px 39px 57px -4px black`
}
// box shadow properties:
// [horizontal offset] [vertical offset] [blur radius] [optional spread radius] [color];

function Container(props) {
  return <div style={containerStyles}>{props.children}</div>
}

class App extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  // async fetch(`/api/tasks`).then(res => res.json())
  // async getTasks() {
  //   return await fetch('/api/tasks').then(res => res.json())
  // }
  // getTasks() {
  //     return fetch('/api/tasks').then(res => res.json())
  // }

  render() {
    // let tasks = fetch('/api/tasks').then(res => res.json())
    // let tasks = async () => {
    //   let res = await fetch('/api/tasks')
    //   return res.json()
    // }
    let tasks = static_data();
    return (
        <Container>
          <NewTaskBar></NewTaskBar>
          <TaskList tasks={tasks}></TaskList>
        </Container>
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

