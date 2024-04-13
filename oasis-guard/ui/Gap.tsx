type Props = {
    size: number;
    direction?: "vertical" | "horizontal";
};

export const Gap = ({ size, direction = "vertical" }: Props) => {
    return (
        <div
            style={{ [direction === "vertical" ? "height" : "width"]: size }}
        />
    );
};
