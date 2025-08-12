
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/app/projects/projects';
import type { Inspiration } from '@/app/design/inspirations';

const MOODBOARD_STORAGE_KEY = 'naimsinterior-moodboard';

type MoodboardItem = (Project | Inspiration) & {itemType: 'project' | 'inspiration'};

const isInspiration = (item: Project | Inspiration): item is Inspiration => {
    return 'category' in item && 'longDescription' in item && 'projectType' in item && 'designStyle' in item && !('testimonial' in item);
}

export const useMoodboard = () => {
    const [moodboard, setMoodboard] = useState<MoodboardItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const itemsJSON = window.localStorage.getItem(MOODBOARD_STORAGE_KEY);
            if (itemsJSON) {
                const items = JSON.parse(itemsJSON);
                const typedItems = items.map((item: Project | Inspiration) => ({
                    ...item,
                    itemType: isInspiration(item) ? 'inspiration' : 'project'
                })) as MoodboardItem[];
                setMoodboard(typedItems);
            }
        } catch (error) {
            console.error("Failed to load moodboard from localStorage", error);
            setMoodboard([]);
        }
        setIsLoaded(true);
    }, []);

    const saveToLocalStorage = (items: (Project | Inspiration)[]) => {
        try {
            window.localStorage.setItem(MOODBOARD_STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("Failed to save moodboard to localStorage", error);
        }
    };

    const addToMoodboard = useCallback((item: Project | Inspiration) => {
        setMoodboard((prev) => {
            const newItem: MoodboardItem = {
                ...item,
                itemType: isInspiration(item) ? 'inspiration' : 'project'
            };
            
            if (prev.some(i => i.slug === newItem.slug)) {
                return prev;
            }

            const newMoodboard = [...prev, newItem];
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
