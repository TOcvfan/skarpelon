import { useEffect } from 'react';
import { useAppContext } from "$/AppContext";
import { notFound } from 'next/navigation';

const withAdminAuth = (WrappedComponent) => {

    const AuthComponent = (props) => {
        const { user, isLoggedIn } = useAppContext();
        const { id, token, role } = user;
        let isAuthenticated = false;

        useEffect(() => {
            // Implement your authentication check here
            if (isLoggedIn && id && token && role === 'ADMIN') {
                isAuthenticated = true;
            }

            if (!isAuthenticated) {
                // Redirect to login page or show an error
                notFound();
            }
        }, []);
        /* 
        if (!isAuthenticated) {
            // You can also return a loading indicator or an error message here
            return null;
        }
        */
        // If authenticated, render the wrapped component
        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAdminAuth;