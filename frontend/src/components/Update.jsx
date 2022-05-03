import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
function Update(props) {
	function hideUpdate() {
		document.getElementById("update").classList.add("hidden");
		document.getElementById("update").classList.remove("flex");
	}

	const setUpdate = async (e) => {
		//
		e.preventDefault();
		await axios(
			{
				url: `http://localhost:9090/api/v1/student/${props.id}?name=${props.name}&email=${props.email}`,
				method: "PUT",
			},
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json;charset=UTF-8",
				},
			}
		)
			.then((res) => {
				alert("Student Updated Successfully");
			})
			.catch(
				(err) => (document.getElementById("error-message").innerHTML = err.re)
			);
	};

	return (
		<div className="relative">
			<form
				id="update"
				className="w-full hidden left-0 items-center p-12 gap-5 bg-gray-600 shadow-md text-gray-300"
			>
				<AiOutlineClose
					className="absolute top-5 right-5 text-lg cursor-pointer"
					onClick={hideUpdate}
				/>
				<input
					value={props.name}
					className="bg-gray-500 shadow placeholder-gray-300 p-2 focus:outline-none rounded w-full"
					onChange={(event) => props.setName(event.target.value)}
					type="text"
					placeholder="Student Name"
				/>
				<input
					value={props.email}
					className="bg-gray-500 shadow placeholder-gray-300 p-2 focus:outline-none rounded w-full"
					onChange={(event) => props.setEmail(event.target.value)}
					type="email"
					placeholder="Student Email"
				/>
				<p id="error-message" className="text-red-500"></p>
				<button
					onClick={setUpdate}
					className="bg-green-600 w-1/5 text-white p-2 rounded"
				>
					Update
				</button>
			</form>
		</div>
	);
}

export default Update;
