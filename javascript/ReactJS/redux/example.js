// 사람들이 Form 을 던지고 간다. (Action Creator)
// 보험 가입
const createPolicy = (name, amount) => {
  return {
    // Action (Form)
    type: "CREATE_POLICY", // convention: All capital & underbar
    payload: {
      name: name, // name, amount
      amount: amount
    }
  };
};

// 보험 해지
const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

// 청구 작성
const createClaim = (name, amountToGet) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountToGet
    }
  };
};

// Reducers (부서)
const claimsHistory = (oldListOfClaims = [], action) => {
  // [...claims] & Form
  if (action.type === "CREATE_CLAIM") {
    // claim 관련 내용이야? (이 경우에는 createClaim)
    return [...oldListOfClaims, action.payload];
  } else {
    // claim 관련 내용이 아니구만
    return oldListOfClaims;
  }
};

const accounting = (bagOfMoney = 1000, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney;
  }
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name);
  } else {
    return listOfPolicies;
  }
};

const { createStore, combineReducers } = Redux;

const departments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(departments);

store.dispatch(createPolicy('neo', 20));
store.dispatch(createPolicy('tak', 40));
store.dispatch(createPolicy('john', 100));

store.dispatch(createClaim('neo', 1000));
store.dispatch(createClaim('tak', 30));

store.dispatch(deletePolicy('neo'));

console.log(store.getState()); // 중앙 데이터 가져오기