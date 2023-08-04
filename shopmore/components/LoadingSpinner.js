import classes from "../styles/LoadingSpinner.module.css";

const LoadingSpinner = ({ className }) => {
  return <div className={`${classes.loadingCircle} ${className}`}></div>;
};

export default LoadingSpinner;
