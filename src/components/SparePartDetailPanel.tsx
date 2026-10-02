import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Phone, Package } from 'lucide-react';
import { getSparePartImage, type SparePart } from '@/data/spareParts';

interface SparePartDetailPanelProps {
  part: SparePart | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  totalCount: number;
}

const SpecTable = ({ title, rows }: { title: string; rows: [string, string][] }) => (
  <div>
    <h4 className="font-semibold text-sm mb-2">{title}</h4>
    <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
      {rows.map(([label, value], idx) => (
        <div key={idx} className="grid grid-cols-3 gap-2 px-3 py-2 text-sm bg-white even:bg-muted/30">
          <span className="text-muted-foreground font-medium">{label}</span>
          <span className="col-span-2 text-foreground/85">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const SparePartDetailPanel = ({
  part,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  totalCount,
}: SparePartDetailPanelProps) => {
  if (!part) return null;
  const image = getSparePartImage(part.image);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto p-0 gap-0">
        <div className="aims-card aims-card-active rounded-xl overflow-hidden">
          <div className="relative h-48 sm:h-56 overflow-hidden bg-muted flex items-center justify-center">
            {image ? (
              <img src={image} alt={part.description} className="w-full h-full object-cover" />
            ) : (
              <Package size={48} className="text-muted-foreground/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <DialogTitle className="text-xl font-bold text-white">{part.description}</DialogTitle>
              <p className="text-white/85 text-sm mt-1">
                {part.category} &middot; P/N {part.local_pn}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {totalCount > 1 && (
              <div className="flex items-center justify-between text-xs text-muted-foreground -mt-2">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="flex items-center gap-1 disabled:opacity-30 hover:text-primary"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!hasNext}
                  className="flex items-center gap-1 disabled:opacity-30 hover:text-primary"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}

            {part.material.length > 0 && <SpecTable title="Material of Construction" rows={part.material} />}
            {part.dimensions.length > 0 && <SpecTable title="Dimensions & Ratings" rows={part.dimensions} />}

            <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-primary to-accent border-0 text-white rounded-full shadow-glow hover:shadow-hero transition-all duration-300">
                  Request Quote <ArrowRight size={15} className="ml-1.5" />
                </Button>
              </Link>
              <a href="tel:+97126436114">
                <Button variant="outline">
                  <Phone size={15} className="mr-1.5" /> Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SparePartDetailPanel;
