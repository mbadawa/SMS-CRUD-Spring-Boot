import React from "react";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
function Delete(props) {
	function deleteStudent() {
		axios
			.delete(`http://localhost:9090/api/v1/student/${props.id}`)
			.then((res) => {
				alert("student with the " + props.id + " deleted successfully");
			});
	}
	return (
		<div>
			{" "}
			<button
				className="text-xs bg-red-500 p-2 w-20 text-white flex items-center justify-center gap-1 font-bold rounded"
				onClick={() => deleteStudent(props.id)}
			>
				<BsFillTrashFill />
				Delete
			</button>
		</div>
	);
}

export default Delete;
