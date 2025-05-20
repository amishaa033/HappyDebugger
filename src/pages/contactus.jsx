import React, { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
      date: new Date().toISOString(),
    };
    try {
      const response = await fetch("https://sheetdb.io/api/v1/wduk0v4lrwxlk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        setSuccess(true);
        setName(""); setEmail(""); setMessage("");
        setTimeout(() => setSuccess(false), 2000);
      } else {
        alert("Failed to save to Google Sheet.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-400 mb-4">Contact Us</h2>
        <p className="text-gray-300 mb-6">
          We'd love to hear from you! Fill out the form below or reach out directly.
        </p>
        <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-white"
          >
            Send
          </button>
          {success && <div className="text-green-400 mt-2">Message saved!</div>}
        </form>
      </div>
    </div>
  );
}
