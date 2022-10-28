import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import EmailIcon from "@mui/icons-material/Email";
import { Toast, useToast } from "@chakra-ui/react";
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
        "service_h2k5q27",
        "template_vqlawut",
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
        <div className="lg:py-16 px-4 mx-auto max-w-screen-md">
          <h1 className="text-3xl text-center text-red-500">
            Contact <span className="text-black"> Us</span>
          </h1>
          <p className=" lg:mb-16 font-light text-center text-gray-500">
            Got a technical issue? Want to send feedback about a beta feature?
          </p>
          {/* Form */}
          <form ref={form} onSubmit={sendEmail} className="gap-5">
            {/* Name */}
            <div>
              <label className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Your Name"
                required=""
              />
            </div>
            {/* email */}
            <div>
              <label className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@gmail.com"
                required=""
              />
            </div>

            {/* message */}
            <div className="sm:col-span-2">
              <label className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-400">
                Your message
              </label>
              <textarea
                name="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              />
            </div>
            <div className="flex flex-row justify-center">
              <input
                type="submit"
                value="Send"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer m-5 "
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
