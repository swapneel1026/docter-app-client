import { RotatingLines } from "react-loader-spinner";

const CircleLoader = ({ height, width }) => {
  return (
    <RotatingLines
      visible={true}
      height={height}
      width={width}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      strokeColor="white"
    />
  );
};

export default CircleLoader;
