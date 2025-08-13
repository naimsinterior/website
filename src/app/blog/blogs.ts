
export type Blog = {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    images: string[];
    aiHint: string;
    category: string;
    author: string;
    authorImage: string;
    authorRole: string;
    date: string;
    content: string;
};

export const blogs: Blog[] = [
    {
        slug: 'top-interior-design-trends-2025',
        title: 'Top Interior Design Trends to Watch in 2025',
        description: 'Discover the styles, colors, and materials that will define interior design in the coming year.',
        longDescription: 'As we look ahead, 2025 is shaping up to be a year of bold expression and sustainable choices in interior design. From the resurgence of retro-futurism to the deep dive into biophilic principles, we are seeing a shift towards spaces that are not only aesthetically pleasing but also deeply connected to nature and personal well-being. This article explores the key trends that will shape our homes and commercial spaces, offering insights into how you can incorporate them into your own projects.',
        images: ['https://placehold.co/1200x800.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'futuristic interior design',
        category: 'Trends',
        author: 'Jane Doe',
        authorImage: 'https://placehold.co/100x100.png',
        authorRole: 'Lead Designer',
        date: 'July 26, 2024',
        content: `
            <p>The world of interior design is in constant flux, but 2025 promises a particularly exciting blend of nostalgia and futurism. Homeowners and designers alike are looking for ways to create spaces that are both comforting and inspiring.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">1. Biophilic Design & Natural Materials</h3>
            <p>The connection to nature is stronger than ever. Expect to see an abundance of natural materials like cork, bamboo, and reclaimed wood. Large windows, indoor plants, and natural light will be key components in creating calming, restorative environments. This trend is not just about aesthetics; it's about improving mental and physical well-being.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">2. The Return of Brown</h3>
            <p>While gray has dominated for years, warm, earthy tones are making a comeback. Shades of chocolate, caramel, and terracotta will bring a sense of warmth and stability to interiors. These colors pair beautifully with the natural materials mentioned above, creating a cohesive and inviting atmosphere.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">3. Sustainable and Conscious Choices</h3>
            <p>Sustainability is no longer a niche concern. In 2025, it will be at the forefront of design. This means a greater emphasis on vintage and second-hand furniture, materials with low environmental impact, and high-quality pieces designed to last a lifetime. Consumers are increasingly aware of their carbon footprint, and their homes will reflect this.</p>
        `,
    },
    {
        slug: 'maximizing-small-spaces',
        title: 'Think Big: 10 Smart Ways to Maximize Small Spaces',
        description: 'Ingenious tips and tricks to make even the smallest apartment feel spacious and airy.',
        longDescription: 'Living in a small space doesn\'t mean you have to compromise on style or functionality. With a few clever design strategies, you can transform a compact room into a comfortable and efficient home. This guide provides ten practical tips for making the most of every square inch, from smart storage solutions to optical illusions that create a sense of openness.',
        images: ['https://placehold.co/1200x800.png', 'https://placehold.co/800x600.png'],
        aiHint: 'small apartment living room',
        category: 'Tips & Tricks',
        author: 'John Smith',
        authorImage: 'https://placehold.co/100x100.png',
        authorRole: 'Project Manager',
        date: 'July 15, 2024',
        content: `
            <p>Maximizing a small space is a common challenge, but with the right approach, it can be a rewarding design puzzle. The key is to be intentional with every choice.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">1. Multi-functional Furniture</h3>
            <p>Invest in pieces that can do double duty. Think coffee tables with hidden storage, extendable dining tables, or sofas that convert into beds. This reduces clutter and frees up valuable floor space.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">2. Go Vertical</h3>
            <p>Utilize your wall space. Tall, narrow bookshelves, floating shelves, and wall-mounted desks can provide ample storage without taking up a large footprint. This draws the eye upward, making the room feel taller.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">3. The Power of Mirrors</h3>
            <p>Mirrors are a small-space secret weapon. They reflect light and create an illusion of depth, making any room feel larger and brighter. A large, well-placed mirror can have a dramatic effect.</p>
        `,
    },
    {
        slug: 'choosing-the-right-paint-color',
        title: 'The Psychology of Color: Choosing the Perfect Paint',
        description: 'How to select the right paint colors to create the perfect mood in every room of your house.',
        longDescription: 'Paint is one of the most powerful and cost-effective tools in a designer\'s arsenal. The right color can completely transform a space, affecting everything from your mood to your perception of the room\'s size. In this article, we delve into the psychology of color and provide a room-by-room guide to help you choose the perfect palette for your home.',
        images: ['https://placehold.co/1200x800.png', 'https://placehold.co/800x600.png'],
        aiHint: 'paint swatches on wall',
        category: 'DIY',
        author: 'Emily White',
        authorImage: 'https://placehold.co/100x100.png',
        authorRole: 'Marketing Head',
        date: 'June 28, 2024',
        content: `
            <p>Choosing a paint color can be overwhelming, but understanding the psychological impact of different hues can make the process easier and more fun.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">Living Room: Versatile & Welcoming</h3>
            <p>For living rooms, consider warm neutrals, soft greens, or calming blues. These colors are versatile and create a welcoming atmosphere for both relaxing and entertaining guests.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">Bedroom: Calm & Serene</h3>
            <p>Bedrooms are personal sanctuaries, so opt for colors that promote rest and relaxation. Cool tones like blue, lavender, and green are excellent choices. If you prefer warmer tones, consider a soft, muted pink.</p>
            <h3 class="font-headline text-2xl mt-8 mb-4">Kitchen: Energizing & Clean</h3>
            <p>Kitchens are often the heart of the home, so you can be a bit more playful here. Yellows can stimulate appetite and create a cheerful vibe, while classic white or light gray promotes a sense of cleanliness and order.</p>
        `,
    },
];
