import { RotatingLines } from "react-loader-spinner";

const CircleLoader = () => {
  return (
    <RotatingLines
      visible={true}
      height="20"
      width="20"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      strokeColor="white"
    />
  );
};

export default CircleLoader;
