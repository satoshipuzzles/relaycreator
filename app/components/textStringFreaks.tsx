"use client"
import { useEffect, useState } from 'react';

const TextStringFreaks: React.FC = () => {
    const items = ["PEOPLE", "FRENS", "DOGGS", "CHARTS", "VIBE", "PLANTS", "RECIPES", "CULT", "SONGS", "LOVER", "STYLE", "GROOVE","CLOTHES", "VACATION", "JOKES", ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [items.length]);

    return <div className="text-2xl text-customColor font-bold items-center">{items[currentIndex]}</div>;
};

export default TextStringFreaks;