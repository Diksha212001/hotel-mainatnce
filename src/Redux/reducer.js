// A function to format data, ensuring that each item is properly defined
const formatData = (data) => {
  return data.map(item => {
    if (item && item.id) {
      return {
        id: item.id,
        ...item
      };
    }
    return null; // Return null for any undefined items
  }).filter(item => item !== null); // Filter out any null items
};

// The reducer function
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'READ_FROM_FIREBASE':
      return formatData(action.payload);
    default:
      return state;
  }
};

export default reducer;
