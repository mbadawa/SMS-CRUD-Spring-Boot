import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GetStudentList from "./components/GetStudentList";
import AddStudent from "./components/AddStudent";

function App() {
	return (
		<div className="container ml-auto mr-auto">
			<Router>
				<Switch>
					<Route path="/">
						<AddStudent />
						<GetStudentList />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
