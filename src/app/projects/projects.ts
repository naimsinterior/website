
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
    completionTime: string;
    designStyle: string;
    testimonial?: {
        text: string;
        author: string;
    };
}

export const projectsData: Project[] = [
    {
        slug: 'urban-oasis-loft',
        title: 'Urban Oasis Loft',
        description: 'A minimalist loft in the heart of the city, blending industrial elements with natural textures.',
        longDescription: 'This project transformed a raw industrial loft into a serene urban oasis. We focused on an open-plan layout, maximizing natural light. Key features include polished concrete floors, exposed brick walls, and custom-built oak cabinetry. The color palette is neutral, with pops of green from indoor plants to create a connection with nature.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'minimalist loft',
        category: 'Full Home',
        location: 'New York, NY',
        projectType: 'Loft Apartment',
        completionTime: '8 Weeks',
        designStyle: 'Industrial Minimalist',
        testimonial: {
            text: "NAIMS INTERIOR captured our vision perfectly. Our loft is now our favorite place to be.",
            author: "Alex & Jamie"
        }
    },
    {
        slug: 'coastal-charm-villa',
        title: 'Coastal Charm Villa',
        description: 'A light-filled villa with breezy, coastal-inspired decor and panoramic ocean views.',
        longDescription: 'Inspired by the surrounding coastline, this villa uses a palette of soft blues, sandy beiges, and crisp whites. We incorporated natural materials like linen, rattan, and weathered wood to evoke a relaxed, beachside atmosphere. Large windows and glass doors seamlessly connect the indoor and outdoor living spaces.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'coastal villa',
        category: 'Living Room',
        location: 'Malibu, CA',
        projectType: 'Villa',
        completionTime: '12 Weeks',
        designStyle: 'Coastal',
    },
    {
        slug: 'heritage-brownstone-revival',
        title: 'Heritage Brownstone Revival',
        description: 'A classic brownstone renovation that respects historical details while introducing modern luxury.',
        longDescription: "Restoring this historic brownstone was a delicate balance of preservation and modernization. We kept original features like the crown molding, fireplaces, and hardwood floors, while updating the kitchen and bathrooms with state-of-the-art appliances and finishes. The result is a home that feels both timeless and contemporary.",
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'classic brownstone',
        category: 'Full Home',
        location: 'Brooklyn, NY',
        projectType: 'Brownstone',
        completionTime: '6 Months',
        designStyle: 'Transitional',
        testimonial: {
            text: "They honored the history of our home while making it livable for a modern family. Incredible work.",
            author: "The Chen Family"
        }
    },
    {
        slug: 'scandinavian-retreat',
        title: 'Scandinavian Retreat',
        description: 'A tranquil home defined by Scandinavian principles of simplicity, functionality, and beauty.',
        longDescription: "This project embodies 'hygge'. We used a light and airy color scheme, natural wood floors, and minimalist furniture to create a calming and uncluttered environment. Functionality was key, with clever storage solutions integrated throughout the home. Wool, sheepskin, and soft lighting add warmth and texture.",
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'scandinavian home',
        category: 'Bedroom',
        location: 'Copenhagen, DK',
        projectType: 'Apartment',
        completionTime: '6 Weeks',
        designStyle: 'Scandinavian',
    },
    {
        slug: 'modern-farmhouse-escape',
        title: 'Modern Farmhouse Escape',
        description: 'A cozy yet sophisticated farmhouse that combines rustic warmth with clean, modern lines.',
        longDescription: "This modern farmhouse features classic elements like shiplap walls, a large apron-front sink, and barn doors, but with a modern twist. The open-concept living space is perfect for entertaining, with a neutral color palette and matte black fixtures providing a contemporary edge.",
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'modern farmhouse',
        category: 'Full Home',
        location: 'Austin, TX',
        projectType: 'Farmhouse',
        completionTime: '4 Months',
        designStyle: 'Modern Farmhouse',
        testimonial: {
            text: "It's the perfect blend of cozy and chic. We couldn't be happier with our new home.",
            author: "David & Sarah"
        }
    },
    {
        slug: 'downtown-corporate-hq',
        title: 'Downtown Corporate HQ',
        description: 'An innovative and collaborative workspace designed for a leading tech company.',
        longDescription: 'We designed this corporate headquarters to foster creativity and collaboration. The space includes a variety of work environments, from open-plan desks to quiet pods and informal meeting lounges. A bold color scheme, custom art installations, and biophilic design elements create a dynamic and energizing atmosphere.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'corporate office',
        category: 'Commercial',
        location: 'San Francisco, CA',
        projectType: 'Office',
        completionTime: '5 Months',
        designStyle: 'Modern & Biophilic',
    },
    {
        slug: 'modern-corporate-hub',
        title: 'Modern Corporate Hub',
        description: 'A sleek and professional office space designed for productivity and collaboration.',
        longDescription: 'This project involved designing a new headquarters for a fast-growing tech firm. The goal was to create a modern, energizing workspace that encourages collaboration while also providing quiet areas for focused work. The design features a mix of open-plan workstations, private offices with glass walls, and comfortable lounge areas. We used a cool color palette of blues and grays, accented with the company\'s brand colors. Natural wood elements and biophilic design add warmth and a connection to nature.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'modern office',
        category: 'Commercial',
        location: 'Seattle, WA',
        projectType: 'Office HQ',
        completionTime: '6 Months',
        designStyle: 'Corporate Modern',
        testimonial: {
            text: "The new office is incredible. NAIMS INTERIOR perfectly captured our company culture in the design. It's a place our team loves coming to.",
            author: "CEO of TechForward Inc."
        }
    },
    {
        slug: 'art-deco-apartment',
        title: 'Art Deco Apartment',
        description: 'A glamorous apartment that pays homage to the Art Deco era with bold geometrics and lavish details.',
        longDescription: 'This project was a full-scale remodel to bring the glamour of the Roaring Twenties into a modern city apartment. We used a rich color palette of deep jewel tones, metallics, and high-contrast black and white. Key features include custom terrazzo flooring, fan-shaped motifs, and luxurious velvet upholstery. The lighting was a key focus, with statement chandeliers and sconces creating a dramatic and inviting atmosphere.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'art deco apartment',
        category: 'Bedroom',
        location: 'Miami, FL',
        projectType: 'Apartment',
        completionTime: '10 Weeks',
        designStyle: 'Art Deco',
        testimonial: {
            text: "They brought our Gatsby-esque dreams to life! Every detail is exquisite.",
            author: "The Fitzgeralds"
        }
    }
];

export const projects: Project[] = [...projectsData].reverse();
