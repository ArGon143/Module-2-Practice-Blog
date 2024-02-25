import { ROLE } from '../constans';
import { getUsers } from '../api';
import { sessions } from '../sessions';

export const fetchUsers = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		response: users,
	};
};
