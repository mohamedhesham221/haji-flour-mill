// A component to show rating stars.
// Gets the rating as a prop.
// To print stars, uses an array of size five and places stars span elements in array according to the rating.
const RatingComponent = ({ rating = 0 }) => {
  const stars = Array.from(new Array(5), (_, index) => (
    <span key={index}>
      {index < rating && "⭐"}
    </span>
  ));

  return <>{stars}</>
};

export default RatingComponent;