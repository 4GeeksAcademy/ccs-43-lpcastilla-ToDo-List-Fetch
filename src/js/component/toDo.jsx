import React , {useState} from "react";

export const ToDo = () => {
	const [data, setData] = useState ("");
	const [toDo, setToDo] = useState ([]);
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
						//console.log(data);
						setData(event.target.value);
						}	
					}
					onKeyDown={(event) => {
						//console.log(event.key);
						if (event.key == "Enter"){
							setToDo((prev) => {
								return [...prev , data]
							})
							setData("");
						}
					}}
				/>
			</div>
			<ul className="list-group col-sm-6">
				{toDo.map((item, index) => {
					return (
						<li key={index} className="list-group-item d-flex justify-content-between">
							<span>{item}</span>
							<button 
								className="btn btn-light p-0" 
								onClick={() => {
									const filteredItems = toDo.filter((_, filteredIndex) => filteredIndex !== index);
									setToDo(filteredItems);
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
		</div>
    );
};



