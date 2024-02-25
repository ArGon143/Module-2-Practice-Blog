import { setUserRole } from '../api';
import { ROLE } from '../constans';
import { sessions } from '../sessions';

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	setUserRole(userId, newUserRoleId);

	return {
		error: null,
		response: true,
	};
};
