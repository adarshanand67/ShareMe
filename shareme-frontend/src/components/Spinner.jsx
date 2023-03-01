import { SyncLoader } from "react-spinners";

// Change spinners
const Spinner = ({ message }) => {
  return (
    <div className="mt-5 flex h-full w-full flex-col items-center justify-center gap-5">
      <SyncLoader
        color="#f44336"
        aria-label="Loading Spinner"
        data-testid="loader"
        size={20}
      />

      <p className="px-2 text-center text-lg">{message}</p>
    </div>
  );
};

export default Spinner;
