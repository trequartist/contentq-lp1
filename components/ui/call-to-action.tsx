import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/Button";

interface CTAProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

function CTA({
  badge,
  title,
  subtitle,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick
}: CTAProps) {
  return (
    <div className="w-full py-8 lg:py-12">
      <div className="container mx-auto">
        <div className="flex flex-col text-center bg-[#001233] rounded-md p-4 lg:p-8 gap-6 items-center">
          {badge && (
            <div>
              <Badge className="bg-[#94D82D] text-black hover:bg-[#94D82D]/90">
                {badge}
              </Badge>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-4xl font-regular text-white">
              {title}
            </h3>
            {subtitle && (
              <h4 className="text-xl md:text-2xl tracking-tight max-w-3xl text-white/80 font-medium">
                {subtitle}
              </h4>
            )}
            <p className="text-lg leading-relaxed tracking-tight text-white/70 max-w-3xl">
              {description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={onPrimaryClick}
              className="gap-2"
            >
              {primaryButtonText} <MoveRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={onSecondaryClick}
              className="gap-2 border-white/20 text-white hover:bg-white/10"
              onClick={() => window.open('https://cal.com/banish/contentq-exploratory-call-with-anish', '_blank')}
            >
              {secondaryButtonText} <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>
              onClick={() => window.open('https://cal.com/banish/contentq-exploratory-call-with-anish', '_blank')}
    </div>
  );
}

export { CTA };