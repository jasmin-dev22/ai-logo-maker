const HeadingDescription = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-primary text-3xl font-bold">{title}</h2>
      <p className="text-lg text-gray-500">{description}</p>
    </div>
  );
};
export default HeadingDescription;
