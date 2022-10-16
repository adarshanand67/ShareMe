export default {
  name: "postedBy",
  title: "PostedBy",
  type: "reference",
  to: [{ type: "user" }], // Reference to the user schema
};

// postedBy is a reference to the user schema ie the user who posted the pin or saved the pin or commented on the pin