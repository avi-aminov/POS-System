import { useEffect } from 'react';
import { observer } from 'mobx-react';
import authStore from '../stores/authStore';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const RequireAuth = observer((props) => {
	useEffect(() => {
		if (authStore.isLogin === null) {
			authStore.checkAuth();
		}
	}, []);

	if (authStore.isLogin === null) {
		return <Spinner />;
	}

	if (authStore.isLogin === false) {
		return <Navigate to="/login" />;
	}

	return <div>{props.children}</div>;
});

export default RequireAuth;
