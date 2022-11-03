import { createContext, useState } from 'react';

//create a context, with createContext api
export const userDetailsContext = createContext();

const UserDetailsProvider = (props) => {
        // this state will be shared with all components 
    const [userDetails, setUserDetails] = useState(null);

    return (
        // this is the provider providing state
        <userDetailsContext.Provider value={[userDetails, setUserDetails]}>
            {props.children}
        </userDetailsContext.Provider>
    );
};

export default UserDetailsProvider;