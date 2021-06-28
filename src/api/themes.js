import client from "./client";

// export const postArticle = (data) => {
//   return client.post(endpoint, data);
// };

export const getAllArticles = () => client.get("/api/events/themes");
export const addTheme = (data) => client.post("/api/events/themes", data);
export const addLieux = (data) => client.post("/api/events/lieux", data);
