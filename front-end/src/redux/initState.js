const initState = {
  isSignedIn: false,
  userID: null,
  food: [],
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

  auth: {
    isSignedIn: null, // false
    userId: null,
    userName: "Kolya",
    userEmail: null,
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
