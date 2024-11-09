import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

const Contact = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_sa87e4p",
        "template_q4j6gga",
        {
          from_name: form.name,
          to_name: "Aung Khant",
          from_email: form.email,
          to_email: "aungkhant611658@gmail.com",
          message: form.message,
        },
        "jwo6mqV1LqI4j_uKW"
      );

      setLoading(false);
      alert("Your message has been sent!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className={`c-space ${isMobile ? "" : "my-20"}`}>
      <div className="relative min-h-screen flex items-center justify-center flex-col overflow-hidden">
        {!isMobile && (
          <img
            src="/assets/terminal.png"
            alt="terminal background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div
          className={`contact-container relative z-10 p-5 rounded-lg shadow-md max-w-md mx-auto ${
            isMobile && "bg-black-200"
          }`}
        >
          <h3 className="head-text">Contact Me</h3>
          <p className="text-lg text-gray-400 mt-3">
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Jimmy"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="jimmy@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Hi, I'm interested in..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}

              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
