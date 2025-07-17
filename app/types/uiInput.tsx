
export type InputProps = {
    label?: string;
    labelFontSize?: string;
    placeholder?: string;
    value: string;
    fontSize?: string;
    width?: string;
    height?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    variant: "orangeBorder" | "fullOrange" | "transparent";
    classes?: string;
    type?: string;
    isTextArea?: boolean;
    rounded?: string
};