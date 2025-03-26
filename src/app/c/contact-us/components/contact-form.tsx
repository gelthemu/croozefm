"use client";

import React, { useState } from "react";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import { FaHandsClapping } from "react-icons/fa6";

export default function ContactForm() {
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
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.log(error);
      setFormStatus({ isSubmitting: false, isSubmitted: false, isError: true });
    }
  };

  return (
    <div className="p-6 rounded-md shadow shadow-gray/20 dark:shadow-light/5 overflow-hidden border-y-4 border-red">
      <H2Title title="Send Us a Message" />
      <form onSubmit={handleSubmit} className="mt-10 font-medium">
        <div className="mb-4">
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
            className="w-full p-4 dark:bg-[#000]/20 border-b-2 border-gray/60 rounded-sm dark:border-light/50 focus:outline-none"
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
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
            className="w-full p-4 dark:bg-[#000]/20 border-b-2 border-gray/60 rounded-sm dark:border-light/50 focus:outline-none"
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
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
            className="w-full p-4 dark:bg-[#000]/20 border-b-2 border-gray/60 rounded-sm dark:border-light/50 focus:outline-none"
            placeholder="Phone"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-4 dark:bg-[#000]/20 border-b-2 border-gray/60 rounded-sm dark:border-light/50 focus:outline-none"
            placeholder="Message"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={formStatus.isSubmitting}
          className="w-full bg-red text-light font-medium _912cfm p-4 rounded-md disabled:bg-gray focus:outline-none"
        >
          {formStatus.isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
      {formStatus.isSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 text-sm p-4 rounded mt-4">
          <div className="flex justify-between space-x-3">
            <FaHandsClapping size={24} />
            <p>Thank you for your message! We&apos;ll get back to you soon.</p>
          </div>
        </div>
      ) : null}
      {formStatus.isError ? (
        <div className="bg-red/10 border border-red/50 text-red text-sm p-4 rounded mt-4">
          <p>Something went wrong. Please try again later.</p>
        </div>
      ) : null}
    </div>
  );
}
