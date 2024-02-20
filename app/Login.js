"use client";
import React, { useEffect, useState } from 'react';
import login from '@/api/login';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Text, CustomizedButtons } from '$/Components';
import { useAppContext } from "$/AppContext";
import { useRouter } from 'next/navigation';
import { Box } from '@/lib/mui';
import { checkServer } from '@/api';
import ServerFejl from './serverfejl';

export default function Login() {
	const router = useRouter()
	const { language, setLanguage, sprogfunktion, setIsLoggedIn, setUser } = useAppContext();
	const sprogting = (dan, eng) => {
		return (
			sprogfunktion(language, dan, eng)
		)
	}

	const labels = {
		knap: sprogting('Log ind', 'Login'),
		brugernavnfejl: sprogting('hvad med dit brugernavn eller E-mail???', `What's your username or E-mail`),
		passwordFejl: sprogting('Du skal bruge password for at logge ind', 'You need a password to log in'),
		brugernavn: sprogting('Brugernavn/E-mail', 'Username/E-mail')
	}
	const { knap, brugernavnfejl, passwordFejl, brugernavn } = labels;
	const schema = Yup.object().shape({
		brugernavn: Yup.string().required(brugernavnfejl),
		password: Yup.string().required(passwordFejl)
	})

	const defaultValues = {
		brugernavn: '',
		password: ''
	}

	const [message, setMessage] = useState({})
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState('');

	const { handleSubmit, formState: { errors }, control, setError } = useForm({
		defaultValues,
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		checkServer().then(test => {
			console.log(test)
			setMessage(test)
		})
	}, [])


	const onSubmit = (data) => {
		let cancel = false
		let rolle;
		setIsLoading(true)

		login(data).then((res) => {
			if (!res.error) {
				rolle = res.role
				setLanguage(res.sprog)
				setUser(res)
				setIsLoggedIn(true)
			}

			switch (rolle) {
				case "FISSE":
					router.push('/loves_rosie_and_bella');
					break;
				case "ADMIN":
					router.push('/skrivebord');
					break;
				case "ARBEJDE":
					router.push('/skrivebord');
					break;
				case undefined:
					setError(res.message, status);
					break;
				default:
					router.push('/skrivebord');
					break;
			}
		}).catch(err => {
			setIsLoading(false)
			setIsLoading(false)
			if (err.name === 'bruger') {
				const bruger = err.message
				setStatus(sprogting(`Brugeren ${bruger} findes ikke`, `the user ${bruger} doesn't exist`))
			} else if (err.name === 'password') {
				const password = err.message
				setStatus(sprogting(password, 'Wrong password'))
			} else {
				setStatus(err)
			}
		})
		return () => {
			cancel = true;
		}
	}

	const centrer = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		mt: 2
	}

	return (
		<Box>
			{message?.error ? <ServerFejl /> :
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={centrer}>
						<Box sx={centrer}>
							<Controller
								control={control}
								name="brugernavn"
								render={({ field: { onChange } }) =>
									<Text
										width={300}
										label={brugernavn}
										onChange={onChange}
										type="text"
										errors={errors.brugernavn}
									/>
								}
								rules={{ required: true }}
								type="text"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Box>
						{errors && errors.brugernavn?.message}
						<Box sx={centrer}>
							<Controller
								id='password'
								control={control}
								name="password"
								render={({ field: { onChange } }) =>
									<Text
										width={300}
										label='Password'
										onChange={onChange}
										type="password"
										errors={errors?.password}
									/>
								}
								rules={{
									required: true,
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Box>
						{errors && errors.password?.message}
						<div>
							<CustomizedButtons type="submit" disabled={isLoading}>{knap}</CustomizedButtons>
						</div>
						<label>{status}</label>
					</Box>
				</form>
			}
		</Box>
	);
}