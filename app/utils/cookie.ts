import jwtDecode from 'jwt-decode';
import jsCookie from 'js-cookie';

// Cookie api
export const setToken = (token: string) => jsCookie.set('token', token);
export const getToken = () => jsCookie.get('token') || '';
export const removeToken = () => jsCookie.remove('token');

// User api
export const getUserFromCookie = () => {
  const token = getToken();

  if (!token) return null;

  const decodedData: any = jwtDecode(token);

  if (decodedData?.exp * 1000 < Date.now()) return null;

  return decodedData;
};
