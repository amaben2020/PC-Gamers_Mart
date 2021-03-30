import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../messages/ErrorMessage";
import { Button, Table } from "react-bootstrap";
import Loading from "../../messages/Loading";
import { deleteUser } from "./../../actions/userActions";
import { listUsers } from "../../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const userList = useSelector((store) => store.userList);
	//for all users
	const { users, error, loading } = userList;
	//for an individual user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		//only display or list all users if the user is an admin
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [dispatch, successDelete, userInfo, history]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(id));
		} else {
			<ErrorMessage variant="danger"> Not Deleted</ErrorMessage>;
		}
	};
	return (
		<div>
			<h1>Users</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<ErrorMessage variant="danger">{error}</ErrorMessage>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th>edit/delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, idx) => (
							<tr key={idx}>
								<td>{user._id}</td>
								<td>{user.name}</td>

								<td>
									{" "}
									<a href={`mailto: ${user.email}`}> {user.email} </a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className="fas fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>

									<Button
										variant="trash"
										className="btn-sm"
										onClick={() => deleteHandler(user._id)}
									>
										<i style={{ color: "red" }} className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default UserListScreen;
