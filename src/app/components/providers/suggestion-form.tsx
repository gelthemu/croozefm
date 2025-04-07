"use client";

import React, { useState } from "react";
import { FaHandsClapping } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { X } from "lucide-react";
import FixedDiv from "@/app/components/providers/divs/fixed-element";
import { useSuggestionForm } from "@/app/context/suggestion-form-context";

export default function SuggestionForm() {
  const { hideForm, showForm } = useSuggestionForm();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, isError: false });

    try {
      const response = await fetch("https://fmbold.com/s/9xvzN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
        });
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }, 1000);
        setTimeout(() => {
          setFormStatus({
            isSubmitting: false,
            isSubmitted: false,
            isError: false,
          });
          setTimeout(() => {
            hideForm();
          }, 1500);
        }, 4000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.log(error);
      setFormStatus({ isSubmitting: false, isSubmitted: false, isError: true });
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }, 1000);
      setTimeout(() => {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          isError: false,
        });
        setTimeout(() => {
          hideForm();
        }, 1500);
      }, 4000);
    }
  };

  return (
    <FixedDiv
      className={`${showForm ? "" : "hidden"} transition-all duration-[0.6s]`}
    >
      <div className={`w-full text-sm`}>
        <div className="group mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold _912cfm">
              <span className="text-red">{"Text 'Us'"}</span>
            </h3>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={hideForm}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && hideForm()
            }
            aria-label="Hide Form"
            className="flex items-center justify-center cursor-pointer focus:outline-none"
          >
            <div className="w-6 aspect-square flex items-center justify-center group-hover:rotate-180 transition duration-300">
              {<X size={18} />}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="font-medium flex flex-col space-y-3 p-3 rounded-sm bg-light/80 dark:bg-dark/80 shadow shadow-gray/20 dark:shadow-light/10"
        >
          <div className="">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              pattern="[A-Za-z ]+"
              className="w-full p-2 bg-transparent border-b-2 border-gray/50 dark:border-light/50 rounded-sm focus:outline-none"
              placeholder="Name"
              minLength={4}
              maxLength={20}
            />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="w-full">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 bg-transparent border-b-2 border-gray/50 dark:border-light/50 rounded-sm focus:outline-none"
                placeholder="Email"
              />
            </div>

            <div className="w-full">
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9+]+"
                className="w-full p-2 bg-transparent border-b-2 border-gray/50 dark:border-light/50 rounded-sm focus:outline-none"
                placeholder="Phone"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="message" className="sr-only">
              Text Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 bg-transparent border-b-2 border-gray/50 dark:border-light/50 rounded-sm focus:outline-none"
              placeholder="Say something..."
            ></textarea>
          </div>
          <div className="self-end">
            <button
              aria-label="Send Text"
              type="submit"
              disabled={
                formStatus.isSubmitting ||
                formStatus.isSubmitted ||
                formStatus.isError
              }
              className="w-fit flex items-center space-x-1.5 text-red disabled:text-gray dark:disabled:text-light/40 font-semibold _912cfm p-2 rounded-sm focus:outline-none"
            >
              <span>
                {formStatus.isSubmitting
                  ? "Sending..."
                  : formStatus.isSubmitted
                  ? "Message Sent"
                  : formStatus.isError
                  ? "Not Sent, sorry!"
                  : "Send Text"}
              </span>
              <span>
                <IoMdSend size={18} />
              </span>
            </button>
          </div>
        </form>
        {formStatus.isSubmitted ? (
          <div className="bg-turquoise/10 border border-turquoise/80 text-turquoise text-sm p-4 rounded mt-4">
            <div className="flex justify-between space-x-3">
              <FaHandsClapping size={24} />
              <p>
                Thank you for your text message! Someone will reach out to you
                soon...
              </p>
            </div>
          </div>
        ) : null}
        {formStatus.isError ? (
          <div className="bg-red/10 border border-red/50 text-red text-sm p-4 rounded mt-4">
            <p>Something went wrong. Please try again later...</p>
          </div>
        ) : null}
      </div>
    </FixedDiv>
  );
}
