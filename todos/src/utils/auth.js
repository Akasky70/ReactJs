const ACCESS_TOKEN = 'accessToken';
const USER_INFO = 'name';

const auth = {
	
	// TO GET STORED TOKEN
	get(key) {
		if (localStorage && localStorage.getItem(key)) {
			return localStorage.getItem(key) || null;
		}

		if (sessionStorage && sessionStorage.getItem(key)) {
			return sessionStorage.getItem(key) || null;
		}

		return null;
    },

	// FUNCTION THAT CALLS GET TO GET STORED TOKEN
    getToken( tokenKey = ACCESS_TOKEN ) {
      	return auth.get(tokenKey);
    },

	// FUNCTON THAT SAVES TOKEN LOCALLY TO AUTHENTICATE USERS
    authenticate( userCredentisls ) {
		
		localStorage.setItem('id', userCredentisls.data.user.id );      
		localStorage.setItem('name', userCredentisls.data.user.name );     
		localStorage.setItem('email', userCredentisls.data.user.email );     
		localStorage.setItem('accessToken', userCredentisls.data.token.accessToken );
		localStorage.setItem('refreshToken', userCredentisls.data.token.refreshToken );
	},

	// GET USER DETAILS
	getUserDetails( infoKey = USER_INFO ) {
		return auth.get(infoKey);
	},
	
	// CLEARS THE TOKENS FROM STORAGE
	clear(key) {
		if (localStorage && localStorage.getItem(key)) {
		  return localStorage.removeItem(key);
		}
	
		if (sessionStorage && sessionStorage.getItem(key)) {
		  return sessionStorage.removeItem(key);
		}
	
		return null;
	},
	
	// CALLS CLEAR TO CLEAR TOKENS WHILE SIGNOUT
	clearToken(tokenKey = ACCESS_TOKEN ) {
		return auth.clear(tokenKey);
	},

    
};

export default auth; 