import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import Delete from "./Delete";
import Update from "./Update";
export default function GetStudentList() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [students, setStudents] = useState([]);
	// sets new name/email/dob
	const [id, setID] = useState("");
	useEffect(() => {
		axios.get("http://localhost:9090/api/v1/student/").then((res) => {
			setStudents(res.data);
		});
	});

	// apply function when the button clicked
	const showUpdate = (id) => {
		document.getElementById("update").classList.remove("hidden");
		document.getElementById("update").classList.add("flex");
		axios.get(`http://localhost:9090/api/v1/student/${id}`).then((res) => {
			setName(res.data.name);
			setEmail(res.data.email);
		});
		setID(id);
	};

	return (
		<div className="relative">
			<div className="relative overflow-x-auto shadow-md w-full">
				<table className="w-full text-sm text-left bg-gray-100 text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 ">
						<tr className="">
							<th scope="col" className="px-6 py-3">
								ID
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Email
							</th>
							<th scope="col" className="px-6 py-3">
								Date of birth
							</th>
							<th scope="col" className="px-6 py-3">
								Age
							</th>
						</tr>
					</thead>
					<tbody className="overflow-hidden overflow-y-auto bg-gray-50">
						{students.map((student) => (
							<tr className="">
								<td className="px-6 py-4  border-b dark:border-gray-700 font-bold">
									{student.id}
								</td>
								<td className="px-6 py-4  border-b dark:border-gray-700 font-bold">
									{student.name}
								</td>
								<td className="px-6 py-4  border-b dark:border-gray-700">
									{student.email}
								</td>
								<td className="px-6 py-4  border-b dark:border-gray-700">
									{student.dob}
								</td>
								<td className="px-6 py-4  border-b dark:border-gray-700">
									{student.age}
								</td>
								<td className="px-6 py-4 flex items-center justify-end gap-3  border-b dark:border-gray-700">
									<button
										onClick={() => showUpdate(student.id)}
										className="text-xs w-20 bg-green-500 p-2 text-white flex items-center justify-center gap-1 font-bold rounded"
									>
										<AiFillEdit />
										Edit
									</button>
									<Delete id={student.id} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Update
				id={id}
				name={name}
				email={email}
				setName={setName}
				setEmail={setEmail}
			/>
		</div>
	);
}
