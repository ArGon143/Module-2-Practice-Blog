import { ROLE } from '../constans';
import { getRoles } from '../api';
import { sessions } from '../sessions';

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещён',
			response: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		response: roles,
	};
};