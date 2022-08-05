import { useNavigate } from "react-router-dom";

export const CheckVerified = (status) => {
    const navigate = useNavigate();
   /*  switch (status){
        case 404:
              navigate('/verify');
            break;
        case 500:
             navigate('/');
            break;
        case 403:
             navigate('/verify');
            break;
        default:
    } */
    if (status == 404) {
        navigate('/verify');
    } else {
        
    }
};