const initState = {
  graphics: [],
  info: {
    age: "",
    gender: "",
    weight: "",
    height: "",
    activity: "",
    bmi: "",
    targetWeight: null,
    kcal: null,
    Proteins: null,
    carbohydrates: null,
    fats: null,
  },
  food: {
    options: [],
    meals: [],
  },
  auth: {
    isSignedIn: null, // false
    userId: 123456,
    userName: "Kolya",
    userEmail: "Kolya@gmail.com",
    userProfileImg: {},
  },

  // graphics: {},
  // auth: {},
  // meal: {},
  // profile: {
  //   targetWeight: null,
  //   targetKcal: null,
  //   targetProteins: null,
  //   targetCarbs: null,
  //   targetFats: null,
  // },
};

export default initState;
