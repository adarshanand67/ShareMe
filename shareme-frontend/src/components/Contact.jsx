import { Toast, useToast } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import EmailIcon from "@mui/icons-material/Email";
import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Contact = () => {
  const form = useRef(); // Getting form reference
  const navigate = useNavigate();
  const toast = useToast();

  const sendEmail = (e) => {
    e.preventDefault();

    // Change user id and template id, personal access token
    emailjs
      .sendForm(
        "service_h2k5q27", // service id
        "template_eju6fei", // template id
        form.current,
        "lgGfkiUnJICbaIc-Q"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent");

          // Show Toast of email sent
          toast({
            title: "Email sent",
            description: "We will get back to you soon",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          navigate("/"); // Navigate to home page
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <section className="bg-white ">
        <div className="mx-auto max-w-screen-md px-4 lg:py-16">
          <h1 className="text-center text-3xl text-red-500">
            Contact <span className="text-black"> Us</span>
          </h1>
          <p className=" text-center font-light text-gray-500 lg:mb-16">
            Got a technical issue? Want to send feedback about a beta feature?
          </p>
          {/* Form */}
          <form ref={form} onSubmit={sendEmail} className="gap-5">
            {/* Name */}
            <div>
              <label className="mt-5 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="Your Name"
                required=""
              />
            </div>
            {/* email */}
            <div>
              <label className="mt-5 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder="name@gmail.com"
                required=""
              />
            </div>

            {/* message */}
            <div className="sm:col-span-2">
              <label className="mt-5 block text-sm font-medium text-gray-900 dark:text-gray-400">
                Your message
              </label>
              <textarea
                name="message"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Leave a comment..."
              />
            </div>
            <div className="flex flex-row justify-center">
              <input
                type="submit"
                value="Send"
                className="m-5 cursor-pointer rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 "
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
