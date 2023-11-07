import { Toaster } from "react-hot-toast";

function ToasterProvider() {
  return (
    <div className="z-10 h-full">
      <Toaster/>
    </div>
  );
}

export default ToasterProvider;
