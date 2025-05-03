const Testimonials = () => {
  const reviews = [
    {
      name: "Sundar Pitchai",
      feedback: "Amazing platform! Found my dream job in no time.",
    },
    {
      name: "Elon Musk",
      feedback: "Hiring was super easy with this service. Highly recommend!",
    },
    {
      name: "Steve Jobs",
      feedback: "Great experience! Helped me connect with top recruiters.",
    },
  ];

  return (
    <section className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Testimonials</h2>
      <ul>
        {reviews.map((review, index) => (
          <li
            key={index}
            className="mb-4 p-4 border border-gray-300 rounded-md"
          >
            <p className="font-bold">{review.name}</p>
            <p className="text-gray-600">{review.feedback}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
