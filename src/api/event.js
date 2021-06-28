import client from "./client";

// export const postArticle = (data) => {
//   return client.post(endpoint, data);
// };
export const getEventFields = () => client.get("/api/events/fields");
export const getEventByTh = (id) => client.get("/api/events/th/" + id);
export const getEvents = () => client.get("/api/events");
export const getEvent = (id) => client.get("/api/events/" + id);

export const deleteEvent = (id) => client.delete("/api/events/" + id);
export const addListing = (data, file = "") => {
  const formda = new FormData();
  delete data["file"];
  const blob = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  formda.append("e", blob);
  formda.append("file", file);
  return client.post("/api/events", formda);
};
