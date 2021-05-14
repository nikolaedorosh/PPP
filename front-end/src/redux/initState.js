const initState = {
  isSignedIn: false,
  userID: null,
  food: [],
  age: "",
  gender: "",
  height: "",
  weight: "",
  activity: "",
  bodyBmi: "",
  wantedWeight: "",
  targetBmi: "",
  graphics: [],
  meal: [
    {
      date: "",
      info: {
        cal: null,
        fat: null,
        prot: null,
        carb: null,
      },
    },
  ],
};

export default initState;
