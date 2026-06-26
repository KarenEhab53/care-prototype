import "./ui.css";

export function Card({ children, className = "", ...rest }) {
  return (
    <div className={`ui-card ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function Button({ children, variant = "primary", size = "md", className = "", ...rest }) {
  return (
    <button className={`ui-btn ui-btn--${variant} ui-btn--${size} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral" }) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}

export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="ui-empty">
      {Icon && (
        <div className="ui-empty__icon">
          <Icon width={26} height={26} />
        </div>
      )}
      <h3 className="ui-empty__title">{title}</h3>
      <p className="ui-empty__message">{message}</p>
      {action}
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="ui-modal-overlay" onClick={onClose}>
      <div className="ui-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="ui-modal__header">
          <h3>{title}</h3>
          <button className="ui-modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="ui-modal__body">{children}</div>
        {footer && <div className="ui-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`ui-toast ui-toast--${toast.tone}`} key={toast.key}>
      {toast.message}
    </div>
  );
}
