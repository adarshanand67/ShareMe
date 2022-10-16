// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import user from "./user"; // Custom schema
import pin from "./pin"; // Custom schema
import save from "./save"; // Custom schema
import comment from "./comment"; // Custom schema
import postedBy from "./postedBy"; // Custom schema

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    user,
    pin,
    save,
    comment,
    postedBy,
  ]),
});
