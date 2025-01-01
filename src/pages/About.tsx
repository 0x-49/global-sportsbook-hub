import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">About Global Sportsbook Hub</h1>
          <p className="text-xl text-muted-foreground">
            Your trusted companion in navigating the world of online sports betting
          </p>
        </section>

        {/* Mission Statement */}
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At Global Sportsbook Hub, we're dedicated to providing comprehensive, accurate, 
            and up-to-date information about sportsbooks worldwide. Our mission is to empower 
            users with the knowledge they need to make informed decisions about their online 
            sports betting journey.
          </p>
        </Card>

        {/* Values */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">Transparency</h3>
            <p>
              We believe in complete transparency in our reviews and data. Every metric, 
              rating, and piece of information is sourced directly and verified thoroughly.
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">Accuracy</h3>
            <p>
              Our team works tirelessly to ensure that all information is accurate and 
              updated regularly, providing you with reliable data you can trust.
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">User-First</h3>
            <p>
              Every feature and piece of content is designed with our users in mind, 
              making it easy to find and compare sportsbooks that match your needs.
            </p>
          </Card>
        </section>

        {/* What We Offer */}
        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Comprehensive Database</h3>
              <p>
                Access detailed information about hundreds of sportsbooks worldwide, 
                including traffic data, rankings, and user engagement metrics.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">In-Depth Analysis</h3>
              <p>
                Each sportsbook is thoroughly analyzed with detailed descriptions, 
                helping you understand their unique features and offerings.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Real-Time Updates</h3>
              <p>
                Our platform is continuously updated with the latest information, 
                ensuring you always have access to current and relevant data.
              </p>
            </div>
          </div>
        </Card>

        {/* Business Model */}
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Our Approach</h2>
          <p className="text-lg leading-relaxed">
            We maintain our independence by focusing solely on providing accurate data 
            and insights. Our platform aggregates information from multiple reliable 
            sources, employing advanced analytics to deliver precise traffic estimates 
            and rankings. This data-driven approach ensures that our users receive 
            unbiased, comprehensive information about each sportsbook.
          </p>
        </Card>

        {/* Commitment */}
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Our Commitment</h2>
          <p className="text-lg leading-relaxed">
            We are committed to maintaining the highest standards of data integrity 
            and user experience. Our team continuously works to improve our platform, 
            add new features, and ensure that our information remains current and 
            reliable. We believe in fostering a transparent and informed sports 
            betting community.
          </p>
        </Card>

        {/* Call to Action */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">Start Exploring</h2>
          <p className="text-lg">
            Ready to discover more about your favorite sportsbooks?
          </p>
          <Button asChild size="lg">
            <Link to="/">Explore Sportsbooks</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
