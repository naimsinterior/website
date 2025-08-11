'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/app/projects/projects';

const MOODBOARD_STORAGE_KEY = 'naimsinterior-moodboard';

export const useMoodboard = () => {
    const [moodboard, setMoodboard] = useState<Project[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const items = window.localStorage.getItem(MOODBOARD_STORAGE_KEY);
            if (items) {
                setMoodboard(JSON.parse(items));
            }
        } catch (error) {
            console.error("Failed to load moodboard from localStorage", error);
            setMoodboard([]);
        }
        setIsLoaded(true);
    }, []);

    const saveToLocalStorage = (items: Project[]) => {
        try {
            window.localStorage.setItem(MOODBOARD_STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("Failed to save moodboard to localStorage", error);
        }
    };

    const addToMoodboard = useCallback((project: Project) => {
        setMoodboard((prev) => {
            const newMoodboard = [...prev, project];
            saveToLocalStorage(newMoodboard);
            return newMoodboard;
        });
    }, []);

    const removeFromMoodboard = useCallback((slug: string) => {
        setMoodboard((prev) => {
            const newMoodboard = prev.filter((item) => item.slug !== slug);
            saveToLocalStorage(newMoodboard);
            return newMoodboard;
        });
    }, []);

    const clearMoodboard = useCallback(() => {
        setMoodboard([]);
        try {
            window.localStorage.removeItem(MOODBOARD_STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear moodboard in localStorage", error);
        }
    }, []);

    return { moodboard, isLoaded, addToMoodboard, removeFromMoodboard, clearMoodboard };
};
