export const Card = ({ children, heading }) => {
  return (
    <section className="bg-white shadow-xl p-10 rounded-2xl">
      {heading ? <h2 className="text-5xl mb-8">{heading}</h2> : null}

      {children}
    </section>
  );
};
