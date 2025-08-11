
export type Inspiration = {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    images: string[];
    aiHint: string;
    category: string;
    location: string;
    projectType: string;
    designStyle: string;
};

export const inspirations: Inspiration[] = [
    {
        slug: 'monochrome-magic-living-room',
        title: 'Monochrome Magic',
        description: 'A sophisticated living room using a powerful black and white palette.',
        longDescription: 'This design inspiration explores the timeless elegance of a monochrome color scheme. By layering different shades of white, gray, and black, and mixing textures like velvet, metal, and wood, the space feels rich and dynamic. This approach proves that you don\'t need color to make a bold statement.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'monochrome living room',
        category: 'Living Room',
        location: 'Paris, FR',
        projectType: 'Concept',
        designStyle: 'Modern Chic',
    },
    {
        slug: 'biophilic-bathroom-sanctuary',
        title: 'Biophilic Bathroom Sanctuary',
        description: 'A bathroom that seamlessly blends nature with modern amenities.',
        longDescription: 'This concept brings the outdoors in, creating a spa-like sanctuary. It features a walk-in shower with a stone floor, a freestanding tub surrounded by lush plants, and a skylight to flood the room with natural light. The use of wood, stone, and greenery promotes a sense of calm and well-being.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'biophilic bathroom',
        category: 'Bathroom',
        location: 'Kyoto, JP',
        projectType: 'Concept',
        designStyle: 'Organic Modern',
    },
    {
        slug: 'jewel-toned-dining-room',
        title: 'Jewel-Toned Dining Room',
        description: 'A dramatic and luxurious dining space with rich, saturated colors.',
        longDescription: 'This inspiration showcases the power of bold color choices. Deep emerald green walls, sapphire blue velvet chairs, and ruby red accents create a dramatic and opulent atmosphere. Gold fixtures and a statement chandelier complete this luxurious look, perfect for hosting memorable dinner parties.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'jewel tone dining',
        category: 'Dining Room',
        location: 'London, UK',
        projectType: 'Concept',
        designStyle: 'Maximalist',
    },
    {
        slug: 'california-casual-bedroom',
        title: 'California Casual Bedroom',
        description: 'A light, airy, and effortlessly chic bedroom with a relaxed vibe.',
        longDescription: 'Inspired by the laid-back lifestyle of the West Coast, this bedroom features a neutral palette, natural materials like linen and rattan, and a minimalist approach to decor. The focus is on comfort and simplicity, creating a breezy and inviting space that feels like a permanent vacation.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'california bedroom',
        category: 'Bedroom',
        location: 'Los Angeles, CA',
        projectType: 'Concept',
        designStyle: 'California Casual',
    },
    {
        slug: 'industrial-loft-kitchen',
        title: 'Industrial Loft Kitchen',
        description: 'A functional and stylish kitchen that celebrates raw, industrial materials.',
        longDescription: 'This design idea highlights the beauty of industrial elements. Exposed brick walls, concrete countertops, and stainless steel appliances are balanced by warm wood open shelving. It\'s a practical, durable, and highly stylish solution for an urban loft or modern home.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'industrial kitchen',
        category: 'Kitchen',
        location: 'Brooklyn, NY',
        projectType: 'Concept',
        designStyle: 'Industrial',
    },
    {
        slug: 'bohemian-reading-corner',
        title: 'Bohemian Reading Corner',
        description: 'A cozy and eclectic nook perfect for getting lost in a good book.',
        longDescription: 'This inspiration shows how to create a personalized retreat in a small space. A comfortable armchair is layered with pillows and throws, surrounded by plants, and accompanied by a unique side table and a soft rug. It\'s a perfect example of how to mix patterns, textures, and personal items to create a cozy, bohemian vibe.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'bohemian reading nook',
        category: 'Living Room',
        location: 'Lisbon, PT',
        projectType: 'Concept',
        designStyle: 'Bohemian',
    }
];
