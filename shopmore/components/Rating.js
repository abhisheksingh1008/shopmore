import Star from "./Star";

const Rating = ({ rating }) => {
  let fill = 0;

  return (
    <span>
      {[...Array(5)].map((_, index) => {
        if (rating >= 1) {
          fill = 1;
          rating--;
        } else if (rating > 0 && rating < 1) {
          fill = rating;
          rating = 0;
        } else if (rating === 0) {
          fill = 0;
        }
        return <Star key={index} fill={fill} />;
      })}
    </span>
  );
};

export default Rating;
