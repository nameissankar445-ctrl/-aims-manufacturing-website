import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package } from 'lucide-react';
import { spareParts, sparePartCategories, getSparePartImage, getSparePartByPn, type SparePart } from '@/data/spareParts';
import SparePartDetailPanel from '@/components/SparePartDetailPanel';

const PartCard = ({ part, onSelect }: { part: SparePart; onSelect: () => void }) => {
  const image = getSparePartImage(part.image);
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      type="button"
      onClick={onSelect}
      className="aims-card text-left group bg-white rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-shadow duration-300"
    >
      <div className="relative h-32 overflow-hidden bg-muted flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={part.description}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Package size={28} className="text-muted-foreground/40" />
        )}
      </div>
      <div className="p-3.5">
        <span className="text-[10px] font-semibold text-primary/70 tracking-wide">{part.local_pn}</span>
        <h3 className="font-bold text-sm mt-0.5 mb-1 line-clamp-2">{part.description}</h3>
        <p className="text-xs text-muted-foreground">{part.category}</p>
      </div>
    </motion.button>
  );
};

const SparePartsCatalog = () => {
  const [search, setSearch] = useState('');
  const [subCategory, setSubCategory] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPn = searchParams.get('part');

  const setSelectedPn = useCallback(
    (pn: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (pn) {
            next.set('part', pn);
          } else {
            next.delete('part');
          }
          return next;
        },
        { replace: !pn },
      );
    },
    [setSearchParams],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return spareParts.filter((p) => {
      const matchesCategory = subCategory === 'all' || p.category === subCategory;
      const matchesSearch =
        !q ||
        p.description.toLowerCase().includes(q) ||
        p.local_pn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, subCategory]);

  const selectedPart = selectedPn ? getSparePartByPn(selectedPn) ?? null : null;
  const currentIndex = selectedPn ? filtered.findIndex((p) => p.local_pn === selectedPart?.local_pn) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filtered.length - 1;

  return (
    <div>
      <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-6 text-sm text-foreground/80">
        Locally manufactured and sourced spare parts, produced under the{' '}
        <span className="font-semibold text-primary">Make it in the Emirates</span> initiative. Listings are
        de-identified for confidentiality — no original-equipment brand or part numbers are referenced.
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by description or part number..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 sm:w-64"
        >
          <option value="all">All Categories ({spareParts.length})</option>
          {sparePartCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat} ({spareParts.filter((p) => p.category === cat).length})
            </option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence>
            {filtered.map((part) => (
              <PartCard key={part.local_pn} part={part} onSelect={() => setSelectedPn(part.local_pn)} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-16">No parts match your search.</p>
      )}

      <SparePartDetailPanel
        part={selectedPart}
        isOpen={!!selectedPn}
        onClose={() => setSelectedPn(null)}
        onPrev={() => hasPrev && setSelectedPn(filtered[currentIndex - 1].local_pn)}
        onNext={() => hasNext && setSelectedPn(filtered[currentIndex + 1].local_pn)}
        hasPrev={hasPrev}
        hasNext={hasNext}
        totalCount={filtered.length}
      />
    </div>
  );
};

export default SparePartsCatalog;
