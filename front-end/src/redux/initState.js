const initState = {
  isSignedIn: false,
  userID: null,
  food: [],
  targetWeight: null,
  targetKcal: null,
  targetProteins: null,
  targetCarbs: null,
  targetFats: null,
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
};

export default initState;
