import "./ListItem.css";
import { AiOutlineCheck } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const ListItem = ({
	todo,
	deleteTodo,
	toggleChecked,
	toggleEdit,
	onEditTodo,
}) => {
	const { id, text, isChecked, isEdit } = todo;

	return (
		<div className="todo_list">
			<div
				className={isChecked ? "todo_checked" : "todo_unchecked"}
				onClick={() => toggleChecked(id)}
			>
				{isChecked && <AiOutlineCheck />}
			</div>
			{isEdit ? (
				<input
					className={"edit_input"}
					placeholder={text}
					value={text}
					onChange={(e) => onEditTodo(e, id)}
					onKeyDown={(e) => {
						if (e.key === "Enter") toggleEdit(id);
					}}
				/>
			) : (
				<div className={isChecked ? "todo_text_checked" : "todo_text"}>
					{text}
				</div>
			)}
			<div className="todo_edit" onClick={() => toggleEdit(id)}>
				<FaEdit />
			</div>
			<div className="todo_delete" onClick={() => deleteTodo(id)}>
				<ImBin />
			</div>
		</div>
	);
};

export default ListItem;
