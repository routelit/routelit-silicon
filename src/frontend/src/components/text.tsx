import { memo } from "react";

const Text = memo(function Text({ text, ...props }: { text: string } & React.HTMLAttributes<HTMLParagraphElement>) {
    return <p {...props}>{text}</p>;
});

Text.displayName = "Text";

export default Text;
