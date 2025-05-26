
import React from "react";
import HeroSection from "@/components/ui/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="container py-12">
      <HeroSection
        heroTitle="Contact Us"
        subtitle="Get in touch with our team for support and inquiries"
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">support@torgovo.com</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-muted-foreground">123 Trading St, Finance City</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
