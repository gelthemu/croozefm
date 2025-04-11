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
      const response = await fetch("https://formbold.com/s/9xvzN", {
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
        }, 2000);
        setTimeout(() => {
          setFormStatus({
            isSubmitting: false,
            isSubmitted: false,
            isError: false,
          });
          setTimeout(() => {
            hideForm();
          }, 1500);
        }, 5000);
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
      }, 2000);
      setTimeout(() => {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          isError: false,
        });
        setTimeout(() => {
          hideForm();
        }, 1500);
      }, 5000);
    }
  };

  const clearForm = () => {
    hideForm();
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setFormStatus({
      isSubmitting: false,
      isSubmitted: false,
      isError: false,
    });
  };

  return (
    <FixedDiv
      className={`${
        showForm ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } origin-bottom-right transition-all duration-[0.6s]`}
    >
      <div className="relative w-full bg-light dark:bg-gray rounded-sm text-sm p-3">
        <div className="group relative mb-6 px-2 flex items-center justify-between select-none">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold _912cfm">
              <span className="text-red">{"Text 'Us' Anything"}</span>
            </h3>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={clearForm}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && clearForm()
            }
            aria-label="Hide Form"
            className="flex items-center justify-center cursor-pointer focus:outline-none"
          >
            <div className="w-6 aspect-square flex items-center justify-center group-hover:rotate-180 transition duration-300">
              {<X size={18} />}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 select-none">
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              pattern="[A-Za-z ]+"
              minLength={4}
              maxLength={20}
              className="w-full px-4 py-3 bg-transparent rounded-sm border border-gray/30 dark:border-light/20 focus:ring-1 focus:ring-red focus:outline-none focus:border-none transition-all duration-[0.6s] peer"
            />
            <label
              htmlFor="name"
              className="absolute left-2 -top-2 text-xs rounded-sm bg-light dark:bg-gray px-2 transition-all duration-[0.6s] peer-focus:text-red"
            >
              Name *
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent rounded-sm border border-gray/30 dark:border-light/20 focus:ring-1 focus:ring-red focus:outline-none focus:border-none transition-all duration-[0.6s] peer"
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-2 text-xs rounded-sm bg-light dark:bg-gray px-2 transition-all duration-[0.6s] peer-focus:text-red"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9+]+"
                className="w-full px-4 py-3 bg-transparent rounded-sm border border-gray/30 dark:border-light/20 focus:ring-1 focus:ring-red focus:outline-none focus:border-none transition-all duration-[0.6s] peer"
              />
              <label
                htmlFor="phone"
                className="absolute left-2 -top-2 text-xs rounded-sm bg-light dark:bg-gray px-2 transition-all duration-[0.6s] peer-focus:text-red"
              >
                Phone
              </label>
            </div>
          </div>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-3 bg-transparent rounded-sm border border-gray/30 dark:border-light/20 focus:ring-1 focus:ring-red focus:outline-none focus:border-none transition-all duration-[0.6s] peer"
            />
            <label
              htmlFor="message"
              className="absolute left-2 -top-2 text-xs rounded-sm bg-light dark:bg-gray px-2 transition-all duration-[0.6s] peer-focus:text-red"
            >
              Message *
            </label>
          </div>
          <div className="text-right">
            <button
              type="submit"
              aria-label="Send Text"
              disabled={
                formStatus.isSubmitting ||
                formStatus.isSubmitted ||
                formStatus.isError
              }
              className="inline-flex items-center space-x-2 -mt-8 p-3 text-red disabled:text-gray dark:disabled:text-light/40 font-semibold _912cfm p-2 rounded-sm focus:outline-none transition-all duration-300"
            >
              <span>
                {formStatus.isSubmitting
                  ? "Sending..."
                  : formStatus.isSubmitted
                  ? "Sent!"
                  : formStatus.isError
                  ? "Try Again"
                  : "Send Text"}
              </span>
              {!formStatus.isSubmitting && !formStatus.isSubmitted && (
                <IoMdSend size={18} />
              )}
            </button>
          </div>
        </form>
        {formStatus.isSubmitted && (
          <div className="bg-turquoise/10 border border-turquoise/80 text-turquoise text-sm p-4 rounded mt-4 animate-fade-in">
            <div className="flex space-x-3">
              <FaHandsClapping size={24} />
              <p>Thank you! Your message has been sent.</p>
            </div>
          </div>
        )}
        {formStatus.isError && (
          <div className="bg-red/10 border border-red/50 text-red text-sm p-4 rounded mt-4 animate-fade-in">
            <p>Oops! Something went wrong...</p>
          </div>
        )}
      </div>
    </FixedDiv>
  );
}
