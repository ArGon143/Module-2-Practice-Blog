import { deleteUser } from '../api';
import { ROLE } from '../constans';
import { sessions } from '../sessions';

export const removeUser = async (userSession, userId) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	deleteUser(userId);

	return {
		error: null,
		response: true,
	};
};
