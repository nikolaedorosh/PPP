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
    isSignedIn: null,
    userId: "",
    userName: "",
    userEmail: "",
    userProfileImg: {},
  },
  week: [],
  loading: false,
  loadingModal: false
};

export default initState;
