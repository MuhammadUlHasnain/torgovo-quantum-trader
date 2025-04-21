
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name?: string;
  author?: string;
  position?: string;
  company?: string;
  content?: string;
  quote?: string;
  rating?: number;
  role?: string;
}

interface TestimonialSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  variant?: "grid" | "carousel";
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  subtitle,
  testimonials,
  variant = "grid",
  className,
  ...props
}) => {
  return (
    <section className={cn("py-12 md:py-16", className)} {...props}>
      <div className="container">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-torgovo-purple glow-text">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn(
          "grid gap-6",
          variant === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""
        )}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card overflow-hidden">
              <CardContent className="p-6">
                {testimonial.rating && (
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < testimonial.rating! 
                            ? "text-torgovo-purple fill-torgovo-purple" 
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                )}
                
                <blockquote className="mb-4">
                  <p className="text-muted-foreground italic">{testimonial.content || testimonial.quote ? `"${testimonial.content || testimonial.quote}"` : ""}</p>
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {testimonial.name ? testimonial.name.charAt(0) : testimonial.author ? testimonial.author.charAt(0) : ""}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name || testimonial.author}</p>
                    {((testimonial.position || testimonial.role) || testimonial.company) && (
                      <p className="text-xs text-muted-foreground">
                        {testimonial.position || testimonial.role}
                        {(testimonial.position || testimonial.role) && testimonial.company && ", "}
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
