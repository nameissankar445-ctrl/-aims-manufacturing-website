import { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Phone,
  MessageCircle,
  Info,
  Wrench,
  Settings,
  Flame,
  Box,
  Star,
  X,
} from 'lucide-react';
import { productCategories, type ProductData, type ProductDetailInfo } from '@/data/products';

const CATEGORY_ICONS = { analyzer: Settings, heattracing: Flame, shelter: Box } as const;

interface ProductDetailPanelProps {
  product: ProductData | null;
  detailInfo: ProductDetailInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
}

const SpecGrid = ({ specs }: { specs: { label: string; value: string }[] }) => (
  <div>
    <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">
      Key Specifications
    </h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {specs.map((spec, idx) => {
        const cyan = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`rounded-xl border px-4 py-3 ${cyan ? 'bg-primary/8 border-primary/15' : 'bg-accent/8 border-accent/15'}`}
          >
            <p className={`text-[11px] font-semibold uppercase tracking-wide mb-1 ${cyan ? 'text-primary/70' : 'text-accent/70'}`}>
              {spec.label}
            </p>
            <p className={`text-sm font-bold leading-snug ${cyan ? 'text-primary' : 'text-accent'}`}>{spec.value}</p>
          </div>
        );
      })}
    </div>
  </div>
);

const ProductDetailPanel = ({
  product,
  detailInfo,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: ProductDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical'>('overview');

  useEffect(() => {
    setActiveTab('overview');
  }, [product?.id]);

  if (!product) return null;

  const categoryName = productCategories.find((c) => c.id === product.category)?.name ?? '';
  const CategoryIcon = CATEGORY_ICONS[product.category];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-5xl sm:max-w-5xl max-h-[85vh] p-0 gap-0 bg-transparent ring-0 shadow-none rounded-none border-0"
      >
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="absolute top-3 right-3 sm:-top-3 sm:-right-3 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-accent text-white shadow-lg ring-4 ring-background transition-transform duration-200 hover:scale-105"
          >
            <X size={16} />
          </button>
        </DialogClose>

        <div className="relative flex flex-col max-h-[85vh] rounded-2xl bg-popover ring-1 ring-foreground/10 shadow-elevated overflow-hidden">
          <div className="h-[3px] bg-gradient-to-r from-primary to-accent flex-shrink-0" />

          <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden scrollbar-thin">
            {/* Left panel */}
            <div className="lg:w-[320px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border p-5 lg:p-6 lg:overflow-y-auto lg:scrollbar-thin">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                  <CategoryIcon size={12} /> {categoryName}
                </span>
                {totalCount > 1 && (
                  <span className="text-xs text-muted-foreground font-semibold flex-shrink-0">
                    {currentIndex + 1}/{totalCount}
                  </span>
                )}
              </div>

              <div className="aims-card aims-card-active rounded-2xl mb-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <DialogTitle className="text-xl font-extrabold text-foreground mb-1.5 leading-tight">
                {product.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {detailInfo?.tagline ?? product.shortDescription}
              </p>

              {product.badge && (
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-accent to-accent/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-card">
                  <Star size={12} fill="currentColor" /> {product.badge}
                </span>
              )}
            </div>

            {/* Right panel */}
            <div className="flex-1 min-w-0 flex flex-col lg:overflow-hidden">
              {detailInfo ? (
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'overview' | 'technical')} className="flex-1 min-h-0 flex flex-col gap-0">
                  <div className="px-5 lg:px-6 pt-5 flex-shrink-0">
                    <TabsList className="h-10 bg-muted/70 border border-border p-1 w-full sm:w-fit">
                      <TabsTrigger value="overview" className="gap-1.5 text-xs font-semibold data-active:text-primary">
                        <Info size={14} /> Overview
                      </TabsTrigger>
                      <TabsTrigger value="technical" className="gap-1.5 text-xs font-semibold data-active:text-primary">
                        <Wrench size={14} /> Technical Details
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="flex-1 min-h-0 lg:overflow-y-auto lg:scrollbar-thin px-5 lg:px-6 py-5">
                    <TabsContent value="overview" className="space-y-6 mt-0">
                      <p className="text-sm text-foreground/80 leading-relaxed">{detailInfo.technology}</p>

                      <SpecGrid specs={product.specs} />

                      <div>
                        <h4 className="font-semibold text-sm mb-3">Applications</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {detailInfo.applications.map((app, idx) => (
                            <div key={idx} className="flex gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{app.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{app.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-3">Key Advantages</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {detailInfo.advantages.map((adv, idx) => (
                            <div key={idx} className="flex gap-2.5 p-3 rounded-lg border border-border">
                              <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold">{adv.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{adv.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab('technical')}
                        className="group w-full flex items-center justify-between gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors duration-200 text-left cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <Wrench size={16} />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-foreground">View Technical Details</span>
                            <span className="block text-xs text-muted-foreground">Operating principle, specifications & more</span>
                          </span>
                        </span>
                        <ArrowRight size={16} className="text-primary flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </TabsContent>

                    <TabsContent value="technical" className="space-y-6 mt-0">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">{detailInfo.labels?.principle ?? 'Operating Principle'}</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">{detailInfo.principle}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">{detailInfo.labels?.gases ?? 'Measurable Parameters'}</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {detailInfo.measurableGases.map((gas, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                            >
                              {gas}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-muted/60 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">Why AIMS Manufacturing</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">{detailInfo.whyAIMS}</p>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              ) : (
                <div className="flex-1 min-h-0 lg:overflow-y-auto lg:scrollbar-thin px-5 lg:px-6 py-5 space-y-6">
                  <p className="text-sm text-foreground/80 leading-relaxed">{product.shortDescription}</p>
                  <SpecGrid specs={product.specs} />
                </div>
              )}

              {/* Bottom action bar */}
              <div
                className={`flex-shrink-0 border-t border-border bg-muted/40 px-5 lg:px-6 py-3.5 flex items-center gap-3 ${
                  totalCount > 1 ? 'justify-between' : 'justify-center'
                }`}
              >
                {totalCount > 1 && (
                  <button
                    type="button"
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="flex items-center gap-1 text-xs font-semibold text-muted-foreground disabled:opacity-30 hover:text-primary transition-colors flex-shrink-0"
                  >
                    <ChevronLeft size={14} /> <span className="hidden sm:inline">Prev</span>
                  </button>
                )}

                <div className="flex items-center gap-2.5">
                  <Link to="/contact">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-accent border-0 text-white rounded-full shadow-glow hover:shadow-hero transition-all duration-300"
                    >
                      <MessageCircle size={14} className="mr-1.5" /> Get Quote
                    </Button>
                  </Link>
                  <a href="tel:+97126436114">
                    <Button size="sm" variant="outline" className="rounded-full">
                      <Phone size={14} className="mr-1.5" /> Contact Us
                    </Button>
                  </a>
                </div>

                {totalCount > 1 && (
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={!hasNext}
                    className="flex items-center gap-1 text-xs font-semibold text-muted-foreground disabled:opacity-30 hover:text-primary transition-colors flex-shrink-0"
                  >
                    <span className="hidden sm:inline">Next</span> <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailPanel;
