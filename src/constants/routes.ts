export const ROUTES = {
  HOME: "/",
  DISCOVER: "/discover",
  MATCHES: "/matches",
  MESSAGES: "/messages",
  PROFILE: (userId = ":userId") => `/profile/${userId}`,
}
