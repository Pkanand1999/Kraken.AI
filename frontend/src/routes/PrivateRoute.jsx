import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux/es/hooks/useSelector"

const Private= ({ children }) => {
  let authToken=localStorage.getItem('token');
let isAuth=useSelector((data)=>{
return data.reducerAuth.isAuth
})
  if (!isAuth && !authToken) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Private;