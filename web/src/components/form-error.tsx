type FormErrorProps = {
    message: string | undefined;
};

export function FormError(props: FormErrorProps) {
    return (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {props.message}
        </p>
    )
}   