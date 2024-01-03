export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `bg-orange-500 inline-flex btn glass scale-75 items-center px-4 py-2 h-5 bg- border border-transparent rounded-md font-semibold text-lg  text-white  tracking-widest hover:bg-primary focus:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
