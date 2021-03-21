export const Card = ({ children, heading, anchor, marginBottom }) => {
  return (
    <section
      className={`bg-white shadow-xl p-10 rounded-2xl border-gray-100 border ${
        marginBottom ? "mb-16" : ""
      }`}
    >
      {heading ? (
        <h2 id={anchor} className="text-5xl mb-8">
          {heading}
        </h2>
      ) : null}

      {children}
    </section>
  );
};
