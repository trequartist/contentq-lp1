import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CTAProps {
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

function CTA({
  badge = "Get started",
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
          <div>
            <Badge className="bg-accent-kiwi/10 text-accent-kiwi border-accent-kiwi/20 hover:bg-accent-kiwi/20 text-white bg-white/10 border-white/20">
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-4xl font-regular text-white">
              {title}
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-white/70 max-w-2xl">
              <h4 className="text-xl md:text-2xl tracking-tight max-w-3xl text-white/80 font-medium">
            </p>
            <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-md p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] mt-4">
              <p className="text-2xl md:text-3xl font-semibold text-slate-900">
                {description}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="gap-4 bg-gradient-to-b from-[#A7E84F] to-[#94D82D] text-slate-900 hover:from-[#B8F260] hover:to-[#A5E93E] shadow-[0_8px_24px_rgba(148,216,45,0.25)] hover:shadow-[0_12px_32px_rgba(148,216,45,0.35)]" 
              size="lg"
              onClick={onPrimaryClick}
            >
              {primaryButtonText} <MoveRight className="w-4 h-4" />
            </Button>
            <Button 
              className="gap-4 border-slate-300 text-slate-700 hover:bg-slate-50" 
              variant="outline" 
              size="lg"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText} <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
  )
}