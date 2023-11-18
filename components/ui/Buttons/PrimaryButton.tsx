interface ButtonProps {
  loading: boolean;
  text: string;
  onClick: () => void;
  type?: "button";
}

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
    >
      <span>{text}</span> 
    </button>
  );
};

export { PrimaryButton };
