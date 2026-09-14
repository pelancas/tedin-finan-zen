import type { CSSProperties } from "react";
import { toast } from "sonner";
import { MessageCircle, Facebook, Twitter, Instagram, Mail, Link2 } from "lucide-react";

function openShareWindow(url: string) {
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=520");
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

interface ShareRowProps {
  title: string;
  label?: string;
  style?: CSSProperties;
}

export function ShareRow({ title, label = "Compartilhar", style }: ShareRowProps) {
  const shareUrl = () => window.location.href;

  const handleWhatsApp = () => {
    openShareWindow(`https://wa.me/?text=${encodeURIComponent(`${title} — ${shareUrl()}`)}`);
  };
  const handleFacebook = () => {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`);
  };
  const handleTwitter = () => {
    openShareWindow(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl())}`,
    );
  };
  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl())}`;
  };
  const handleCopyLink = async () => {
    const ok = await copyToClipboard(shareUrl());
    toast(ok ? "Link copiado!" : "Não foi possível copiar o link.");
  };
  const handleInstagram = async () => {
    // O Instagram não tem um link de compartilhamento direto pra web —
    // copiamos o link pro usuário colar manualmente (story, bio ou DM).
    const ok = await copyToClipboard(shareUrl());
    toast(
      ok
        ? "Link copiado! O Instagram não permite compartilhar links direto — cole no seu story, bio ou mensagem."
        : "Não foi possível copiar o link.",
    );
  };

  return (
    <div className="share-row" style={style}>
      <style>{`
        .share-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-family: 'Work Sans', sans-serif; }
        .share-row-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #8aab96; margin-right: 0.25rem; }
        .share-row-btn {
          display: flex; align-items: center; justify-content: center;
          width: 2.1rem; height: 2.1rem; border-radius: 9999px;
          border: 1px solid #e2e8e2; background: #fff; color: #607060;
          cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .share-row-btn:hover { background: #edfaf2; color: #178a50; border-color: #1daf66; }
      `}</style>
      {label && <span className="share-row-label">{label}</span>}
      <button type="button" className="share-row-btn" onClick={handleWhatsApp} aria-label="Compartilhar no WhatsApp" title="WhatsApp">
        <MessageCircle size={16} />
      </button>
      <button type="button" className="share-row-btn" onClick={handleFacebook} aria-label="Compartilhar no Facebook" title="Facebook">
        <Facebook size={16} />
      </button>
      <button type="button" className="share-row-btn" onClick={handleTwitter} aria-label="Compartilhar no X (Twitter)" title="X (Twitter)">
        <Twitter size={16} />
      </button>
      <button type="button" className="share-row-btn" onClick={handleInstagram} aria-label="Compartilhar no Instagram" title="Instagram">
        <Instagram size={16} />
      </button>
      <button type="button" className="share-row-btn" onClick={handleEmail} aria-label="Compartilhar por email" title="Email">
        <Mail size={16} />
      </button>
      <button type="button" className="share-row-btn" onClick={handleCopyLink} aria-label="Copiar link" title="Copiar link">
        <Link2 size={16} />
      </button>
    </div>
  );
}
