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
    userId: 123456,
    userName: "Kolya",
    userEmail: "Kolya@gmail.com",
    userProfileImg: {},
  },
  week: []
};

export default initState;
