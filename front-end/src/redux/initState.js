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
    userId: 123456,
    userName: "Kolya",
    userEmail: "Kolya@gmail.com",
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
