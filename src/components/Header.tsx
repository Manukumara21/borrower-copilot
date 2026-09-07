import React from 'react';
import { PERSONAS, PersonaPreset } from '../data/personas';
import { Shield, Sparkles, RotateCcw, FileText } from 'lucide-react';

interface HeaderProps {
  activePersonaId: string | null;
  onSelectPersona: (persona: PersonaPreset) => void;
  onReset: () => void;
  onOpenNegotiationCard: () => void;
  activeTab: 'app' | 'rules';
  setActiveTab: (tab: 'app' | 'rules') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePersonaId,
  onSelectPersona,
  onReset,
  onOpenNegotiationCard,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(11, 15, 25, 0.85)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #4f46e5, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>
              <Shield size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                  Borrower Copilot
                </h1>
                <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                  Lokta Build Challenge
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Leveling the playing field between borrower & lender
              </p>
            </div>
          </div>

          {/* Persona Quick Loaders */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
              Load Persona:
            </span>
            {PERSONAS.map((p) => {
              const isSelected = activePersonaId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(p)}
                  className={`btn-secondary ${isSelected ? 'active' : ''}`}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    borderColor: isSelected ? 'var(--accent-indigo)' : 'var(--border-subtle)',
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                  }}
                  title={p.description}
                >
                  <span style={{ fontSize: '1rem' }}>{p.avatar}</span>
                  <span>{p.name}</span>
                </button>
              );
            })}

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}
              title="Reset to blank questionnaire"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>

          {/* Navigation links & Action button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setActiveTab(activeTab === 'app' ? 'rules' : 'app')}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '7px 14px' }}
            >
              <FileText size={15} />
              <span>{activeTab === 'app' ? 'View RULES.md' : 'Back to Copilot'}</span>
            </button>

            <button
              onClick={onOpenNegotiationCard}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
            >
              <Sparkles size={15} />
              <span>Negotiation Card</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
