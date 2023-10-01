import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home'; // Import your Home component
import AdminHome from './components/AdminHome'; // Import your Home component
import CreateQuiz from './components/CreateQuiz'; // Import your CreateQuiz component
import Quiz from './components/Quiz'; // Import your Quiz component

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create-quiz" component={CreateQuiz} /> {/* Route for creating a new quiz */}
      <Route path="/admin-home" component={AdminHome} /> {/* Route for creating a new quiz */}
      <Route path="/quiz/:quizId" component={Quiz} /> {/* Route for joining and answering a quiz */}
      {/* Define more routes as needed */}
    </Switch>
  );
}

export default AppRoutes;
