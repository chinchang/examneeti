export const Card = ({ children, heading, anchor, marginBottom, style }) => {
  return (
    <section
      className={`bg-white shadow-xl p-10 rounded-2xl border-gray-100 border ${
        marginBottom ? "mb-16" : ""
      }`}
      style={style}
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
