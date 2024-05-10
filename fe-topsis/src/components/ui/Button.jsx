const Button = ({ children, variant, ...props }) => {
  const variantClasses = {
    primary: "bg-orange-500 text-neutral-100 font-semibold active:scale-105 ts",
    secondary: "bg-gray-500 text-white hover:bg-gray-700",
    danger: "bg-red-500 text-white hover:bg-red-700",
  };

  const buttonClasses = `px-6 py-2 rounded-md ${
    variantClasses[variant] || variantClasses.primary
  }`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;