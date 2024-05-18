import React from "react";

const initialState = {
	userAuth: false,
	userProfile: {},
};

const MyContext = React.createContext();

function GlobalContextProvider({ children }) {
	const contextGetSet = React.useState(initialState);
	return (
		<MyContext.Provider value={contextGetSet}>{children}</MyContext.Provider>
	);
}


function useGlobalContext() {
	const [getGlobalState, setState] = React.useContext(MyContext);
	return {
		getGlobalState,
		setGlobalState: setState,
	};
}

export { GlobalContextProvider, useGlobalContext };
