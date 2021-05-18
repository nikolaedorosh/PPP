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
    scannedImg: null,
  },
  auth: {
    isSignedIn: null,
    userId: "609ef289d02da1867f40dae7",
    userName: "O",
    userEmail: "o@o.com",
    userProfileImg: "img-1621266213352.png",
  },
  week: [],
  loading: false
};

export default initState;
