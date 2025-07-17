export type ButtonProps = {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    classes?: string;
    variant: "orangeBorder" | "fullOrange" | "transparent";
    type?: "button" | "submit" | "reset" | undefined;
};