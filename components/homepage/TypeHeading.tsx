import React, { useEffect, useState } from "react";

interface TextStyle {
    text: string;
    style?: React.CSSProperties;
}

const TypingHeading: React.FC<{
    texts: TextStyle[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pause?: number;
}> = ({ texts, typingSpeed = 100, deletingSpeed = 50, pause = 1500 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (!isDeleting && textIndex < texts[currentIndex].text.length) {
            // Typing text
            timeoutId = setTimeout(() => {
                setDisplayedText(
                    (prev) => prev + texts[currentIndex].text.charAt(textIndex),
                );
                setTextIndex((prev) => prev + 1);
            }, typingSpeed);
        } else if (isDeleting && textIndex > 0) {
            // Deleting text
            timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev.slice(0, -1));
                setTextIndex((prev) => prev - 1);
            }, deletingSpeed);
        } else {
            // Pause before switching between typing and deleting
            timeoutId = setTimeout(() => {
                if (!isDeleting) {
                    setIsDeleting(true); // Start deleting after typing
                } else {
                    setIsDeleting(false); // Start typing the next text
                    setCurrentIndex((prev) => (prev + 1) % texts.length); // Loop back to the first text
                    setTextIndex(0); // Reset character index
                }
            }, pause);
        }

        return () => clearTimeout(timeoutId);
    }, [
        texts,
        textIndex,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pause,
        currentIndex,
    ]);

    return (
        <h1
            className="text-[48px] font-semibold w-full text-center leading-height h-[100px]"
            style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
            {texts.map((item, index) => (
                <span
                    key={index}
                    style={index === currentIndex ? item.style : { display: "none" }}
                >
          {displayedText}
        </span>
            ))}
            <span className="blinking-cursor bg-purple-500"></span>
        </h1>
    );
};

export default TypingHeading;
