import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO, { BASE_URL } from '@/components/SEO';
import ProductDetailPanel from '@/components/ProductDetailPanel';
import SparePartsCatalog from '@/components/SparePartsCatalog';
import { allProducts, detailedProductInfo, productCategories, type ProductData } from '@/data/products';
import { spareParts } from '@/data/spareParts';
import { Settings, Flame, Box, Wrench } from 'lucide-react';

const CATEGORY_ICONS = { analyzer: Settings, heattracing: Flame, shelter: Box } as const;

type CategoryFilter = 'all' | ProductData['category'] | 'spareparts';

const ProductCard = ({
  product,
  onSelect,
}: {
  product: ProductData;
  onSelect: () => void;
}) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    type="button"
    onClick={onSelect}
    className="aims-card text-left group bg-white rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-shadow duration-300"
  >
    <div className="relative h-40 overflow-hidden bg-muted">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {product.badge && (
        <span className="absolute top-2 right-2 px-2 py-0.5 bg-accent text-white text-xs font-semibold rounded-full">
          {product.badge}
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-bold text-sm mb-1">{product.name}</h3>
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.shortDescription}</p>
      {product.certifications && (
        <div className="flex flex-wrap gap-1">
          {product.certifications.map((cert, idx) => (
            <span key={idx} className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded">
              {cert}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.button>
);

const VALID_CATEGORIES: CategoryFilter[] = ['analyzer', 'heattracing', 'shelter', 'spareparts'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as CategoryFilter | null;
  const category: CategoryFilter = categoryParam && VALID_CATEGORIES.includes(categoryParam) ? categoryParam : 'all';
  const selectedId = searchParams.get('product');

  const setCategory = useCallback(
    (id: CategoryFilter) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (id === 'all') {
            next.delete('category');
          } else {
            next.set('category', id);
          }
          next.delete('product');
          next.delete('part');
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setSelectedId = useCallback(
    (id: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (id) {
            next.set('product', id);
          } else {
            next.delete('product');
          }
          return next;
        },
        { replace: !id },
      );
    },
    [setSearchParams],
  );

  const filtered = useMemo(
    () => (category === 'all' ? allProducts : allProducts.filter((p) => p.category === category)),
    [category],
  );

  const selectedProduct = allProducts.find((p) => p.id === selectedId) ?? null;
  const selectedDetail = selectedId ? detailedProductInfo[selectedId] ?? null : null;
  const currentIndex = selectedId ? filtered.findIndex((p) => p.id === selectedId) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filtered.length - 1;

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO
        title="Products"
        description="Explore AIMS Manufacturing's full product catalog: IECEx-certified analyzers, water cut meters, bolt-on heat tracing, factory-assembled tube bundles, steam traps, custom industrial enclosures, and locally manufactured spare parts under the Make it in the Emirates initiative."
        keywords="analyzer, water cut meter, heat tracing, steam trap, tube bundle, analyzer shelter, custom enclosure, spare parts, Make it in the Emirates"
        canonicalUrl={`${BASE_URL}/products`}
      />
      <Navigation />

      <section className="pt-32 pb-10 brand-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/15" />
        <div className="absolute inset-0 opacity-[0.05] texture-dots" aria-hidden="true" />
        <div className="absolute -top-24 -right-16 w-80 h-80 bg-accent/15 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Products</h1>
          <p className="text-white/70 max-w-2xl">
            {allProducts.length} precision-engineered products across analyzers, heat tracing, and
            enclosures, plus {spareParts.length} locally manufactured spare parts — all designed and
            manufactured within the GCC.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'all' ? 'bg-primary text-white' : 'bg-white border border-border text-foreground/70 hover:border-primary/40'
            }`}
          >
            All Products
          </button>
          {productCategories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat.id ? 'bg-primary text-white' : 'bg-white border border-border text-foreground/70 hover:border-primary/40'
                }`}
              >
                <Icon size={14} /> {cat.name}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setCategory('spareparts')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'spareparts' ? 'bg-primary text-white' : 'bg-white border border-border text-foreground/70 hover:border-primary/40'
            }`}
          >
            <Wrench size={14} /> Spare Parts
          </button>
        </div>

        {category === 'spareparts' ? (
          <SparePartsCatalog />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={() => setSelectedId(product.id)} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {category !== 'spareparts' && (
        <ProductDetailPanel
          product={selectedProduct}
          detailInfo={selectedDetail}
          isOpen={!!selectedId}
          onClose={() => setSelectedId(null)}
          onPrev={() => hasPrev && setSelectedId(filtered[currentIndex - 1].id)}
          onNext={() => hasNext && setSelectedId(filtered[currentIndex + 1].id)}
          hasPrev={hasPrev}
          hasNext={hasNext}
          currentIndex={currentIndex}
          totalCount={filtered.length}
        />
      )}

      <Footer />
    </div>
  );
};

export default Products;
