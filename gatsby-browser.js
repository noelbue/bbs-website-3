import "./src/styles/global.css";
export const onRouteUpdate = ({ location }) => {
  if (!document.title || document.title.includes("b-business-solutions.ch")) {
    document.title = "Bürgler Business Solutions";
  }
};
