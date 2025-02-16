import { ImSpinner2 } from "react-icons/im";

function Loader() {
  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center bg-green-100">
        <ImSpinner2 size={90} className="animate-spin text-green-500" />
      </div>
    </>
  );
}

export default Loader;
