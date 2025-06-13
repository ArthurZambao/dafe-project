interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
    return (
        <button
            {...props}
            className="relative group overflow-hidden"
        >
            <span className="cursor-pointer inline-block relative z-10">{children}</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-azure-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
    );
}
