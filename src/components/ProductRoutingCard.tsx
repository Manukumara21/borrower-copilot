import React from 'react';
import { ProductRecommendation } from '../types/borrower';
import { Layers, ShieldAlert, Sparkles, Building2 } from 'lucide-react';

interface ProductRoutingCardProps {
  product: ProductRecommendation;
}

export const ProductRoutingCard: React.FC<ProductRoutingCardProps> = ({ product }) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '20px 24px',
        border: product.isRoutedToSecured
          ? '1.5px solid rgba(16, 185, 129, 0.4)'
          : '1px solid var(--border-subtle)',
        background: product.isRoutedToSecured
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(15, 23, 42, 0.6))'
          : 'var(--bg-card)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: product.isRoutedToSecured ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {product.isRoutedToSecured ? <Building2 size={20} color="#10b981" /> : <Layers size={20} color="#6366f1" />}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: product.isRoutedToSecured ? '#10b981' : '#818cf8', textTransform: 'uppercase' }}>
                {product.isRoutedToSecured ? 'Product Recommendation · Routed to Secured Lending' : 'Recommended Loan Structure'}
              </span>
              {product.ltvPercent && (
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  Safe LTV: {product.ltvPercent}%
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
              {product.productTitle}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, maxWidth: '800px' }}>
              {product.routingReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
