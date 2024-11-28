import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "flex items-center p-2 text-sm font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  " +
                (active ? "bg-gray-100" : "") +
                className
            }
        >
            {children}
        </Link>
    );
}
