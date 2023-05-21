import axios from 'axios'


export function ChangeTheme(bg, color, dispatch) {
    dispatch({
        type: "CHANGE_THEME",
        payload: [bg, color]
    })
}

export function userIsLoggedIn(authToken,dispatch){
    fetch(`${process.env.REACT_APP_AUTH_URL}/loggedInUser`, {
        headers: {
          'authorization': `Bearer ${authToken}`
        }
      })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const user = result.data;
dispatch({
  type:"LOGGEDIN_USER",
  payload:user
})
      })
}





