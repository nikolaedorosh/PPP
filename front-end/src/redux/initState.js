const initState = {
  isSignedIn: false,
  userID: null,
  food: [],
  graphics: [],
  info: { age: "", gender: "", weight: "", height: "", activity: "", bmi: "" },
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

  auth: {
    isSignedIn: null, // false
    userId: 123456,
    userName: "Kolya",
    userEmail: "Kolya@gmail.com",
  },
  food: [], // или закомитить

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
