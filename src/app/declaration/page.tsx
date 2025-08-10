export default function DeclarationPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl mb-8">Declaration</h1>
        
        <p>We, Naims Interior, hereby declare that all information provided on this website is accurate to the best of our knowledge and belief. The content, including project details, service descriptions, and testimonials, is a true representation of our work and capabilities.</p>

        <h2 className="font-headline text-2xl mt-8">Commitment to Quality</h2>
        <p>We are committed to upholding the highest standards of quality and professionalism in all our projects. We use high-quality materials and work with experienced designers and craftsmen to deliver exceptional results.</p>

        <h2 className="font-headline text-2xl mt-8">Transparency</h2>
        <p>We believe in transparent business practices. All our pricing, processes, and policies are clearly communicated to our clients. There are no hidden charges, and we strive to maintain open and honest communication throughout the project lifecycle.</p>

        <h2 className="font-headline text-2xl mt-8">Customer Satisfaction</h2>
        <p>Our primary goal is customer satisfaction. We work closely with our clients to understand their vision and requirements, and we are dedicated to creating spaces that they love.</p>
        
        <p className="mt-8">This declaration is made to assure our clients, partners, and visitors of our commitment to integrity and excellence in the field of interior design.</p>
        
        <div className="mt-12 text-right">
            <p className="font-semibold">The Team at Naims Interior</p>
            <p>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
}
