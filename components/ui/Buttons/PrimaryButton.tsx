import { Spinner } from "../Spinner";
import { ButtonProps } from './types';



const PrimaryButton = ({
  loading,
  text,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="primary border p-3 bg-slate-300"
    > {loading ? <Spinner /> : <span>{text}</span>}
    </button>
  );
};

export { PrimaryButton };
