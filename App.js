// App.js is the main component that renders the entire application. It contains the following features:
// - A form to add a new task with an estimated time
// - A list of tasks that can be edited, deleted, marked as complete, or marked as incomplete
// - A list of completed tasks
// - A list of incompleted tasks with reasons for not completing the task
// - A dropdown menu to select a reason for marking a task as incomplete

const { useEffect, useState, Fragment } = React;
const { Calendar, momentLocalizer } = ReactBigCalendar;
const localizer = momentLocalizer(moment);

function DropdownMenu({ task, position, incompleteReasons, handleIncompleteTask }) {            // DropdownMenu component
  return ReactDOM.createPortal(                                                                 // Create a portal to render the dropdown menu   
    <ul                                                                                         // Dropdown menu
      className="dropdown-menu"                                                                 // Dropdown menu class
      style={{ top: position.top, left: position.left, position: 'absolute' }}                  // Dropdown menu style
    >
      {incompleteReasons.map((reason, index) => (                                               // Map through incomplete reasons
        <li key={index} onClick={() => handleIncompleteTask(task.id, reason)}>{reason}</li>     // List item with reason
      ))}
    </ul>,
    document.body                                                                               // Render dropdown menu in the body
  );
}

// Login component
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend request here
    console.log('Login attempt:', username, password);
    onLogin(username);
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Register component
function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend request here
    console.log('Registration attempt:', username, password);
    onRegister(username);
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

