import { ReactNode } from "react";

type ResourceIcon = "article" | "stats" | "bank" | "calc";

interface ResourceItem {
  icon: ResourceIcon;
  title: string;
  desc: string;
  href: string;
}

interface PromoProps {
  image: string;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
  href: string;
}

interface CalculadoraSidebarProps {
  promo: PromoProps;
  resources: ResourceItem[];
}

function ResourceIcon({ type }: { type: ResourceIcon }) {
  return (
    <svg className="vt-resource-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {type === "article" && (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>)}
      {type === "stats" && (<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>)}
      {type === "bank" && (<><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></>)}
      {type === "calc" && (<><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></>)}
    </svg>
  );
}

export function CalculadoraSidebar({ promo, resources }: CalculadoraSidebarProps) {
  return (
    <>
      <style>{`
        .vt-aside { display: flex; flex-direction: column; gap: 1.5rem; }

        .vt-promo { border-radius: 1rem; overflow: hidden; position: relative; }
        .vt-promo img { width: 100%; height: 16rem; object-fit: cover; display: block; transition: transform 0.5s; }
        .vt-promo:hover img { transform: scale(1.04); }
        .vt-promo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, var(--vt-darker) 40%, transparent);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem;
        }
        .vt-badge {
          display: inline-block; margin-bottom: 0.5rem;
          background: var(--vt-mid); color: #fff;
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
          padding: 0.25rem 0.6rem; border-radius: 0.25rem;
        }
        .vt-promo h3 { color: #fff; font-size: 1.1rem; font-weight: 800; margin-bottom: 0.4rem; }
        .vt-promo p { color: #a3b8ac; font-size: 0.85rem; margin-bottom: 0.75rem; }
        .vt-promo-link { color: var(--vt-light); font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 0.3rem; text-decoration: none; }
        .vt-promo-link:hover { text-decoration: underline; }

        .vt-resources h3 { font-size: 1.05rem; font-weight: 800; color: var(--vt-darker); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .vt-resources h3 svg { color: var(--vt-dark); }
        .vt-resources ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }
        .vt-resource-link { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.85rem 0; text-decoration: none; color: #4a6450; transition: color 0.2s; }
        .vt-resource-link:hover { color: var(--vt-dark); }
        .vt-resource-link:hover .vt-resource-icon { color: var(--vt-dark); }
        .vt-resource-icon { color: #9ab8a0; flex-shrink: 0; margin-top: 1px; transition: color 0.2s; }
        .vt-resource-title { font-size: 0.875rem; font-weight: 600; margin-bottom: 0.15rem; }
        .vt-resource-desc { font-size: 0.75rem; color: #8aab96; }
        .vt-divider { border: none; border-top: 1px solid #e8ede9; margin: 0; }
      `}</style>

      <aside className="vt-aside">
        {/* Promo card */}
        <div className="vt-promo">
          <img src={promo.image} alt={promo.imageAlt} />
          <div className="vt-promo-overlay">
            <span className="vt-badge">{promo.badge}</span>
            <h3>{promo.title}</h3>
            <p>{promo.description}</p>
            <a href={promo.href} className="vt-promo-link">
              Saiba mais
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Resources */}
        <div className="vt-card vt-resources">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Recursos Úteis
          </h3>
          <ul>
            {resources.map((item, i) => (
              <li key={i}>
                <a href={item.href} className="vt-resource-link">
                  <ResourceIcon type={item.icon} />
                  <div>
                    <p className="vt-resource-title">{item.title}</p>
                    <p className="vt-resource-desc">{item.desc}</p>
                  </div>
                </a>
                {i < resources.length - 1 && <hr className="vt-divider" />}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
