import React from "react";
import "./AuroraBlobs.css";

const blobs = [
    {
        className: "aurora-blob blob1",
        style: { background: "#a7c7ff" }, // Pastel Blue
    },
    {
        className: "aurora-blob blob2",
        style: { background: "#fbc2eb" }, // Light Pink
    },
    {
        className: "aurora-blob blob3",
        style: { background: "#f7d6e0" }, // Blush
    },
    {
        className: "aurora-blob blob4",
        style: { background: "#b9fbc0" }, // Mint
    },
];

const AuroraBlobs = () => (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
        {blobs.map((blob, i) => (
            <div
                key={i}
                className={blob.className}
                style={blob.style}
            />
        ))}
    </div>
);

export default AuroraBlobs; 