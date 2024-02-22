import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, H2, Input } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import { server } from '../../bff';
import { setUser } from '../../actions';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans/role';

const authFormShema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле логин.')
		.matches(
			/^\w+$/,
			'Неверно заполнено поле логин. Допускаются только буквы и цифры.',
		)
		.min(3, 'Неверно заполнено поле логин. Должно быть миимум 3 символа.')
		.max(15, 'Неверно заполнено поле логин. Должно быть максимум 15 символов.'),
	password: yup
		.string()
		.required('Заполните поле пароль.')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнено поле пароль. Допускаются только буквы, цифры и знаки # %.',
		)
		.min(6, 'Неверно заполнено поле пароль. Должно быть миимум 6 символов.')
		.max(30, 'Неверно заполнено поле пароль. Должно быть максимум 30 символов.'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	background-color: #fcadad;
	font-size: 18px;
	margin: 10px 0;
	padding: 10px;
	text-align: center;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormShema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	const store = useStore();

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		const unsubscribe = store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});

		return unsubscribe;
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(response));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
