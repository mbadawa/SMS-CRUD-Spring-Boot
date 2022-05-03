import React from "react";
import axios from "axios";
import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
function AddStudent() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	// arrow function
	// arrow function
	const handleSubmit = async (e) => {
		e.preventDefault();
		// form validation function
		if (
			name.length < 0 ||
			email.length < 0 ||
			day.length < 0 ||
			month.length < 0 ||
			year.length < 0
		) {
			alert("Please fill all the fields");
			return;
		}
		// validates Email
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(email)) {
			alert("Please enter a valid email");
			return;
		}
		// validates dob
		const dob = `${day}-${month}-${year}`;
		const dobRegex =
			/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
		if (!dobRegex.test(dob)) {
			alert("Please enter a valid date");
			return;
		}
		// validates name
		const nameRegex = /^[a-zA-Z ]{2,30}$/;
		if (!nameRegex.test(name)) {
			alert("Please enter a valid name");
			return;
		}
		await axios(
			{
				url: "http://localhost:9090/api/v1/student/",
				method: "POST",
				data: {
					name: name,
					email: email,
					dob: `${year}-${month}-${day}`,
				},
			},
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json;charset=UTF-8",
				},
			}
		)
			.then((res) => {
				alert("Student Added Successfully");
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="lg:flex grid grid-cols items-center justify-around p-10 gap-5 bg-gray-600 shadow-md text-gray-700"
			>
				<input
					className="bg-gray-300 placeholder-gray-700 shadow placeholder-gray-	300 p-2 focus:outline-none rounded lg:w-1/2"
					onChange={(event) => setName(event.target.value)}
					type="text"
					placeholder="Student Name"
				/>
				<span className="flex items-center gap-2 bg-gray-300 shadow p-2  rounded lg:w-1/2">
					<MdAlternateEmail />{" "}
					<input
						className="bg-gray-300 flex-grow placeholder-gray-700 focus:outline-none"
						onChange={(event) => setEmail(event.target.value)}
						type="email"
						placeholder="Email"
					/>
				</span>

				<span className="flex items-center gap-2">
					<input
						className="bg-gray-300 shadow placeholder-gray-700 p-2 focus:outline-none rounded w-1/3"
						placeholder="MM"
						onChange={(event) => setMonth(event.target.value)}
					></input>
					<input
						className="bg-gray-300 shadow placeholder-gray-700 p-2 focus:outline-none rounded w-1/3"
						placeholder="DD"
						onChange={(event) => setDay(event.target.value)}
					></input>
					<input
						className="bg-gray-300 shadow placeholder-gray-700 p-2 focus:outline-none rounded w-1/3"
						placeholder="YYYY"
						onChange={(event) => setYear(event.target.value)}
					></input>
				</span>
				<button
					type="submit"
					className="bg-green-600 w-1/5 text-white p-2 rounded"
				>
					Save
				</button>
			</form>
		</div>
	);
}

export default AddStudent;
