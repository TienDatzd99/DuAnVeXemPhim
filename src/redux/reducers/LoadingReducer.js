import { DISPLAY_LOADING, HIDE_LOADING } from "../actions/types/LoadingType"

const initialState = {
    isLoading: false
}

export const LoadingReducer =  (state = initialState,action) => {
  switch (action.type) {

  case DISPLAY_LOADING:{
    console.log("asdasd")
    return { ...state,isLoading: true }
  }
  case HIDE_LOADING:{
    return{...state,isLoading: false}
  }

  default:
    return state
  }
}
