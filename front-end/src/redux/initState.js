const initState = {
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
    isSignedIn: false, // false
    userId: null,
    userName: null,
    userEmail: null,
    userProfileImg: {},
  },
  week: [],
  loading: false,
};

export default initState;
