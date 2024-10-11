import { AUTH_LOGIN,AUTH_LOGOUT,AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type : any, params : any) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(`http://127.0.0.1:3000/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ Email : username,MotDePasse: password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText); 
                }
                return response.json();
            })
            .then((data) => {
                const { MotDePasse, ...userToPersist } = data.data.user;
                localStorage.setItem('user', JSON.stringify(userToPersist));
            })
    }
    if (type === AUTH_LOGOUT) {
      localStorage.removeItem('user');
      return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const status  = params.status;
    if (status === 401 || status === 403) {
        localStorage.removeItem('user');
        return Promise.reject();
    }
    
    return Promise.resolve();
}
if (type === AUTH_CHECK) {
  return localStorage.getItem('user') ? Promise.resolve() : Promise.reject();
}
    return Promise.resolve();

};

