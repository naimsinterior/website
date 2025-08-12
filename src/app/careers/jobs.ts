
export type Job = {
    id: number;
    title: string;
    location: string;
    type: string;
    short: string;
    desc: string;
    skills: string[];
    images: string[];
    aiHint: string;
    posted: string;
    responsibilities: string[];
};

export const jobs: Job[] = [
    {
        id: 1,
        title: 'Interior Design Sales Executive',
        location: 'Remote',
        type: 'Work From Home',
        short: 'Handle inbound leads, present proposals and close deals remotely.',
        desc: 'We seek a motivated Sales Executive to manage leads, run virtual meetings and close sales. Familiarity with interior design terms is a plus.',
        skills: ['Sales', 'Communication', 'CRM'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'office sales',
        posted: 'Aug 2025',
        responsibilities: [
            'Work closely with clients and internal teams to deliver projects',
            'Meet targets and maintain quality standards',
            'Prepare reports and update CRM regularly'
        ]
    },
    {
        id: 2,
        title: 'Junior Interior Designer',
        location: 'Chennai',
        type: 'Full-Time',
        short: 'Assist senior designers with drawings, moodboards and client coordination.',
        desc: 'Looking for a creative Junior Designer to help produce CAD drawings and prepare design presentations. 1-2 years experience preferred.',
        skills: ['AutoCAD', 'SketchUp', 'Creativity'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'design desk',
        posted: 'July 2025',
        responsibilities: [
            'Produce detailed 2D and 3D drawings for client review',
            'Collaborate with senior designers on material and furniture selection',
            'Assist in creating compelling design presentations'
        ]
    },
    {
        id: 3,
        title: 'Site Supervisor',
        location: 'Bengaluru',
        type: 'Full-Time',
        short: 'Manage day-to-day site execution and vendor coordination.',
        desc: 'Experienced site supervisor to oversee fit-outs, quality checks and timelines. Prior experience in interior projects required.',
        skills: ['Site Management', 'Quality Control', 'Coordination'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'construction site',
        posted: 'June 2025',
        responsibilities: [
            'Oversee on-site activities to ensure project timelines are met',
            'Conduct regular quality checks and ensure adherence to design specifications',
            'Coordinate with contractors, vendors, and the design team'
        ]
    },
    {
        id: 4,
        title: 'Project Manager',
        location: 'Chennai',
        type: 'Full-Time',
        short: 'Lead interior design projects from concept to completion.',
        desc: 'Seeking an organized Project Manager to handle project planning, budgeting, and client communication. Must have 3+ years of experience.',
        skills: ['Project Management', 'Budgeting', 'Client Relations'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'project planning',
        posted: 'Aug 2025',
        responsibilities: [
            'Develop project plans, timelines, and budgets',
            'Serve as the primary point of contact for clients',
            'Ensure projects are delivered on time and within budget'
        ]
    },
     {
        id: 5,
        title: '3D Visualizer',
        location: 'Remote',
        type: 'Internship',
        short: 'Create stunning photorealistic 3D renders of interior spaces.',
        desc: 'A talented 3D Visualizer intern to create high-quality renders for client presentations and marketing materials.',
        skills: ['3ds Max', 'V-Ray', 'Photoshop'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: '3d rendering',
        posted: 'July 2025',
        responsibilities: [
            'Model and render interior scenes based on designer specifications',
            'Post-process renders to enhance realism and visual appeal',
            'Work with the design team to accurately represent concepts'
        ]
    },
    {
        id: 6,
        title: 'Marketing Coordinator',
        location: 'Hyderabad',
        type: 'Full-Time',
        short: 'Manage social media, create content, and assist with marketing campaigns.',
        desc: 'A creative Marketing Coordinator to help grow our online presence and support our marketing initiatives.',
        skills: ['Social Media', 'Content Creation', 'SEO'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'marketing strategy',
        posted: 'June 2025',
        responsibilities: [
            'Manage and grow our social media channels',
            'Write blog posts, case studies, and other marketing content',
            'Assist in the planning and execution of marketing campaigns'
        ]
    }
];
