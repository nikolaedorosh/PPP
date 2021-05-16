const initState = {
  isSignedIn: false,
  userID: null,
  graphics: [],
  info: { age: "", gender: "", weight: "", height: "", activity: "", bmi: "" },
  food: {
    options: [],
    meals: []
  },
  auth: {
    isSignedIn: null, // false
    userId: null,
    userName: null,
    userEmail: null,
  },

  // graphics: {},
  // auth: {},
  // meal: {},
  profile: {
    targetWeight: null,
    targetKcal: null,
    targetProteins: null,
    targetCarbs: null,
    targetFats: null,
  },
};

export default initState;
