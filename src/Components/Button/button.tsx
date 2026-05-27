
type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?:boolean;
  type?: "button" | "submit" | "reset"
};

export function Button ({ children, className, onClick, disabled, type= "button" }: ButtonProps) {

  return (
    <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`cursor-pointer bg-purple-500/10  border border-purple-400 hover:bg-purple-500/20 hover:border-purple-400/50 text-white text-center font-medium   px-4 transition-colors duration-200 ${className}`}>
      {children}
    </button>
  );
}