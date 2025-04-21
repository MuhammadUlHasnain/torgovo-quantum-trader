
import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface BotFaqSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  faqs: FAQ[];
}

const BotFaqSection: React.FC<BotFaqSectionProps> = ({
  title,
  faqs,
  className,
  ...props
}) => {
  return (
    <div className={cn("", className)} {...props}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="glass-card p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default BotFaqSection;
