export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    console.log(serializedState, 'HEYHEYEHEY');
    if (serializedState === null) {
      return {
        isSignedIn: false,
        userId: null,
        userName: null,
        userEmail: null,
        userProfileImg: {},
      };
    }
    return JSON.parse(serializedState.auth);
  } catch (err) {
    return console.log("YA V OSHIBKE");
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {}
};
