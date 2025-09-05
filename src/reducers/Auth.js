const initialState = false;

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VERIFY":
      console.log(action.isVerified);
      return action.isVerified;
    default:
      return state;
  }
}