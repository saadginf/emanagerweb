export const StoreToken = (authToken, refreshToken) => {
  localStorage.setItem("najiToken", authToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("token stored");
};
// const storeUser = async (user) => {
//   try {
//     await SecureStore.setItemAsync("edukUser", JSON.stringify(user));
//     console.log("user stored");
//   } catch (error) {
//     console.log("Error Storing the User", error);
//   }
// };
// const getUser = async () => {
//   try {
//     return await SecureStore.getItemAsync("edukUser");
//   } catch (error) {
//     console.log("Error getting the User", error);
//   }
// };
export const getToken = () => {
  return localStorage.getItem("najiToken");
};
// const getRefreshToken = async () => {
//   try {
//     return await SecureStore.getItemAsync("refreshToken");
//   } catch (error) {
//     console.log("Error getting the Refresh Token", error);
//   }
// };
export const removeToken = () => {
  localStorage.removeItem("najiToken");
  localStorage.removeItem("refreshToken");
};
// };
// const removeUser = async () => {
//   try {
//     await SecureStore.deleteItemAsync("edukUser");
//   } catch (error) {
//     console.log("Error in deleting user", error);
//   }
// };
