
export interface Project {
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
    testimonial?: {
        text: string;
        author: string;
    };
    itemType: 'project';
}

export const projects: Project[] = [
    {
        slug: 'ethereal-heights-penthouse',
        title: 'Ethereal Heights Penthouse',
        description: 'A luxurious penthouse combining modern elegance with panoramic city views.',
        longDescription: 'This project redefines urban luxury. We designed a sophisticated penthouse that serves as a tranquil escape from the bustling city below. It features floor-to-ceiling windows, a minimalist color palette with metallic accents, and bespoke furniture that enhances the sense of space and light.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'luxury penthouse',
        category: 'Full Home',
        location: 'Manhattan, NY',
        projectType: 'Penthouse',
        designStyle: 'Modern Luxury',
        testimonial: {
            text: "NAIMS INTERIOR transformed our apartment into a work of art. Their vision and execution were flawless.",
            author: "Julia & Mark Thompson"
        },
        itemType: 'project',
    },
    {
        slug: 'the-writers-nook',
        title: 'The Writer\'s Nook',
        description: 'A cozy, custom-designed home office built for creativity and focus.',
        longDescription: 'For this project, we created an inspiring home office for a novelist. The design features dark wood shelving, a comfortable reading chair, and optimized lighting to reduce eye strain. The result is a quiet, organized, and motivating space that nurtures creativity.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'cozy home office',
        category: 'Home Office',
        location: 'Boston, MA',
        projectType: 'Room Remodel',
        designStyle: 'Classic Academia',
        itemType: 'project',
    },
    {
        slug: 'sapphire-shores-kitchen',
        title: 'Sapphire Shores Kitchen',
        description: 'A state-of-the-art kitchen featuring deep blue cabinetry and marble countertops.',
        longDescription: 'This kitchen remodel focused on creating a bold and functional culinary space. We used custom sapphire-blue cabinets as the centerpiece, complemented by white marble countertops and brass fixtures. The layout was optimized for workflow, making it a joy for cooking and entertaining.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'blue kitchen',
        category: 'Kitchen',
        location: 'The Hamptons, NY',
        projectType: 'Kitchen Remodel',
        designStyle: 'Coastal Modern',
        testimonial: {
            text: "Our new kitchen is both stunning and incredibly functional. It has become the heart of our home.",
            author: "The Miller Family"
        },
        itemType: 'project',
    },
    {
        slug: 'serene-suburban-master-suite',
        title: 'Serene Suburban Master Suite',
        description: 'A tranquil master bedroom designed for ultimate relaxation and comfort.',
        longDescription: 'We transformed a standard master bedroom into a serene retreat. The design incorporates a soft, neutral color palette, plush textiles, and a private seating area. We also added custom closets and a spa-like ensuite bathroom to create a complete, cohesive master suite.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'tranquil bedroom',
        category: 'Bedroom',
        location: 'Scarsdale, NY',
        projectType: 'Master Suite',
        designStyle: 'Contemporary',
        itemType: 'project',
    },
    {
        slug: 'rustic-vineyard-manor',
        title: 'Rustic Vineyard Manor',
        description: 'A sprawling manor that blends rustic charm with refined, old-world elegance.',
        longDescription: 'Set in wine country, this manor was designed to feel both grand and inviting. We used reclaimed wood beams, natural stone fireplaces, and wrought-iron details to create a rustic foundation, then layered in luxurious fabrics and antique furniture for a touch of elegance.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'rustic manor',
        category: 'Full Home',
        location: 'Napa Valley, CA',
        projectType: 'Estate',
        designStyle: 'Rustic Elegance',
        testimonial: {
            text: "They perfectly captured the essence of the landscape in our home's design. It's our dream come true.",
            author: "Isabella & David Chen"
        },
        itemType: 'project',
    },
];