function App() {
  // State variables
  const [tasks, setTasks] = useState([]);                                              // Tasks state variable        
  const [newTask, setNewTask] = useState('');                                          // New task state variable
  const [newTaskTime, setNewTaskTime] = useState('');                                  // New task time state variable
  const [editingTaskId, setEditingTaskId] = useState(null);                            // Editing task id state variable
  const [editingTaskText, setEditingTaskText] = useState('');                          // Editing task text state variable
  const [editingTaskTime, setEditingTaskTime] = useState('');                          // Editing task time state variable
  const [completedTasks, setCompletedTasks] = useState([]);                            // Completed tasks state variable 
  const [incompletedTasks, setIncompletedTasks] = useState([]);                        // Incompleted tasks state variable
  const [activeDropdownId, setActiveDropdownId] = useState(null);                      // Active dropdown id state variable
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });       // Dropdown position state variable
  const [user, setUser] = useState(null);


  const incompleteReasons = [
    "Procrastination",
    "Overcommitment",
    "Distractions",
    "Lack of Resources",
    "Personal",
    "Time Management",
    "Other"
  ];

  // Function to add a new task
  const addTask = (e) => {                                                             // Add task function
    e.preventDefault();                                                                // Prevent default form submission
    if (newTask.trim() && newTaskTime.trim()) {                                        // Check if new task and time are not empty
      const task = { id: Date.now(), text: newTask, time: `${newTaskTime} minutes` };  // Create
      setTasks([...tasks, task]);                                                      // Add task to tasks
      setNewTask('');                                                                  // Reset new task
      setNewTaskTime('');                                                              // Reset new task time 
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {                                                        // Delete task function
    setTasks(tasks.filter(task => task.id !== id));                                   // Filter out task with id
    setCompletedTasks(completedTasks.filter(task => task.id !== id));                 // Filter out task with id from completed tasks
    setIncompletedTasks(incompletedTasks.filter(task => task.id !== id));             // Filter out task with id from incompleted tasks
  };

  // Function to edit a task
  const editTask = (id, newText, newTime) => {                                        // Edit task function
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText, time: `${newTime} minutes` } : task  // Map through tasks and update task with id
    );
    setTasks(updatedTasks);                                                           // Update tasks
    const updatedCompletedTasks = completedTasks.map(task =>                          // Map through completed tasks and update task with id
      task.id === id ? { ...task, text: newText, time: `${newTime} minutes` } : task
    );
    setCompletedTasks(updatedCompletedTasks);                                         // Update completed tasks
    const updatedIncompletedTasks = incompletedTasks.map(task =>                      // Map through incompleted tasks and update task with id
      task.id === id ? { ...task, text: newText, time: `${newTime} minutes` } : task
    );
    setIncompletedTasks(updatedIncompletedTasks);                                     // Update incompleted tasks
    setEditingTaskId(null);                                                           // Reset editing task id
    setEditingTaskText('');                                                           // Reset editing task text
    setEditingTaskTime('');                                                           // Reset editing task time
  };

  // Function to start editing a task
  const startEditing = (task) => {                                                   // Start editing task function
    setEditingTaskId(task.id);                                                       // Set editing task id
    setEditingTaskText(task.text);                                                   // Set editing task text
    setEditingTaskTime(task.time.replace(' minutes', ''));                           // Set editing task time
  };

  // Function to handle key press while editing
  const handleEditKeyPress = (e, id) => {                                           // Handle edit key press function
    if (e.key === 'Enter') {                                                        // Check if key is Enter
      editTask(id, editingTaskText, editingTaskTime);                               // Edit task
    }
  };

  // Function to mark a task as complete
  const completeTask = (id) => {                                                   // Complete task function
    const task = tasks.find(task => task.id === id);                               // Find task with id
    setCompletedTasks([...completedTasks, task]);                                  // Add task to completed tasks
    setTasks(tasks.filter(task => task.id !== id));                                // Filter out task with id
  };

  // Function to mark a task as incomplete
  const incompleteTask = (id, reason) => {
    const task = tasks.find(task => task.id === id);                             // Find task with id
    setIncompletedTasks([...incompletedTasks, { ...task, reason }]);             // Add task to incompleted tasks with reason
    setTasks(tasks.filter(task => task.id !== id));                              // Filter out task with id
    setActiveDropdownId(null);                                                   // Reset active dropdown id
  };

  // Toggle dropdown menu
  const toggleDropdown = (id, event) => {
    const rect = event.target.getBoundingClientRect();              // Get bounding client rect of target
    const position = {                                              // Position of dropdown menu
      top: rect.top + window.scrollY,                               // Top position of dropdown menu
      left: rect.left + window.scrollX                              // Left position of dropdown menu
    };
    setDropdownPosition(position);                                  // Set dropdown position
    setActiveDropdownId(activeDropdownId === id ? null : id);       // Toggle active dropdown id
  };

  // Functions for handling login and registration
  const handleLogin = (username) => {
    setUser(username);
  };

  const handleRegister = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const [productivityChart, setChart] = useState(null);
  useEffect(() => {
    // Configuration options
    const config = {
      type: 'line',
      // data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Productivity Tracker: Completed vs Incomplete Tasks'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Tasks'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time (Days)'
            }
          }
        }
      },
    };

    // Create and render the chart
    setChart(new Chart(
      document.getElementById('productivityChart'),
      config
    ));

  }, []);

  useEffect(() => {
    console.log('preupdate');
    if (!productivityChart) return;
    // Generate fake data for the last 30 days
    const generateData = (completed) => {
      return Array.from({ length: 30 }, () =>
        completed ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 5)
      );
    };

    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const completedTaskData = generateData(true);
    const incompleteTaskData = generateData(false);

    // Data for the chart
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Completed Tasks',
          data: completedTaskData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          fill: true
        },
        {
          label: 'Incomplete Tasks',
          data: incompleteTaskData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1,
          fill: true
        }
      ]
    };

    console.log('update');

    productivityChart.data = data;
    productivityChart.update();
  });


  return (
    <div className="container">                                    {/* Comment everything below this line */}
      <div className="app-header">
        <div className="planner">
          <div className="task-input-area">
            <h2>Daily Planner</h2>
            <form onSubmit={addTask}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="task-input"
              />
              <input
                type="text"
                value={newTaskTime}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setNewTaskTime(e.target.value);
                  }
                }}
                placeholder="Estimated time (minutes)"
                className="task-input"
              />
              <button type="submit">Add Task</button>
            </form>
          </div>
        </div>
        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <p>Welcome, {user}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <React.Fragment>
              <Login onLogin={handleLogin} />
              <Register onRegister={handleRegister} />
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="task-lists">
        <div className="task-list-area">
          <h2>Task List</h2>
          <div className="task-list-scrollable">
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className={`task-item ${editingTaskId === task.id ? 'editing' : ''}`}>
                  {editingTaskId === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingTaskText}
                        onChange={(e) => setEditingTaskText(e.target.value)}
                        className="task-input"
                        autoFocus
                      />
                      <input
                        type="text"
                        value={editingTaskTime}
                        onChange={(e) => {
                          if (!isNaN(e.target.value)) {
                            setEditingTaskTime(e.target.value);
                          }
                        }}
                        className="task-input"
                      />
                      <button onClick={() => editTask(task.id, editingTaskText, editingTaskTime)}>Save</button>
                      <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <span>{task.text}</span>
                      {task.time && (
                        <span style={{ marginLeft: '10px' }}>{`${task.time}`}</span>
                      )}
                    </div>
                  )}
                  <div className="task-buttons">
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    <button onClick={() => startEditing(task)}>Edit</button>
                    <button onClick={() => completeTask(task.id)}>Complete</button>
                    <div className="dropdown">
                      <button onClick={(e) => toggleDropdown(task.id, e)}>Incomplete</button>
                      {activeDropdownId === task.id && (
                        <DropdownMenu
                          task={task}
                          position={dropdownPosition}
                          incompleteReasons={incompleteReasons}
                          handleIncompleteTask={incompleteTask}
                        />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="completed-incompleted-area">
          <div className="completed-task-list-area">
            <h2>Completed Tasks</h2>
            <ul className="task-list">
              {completedTasks.map(task => (
                <li key={task.id} className="task-item">
                  <div>
                    <span>{task.text}</span>
                    <span style={{ marginLeft: '10px' }}>{` ${task.time}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="incompleted-task-list-area">
            <h2>Incomplete Tasks</h2>
            <ul className="task-list">
              {incompletedTasks.map(task => (
                <li key={task.id} className="task-item">
                  <div>
                    <span>{task.text}</span>
                    <span style={{ marginLeft: '10px' }}>{` ${task.time}`}</span>
                    {task.reason && <span className="incomplete-reason">Reason: {task.reason}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <canvas id="productivityChart" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));