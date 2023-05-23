const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  name:"",
  email:"",
  image:"",
  credit:"",
  isError: false,
  background: localStorage.getItem('bgcolour') || "black",
  color: localStorage.getItem('color') || "white",
  isSignup:false,
  chat:[],
  time:[],
  };
  
  const reducerAuth = (state = initialState,action) => {
    switch(action.type){
        case "SIGNUP_SUCCESS":{
          return{
            ...state,
            isSignup:action.payload.token,
          }
      
        }
        case "SIGNUP_FAILURE":{
          return{
            ...state,
            isSignup:action.payload.token,
          }
      
        }
        case "LOGIN_SUCCESS":{
          return{
            ...state,
            token:action.payload.token,
            isAuth:true,
            name:action.payload.name,
            email:action.payload.email,
            image:action.payload.image,
            credit:action.payload.credit
          }
      
        }
        case "LOGGEDIN_USER":{
          return{
            ...state,
            isAuth:true,
            name:action.payload.name,
            email:action.payload.email,
            image:action.payload.image,
            credit:action.payload.credit
          }
      
        }
        case "LOGIN_FAILURE":{
          return{
            ...state,
            isError:action.payload
          }
        }
        case "CHANGE_THEME":{
          return{
            ...state,
            background:action.payload[0],
            color:action.payload[1]
          }
        }
        case "LOG_OUT":{
          return{
            ...state,
            isAuth: false,
            name:"",
            email:"",
            image:"",
            credit:"",
            isError: false,
            token: localStorage.getItem('token'),
          }
        }
        case "CHAT":{
          return{
            ...state,
            chat:[...state.chat,action.payload]
          }
        }
        case "TIME":{
          return{
            ...state,
            chat:[...state.time,action.payload]
          }
        }
        default:
        return state;
      }
  };
  
  export { reducerAuth };