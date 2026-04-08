/**
 * ReviewsSection — displays written patient reviews for a doctor profile.
 * Shows: star breakdown bar chart, review cards with verified badge,
 * and a "helpful" count. Expandable — shows 3 by default, "Show all" reveals the rest.
 */

import { useState } from 'react';
import { Star, ThumbsUp, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Review } from '@/data/doctors';

// ─── Star breakdown bar ───────────────────────────────────────────────────────

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-500 w-4 text-right flex-shrink-0">{star}</span>
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-slate-400 w-6 text-right flex-shrink-0 text-xs">{count}</span>
    </div>
  );
}

// ─── Single review card ───────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border border-slate-100 rounded-2xl p-5 hover:border-teal-100 hover:bg-slate-50/50 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
            {review.authorInitials}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-semibold text-slate-900 text-sm">{review.authorName}</p>
              {review.verified && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-100">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Verified Patient
                </span>
              )}
            </div>
            <p className="text-slate-400 text-xs mt-0.5">{review.date}</p>
          </div>
        </div>
        {/* Star row */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>

      {review.helpful > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
          <ThumbsUp className="h-3 w-3" />
          <span>{review.helpful} found this helpful</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_SHOW = 3;

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
}

export default function ReviewsSection({ reviews, averageRating, totalCount }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? reviews : reviews.slice(0, INITIAL_SHOW);

  // Build star breakdown
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          Patient Reviews
        </h2>
        <span className="text-sm text-slate-400">{totalCount} reviews</span>
      </div>

      {/* Summary: big number + breakdown bars */}
      <div className="flex gap-8 mb-8 flex-wrap">
        {/* Big rating */}
        <div className="flex flex-col items-center justify-center min-w-[80px]">
          <span className="text-5xl font-bold text-slate-900 leading-none">{averageRating.toFixed(1)}</span>
          <div className="flex items-center gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i <= Math.round(averageRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-200 text-slate-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">out of 5</p>
        </div>

        {/* Bars */}
        <div className="flex-1 space-y-1.5 min-w-[160px]">
          {breakdown.map(({ star, count }) => (
            <RatingBar key={star} star={star} count={count} total={reviews.length} />
          ))}
        </div>
      </div>

      {/* Review cards */}
      {reviews.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-6">No written reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {displayed.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      {/* Show more / less toggle */}
      {reviews.length > INITIAL_SHOW && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-colors"
        >
          {showAll ? (
            <><ChevronUp className="h-4 w-4" /> Show fewer reviews</>
          ) : (
            <><ChevronDown className="h-4 w-4" /> Show all {reviews.length} reviews</>
          )}
        </button>
      )}
    </div>
  );
}
