import * as TYPES from "../types/types";

const mainReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.USER_DATA_CHANGE:
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: action.payload._id,
          userName: action.payload.name,
          userEmail: action.payload.email,
        },
        info: {
          ...state.info,
          age: action.payload.age,
          gender: action.payload.gender,
          weight: action.payload.weight,
          height: action.payload.height,
          activity: action.payload.activity,
          bmi: action.payload.bmi,
          Proteins: action.payload.Proteins,
          carbohydrates: action.payload.carbohydrates,
          fats: action.payload.fats,
          kcal: action.payload.kcal,
          targetWeight: action.payload.targetWeight,
        },
      };
    case TYPES.CHANGE_OPTIONS:
      return {
        ...state,
        food: { ...state.food, options: action.payload },
      };
    case TYPES.ADD_MEAL:
      return {
        ...state,
        food: { ...state.food, meals: [...state.food.meals, action.payload] },
      };
    case TYPES.DELETE_MEAL:
      return {
        ...state,
        food: {
          ...state.food,
          meals: state.food.meals.filter((el) => el.date !== action.payload),
        },
      };
    case TYPES.GET_USERS:
      return {
        ...state,
        graphics: action.payload,
      };
    case TYPES.SIGN_IN:
      return {
        ...state,
        auth: { ...state.auth, isSignedIn: true, userId: action.payload },
      };
    case TYPES.SIGN_OUT:
      return {
        ...state,
        auth: { ...state.auth, isSignedIn: false, userId: null },
      };
    case TYPES.ADD_INFO:
      return {
        ...state,
        auth: {
          ...state.auth,
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
        },
      };
    case TYPES.PIC_UPLOAD:
      return {
        ...state,
        auth: { ...state.auth, userProfileImg: action.payload.profileImg },
      };

    default:
      return state;
  }
};

export default mainReducer;
