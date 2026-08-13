/**
 * Soft ambient gradient blobs for hero sections. Render inside a `relative
 * overflow-hidden` section, before the section's (also `relative`) content,
 * to give otherwise-flat hero backgrounds a little depth.
 */
export function HeroGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -top-24 -left-20 size-72 rounded-full bg-gold-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-24 size-96 rounded-full bg-navy-100/50 blur-3xl" />
    </div>
  )
}
