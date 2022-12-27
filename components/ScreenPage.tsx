import { forwardRef } from "react";

export const DivSpinner = () => <div>Loading...</div>;

export const DivContainer = forwardRef(({ children }, ref) => (
  <>
    <div ref={ref}></div>
  </>
));

const Loader = () => {
  return (
    <DivContainer>
      <DivSpinner />
    </DivContainer>
  );
};
export default Loader;
