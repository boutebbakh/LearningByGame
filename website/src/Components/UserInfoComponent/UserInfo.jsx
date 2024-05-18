import React ,{useState ,useEffect} from 'react'
import axios from 'axios';
export const UserInfo = () => {
 
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/auth/info");
                setUserInfo(response.data);
                console.log('User information:', response.data);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    return (
        <div>
            <h2>User Information</h2>
            <p>Username: {userInfo.username}</p>
            
        </div>
    );
};
