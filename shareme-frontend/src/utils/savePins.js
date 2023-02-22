import { client } from "../client";

export function savePins(
  title,
  about,
  destination,
  imageAsset,
  category,
  user,
  toast,
  navigate,
  setFields
) {
  return () => {
    // Save pin if all fields given to sanity database
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      toast({
        title: "📌 Pin created successfully, wait for ~10 seconds to see it",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      client.create(doc).then(() => {
        navigate("/"); // Create pin and navigate to home page
      });
    } else {
      setFields(true);

      setTimeout(() => {
        // After 2 seconds set fields to false
        setFields(false);
      }, 2000);
    }
  };
}
