import React , {useState, useEffect} from "react";

export const ToDo = () => {

	const [backEnd, setBackEnd] = useState ([]);
	const [data, setData] = useState ("");
	const [toDo, setToDo] = useState ([]);

	console.log(backEnd)
	
	useEffect(() => {
		postBackEnd();
	  }, []);

	async function getBackEnd () {
		try {
			const API_URL = "https://playground.4geeks.com/apis/fake";
			const requestConfig = {
				method: "GET",
				headers: {
					"Content-type": "application/json"
				}
			}
			const response = await fetch(API_URL + "/todos/user/lpcastilla", requestConfig); 
				if (response.status != 200) {
				console.log("Error en la solicitud. Code: ", response.status)
				return;
			}
				const body = await response.json();
				const filteredTasks = body.filter(task => task.label !== "example task");
				setToDo(filteredTasks);
		} catch(error) {
			console.log(error)
		}
	}

	async function postBackEnd () {
		try {
			const API_URL = "https://playground.4geeks.com/apis/fake";
			const requestConfig = {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify([])
			}
			const response = await fetch(API_URL + "/todos/user/lpcastilla", requestConfig); 
				if (response.status != 200) {
				console.log("Error en la solicitud. Code: ", response.status)
				return;
			}
		} catch(error) {
			console.log(error)
		}
	}

	async function deleteBackEnd (value) {
		try {
			const API_URL = "https://playground.4geeks.com/apis/fake";
			const requestConfig = {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(value),

			}
			const response = await fetch(API_URL + "/todos/user/lpcastilla", requestConfig); 
				if (response.status != 200) {
				console.log("Error en la solicitud. Code: ", response.status)
				return;
			}
				getBackEnd()
		} catch(error) {
			console.log(error)
		}
	}
	
	async function putBackEnd (value) {
		try {
			const API_URL = "https://playground.4geeks.com/apis/fake";
			const requestConfig = {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify([{label:value, done: false}, ...toDo]),

			}
			const response = await fetch(API_URL + "/todos/user/lpcastilla", requestConfig); 
				if (response.status != 200) {
				console.log("Error en la solicitud. Code: ", response.status)
				return;
			}
				getBackEnd()
		} catch(error) {
			console.log(error)
		}
	}
	
	async function deleteUser () {
		try {
			const API_URL = "https://playground.4geeks.com/apis/fake";
			const requestConfig = {
				method: "DELETE",
				headers: {
					"Content-type": "application/json"
				},

			}
			const response = await fetch(API_URL + "/todos/user/lpcastilla", requestConfig); 
				if (response.status != 200) {
				console.log("Error en la solicitud. Code: ", response.status)
				return;
			}
		} catch(error) {
			console.log(error)
		}
	}

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
			<h2 className="text-center text-secondary">To Do List</h2>
			<div className="input col-sm-6">
				<input 
					type="text" 
					className="form-control" 
					placeholder="What needs to be done?" 
					value={data}
					onChange={(event) => {
						setData(event.target.value);
						}	
					}
					onKeyDown={(event) => {
						if (event.key == "Enter"){
							putBackEnd(data)
							setData("");
					}}
					}/>
			</div>
			<ul className="list-group col-sm-6">
				{toDo.map((item, index) => {
					if (item.label === "sample task") {
						return null;
					}
					return (
						<li key={index} className="list-group-item d-flex justify-content-between">
							<span>{item.label}</span>
							<button 
								className="btn btn-light p-0" 
								onClick={async() => {
									const filteredItems = toDo.filter((_, filteredIndex) => filteredIndex !== index);
									if (filteredItems.length === 0){
										await deleteUser()
										await postBackEnd()
										await getBackEnd()
										return;
									}
									deleteBackEnd(filteredItems);
								}}
							>
								<i className="fa-solid fa-xmark"></i>
							</button>
						</li>
					);
				})}
				<li className="list-group-item text-secondary">
					{toDo.length > 0 ? `${toDo.length} item left` : "Nothing to do yet!"}
				</li>		
			</ul>
			<br />
			<button 
				className="btn btn-primary btn-sm" 
				onClick={async() => {
					await deleteUser();
					await postBackEnd()
					await getBackEnd()
				}}
			>Clean Tasks!
			</button>	
		</div>
    );
};


