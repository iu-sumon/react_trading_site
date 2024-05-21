import axios from "axios";

import Cookies from "js-cookie";

const adminServer = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL || 'https://omsapi.quantbd.com/',
});

export const setAuthToken = (token) => {
	if (token) {
		adminServer.defaults.headers.common["Authorization"] = "Bearer " + token;
	}

};

// export const setLanguage = (lang) => {
// 	adminServer.defaults.headers.common["lang"] = lang;
// };

export const clearCookies = () => {
	Cookies.set("_jwtToken", '');
	// Cookies.set("_jwtLang", "en"); // en or ab
	// Cookies.set("_user_id", '');
	// Cookies.set("_jwtUserType", '');
};

export const setCookiesFromAuthResponse = (res) => {

	Cookies.set("_jwtToken", res.access_token);

	setAuthToken(Cookies.get("_jwtToken"));
	// setLanguage(Cookies.get("_jwtLang"));
}

setAuthToken(Cookies.get("_jwtToken"));
// setLanguage(Cookies.get("_jwtLang"));

export default adminServer;
