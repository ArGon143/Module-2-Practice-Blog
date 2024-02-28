import { setUserRole } from '../api';
import { ROLE } from '../constans';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
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
