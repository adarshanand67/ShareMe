// Creating a schema to store image and title

export default {
  name: "user",
  title: "UserTitle",
  type: "document", // Document is a type of object
  fields: [
    {
      name: "userName",
      title: "UserName",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string",
    },
  ],
};
