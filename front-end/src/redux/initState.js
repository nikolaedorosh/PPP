const initState = {

  isSignedIn: false,
  userID: null,
  graphics: [],
  info: { age: "", gender: "", weight: "", height: "", activity: "", bmi: "",targetWeight: null,
  targetKcal: null,
  targetProteins: null,
  targetCarbs: null,
  targetFats: null, },
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



};

export default initState;
