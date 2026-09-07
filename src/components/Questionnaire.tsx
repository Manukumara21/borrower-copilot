import React from 'react';
import { BorrowerInput } from '../types/borrower';
import { QUESTION_FLOW, QuestionDefinition } from '../questions/questionTree';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle, Info } from 'lucide-react';

interface QuestionnaireProps {
  answers: BorrowerInput;
  onChangeAnswer: (field: keyof BorrowerInput, value: any) => void;
  currentStepIndex: number;
  setCurrentStepIndex: (idx: number) => void;
  onFinish: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  answers,
  onChangeAnswer,
  currentStepIndex,
  setCurrentStepIndex,
  onFinish,
}) => {
  // Filter active questions according to adaptive condition
  const activeQuestions: QuestionDefinition[] = QUESTION_FLOW.filter((q) => {
    if (!q.shouldShow) return true;
    return q.shouldShow(answers);
  });

  const currentQuestion = activeQuestions[currentStepIndex] || activeQuestions[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === activeQuestions.length - 1;
  const progressPercent = ((currentStepIndex + 1) / activeQuestions.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      onFinish();
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', maxWidth: '680px', margin: '0 auto' }}>
      
      {/* Progress Bar & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
              Question {currentStepIndex + 1} of {activeQuestions.length}
            </span>
            <span className={`badge ${currentQuestion.isMust ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
              {currentQuestion.isMust ? 'Must Question' : 'Adaptive Follow-Up'}
            </span>
          </div>

          <button
            onClick={onFinish}
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            <span>Skip to Results</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #6366f1, #10b981)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Question Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          {currentQuestion.title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {currentQuestion.subtitle}
        </p>
      </div>

      {/* Question Input Controls */}
      <div style={{ marginBottom: '24px' }}>
        {/* Select / Radio Options */}
        {currentQuestion.type === 'select' && currentQuestion.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id as keyof BorrowerInput] === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => onChangeAnswer(currentQuestion.id as keyof BorrowerInput, opt.value)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {opt.icon && <span style={{ fontSize: '1.3rem' }}>{opt.icon}</span>}
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? '#fff' : '#e2e8f0' }}>
                        {opt.label}
                      </div>
                      {opt.description && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {opt.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {isSelected && <CheckCircle size={18} color="#6366f1" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Currency Input */}
        {currentQuestion.type === 'currency' && (
          <div>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-focus)',
                padding: '0 16px',
              }}
            >
              <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '8px' }}>
                ₹
              </span>
              <input
                type="number"
                min={currentQuestion.min || 0}
                max={currentQuestion.max}
                step={currentQuestion.step || 1000}
                value={answers[currentQuestion.id as keyof BorrowerInput] as number || ''}
                onChange={(e) =>
                  onChangeAnswer(
                    currentQuestion.id as keyof BorrowerInput,
                    e.target.value === '' ? 0 : Number(e.target.value)
                  )
                }
                placeholder={currentQuestion.placeholder}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#fff',
                  padding: '16px 0',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              />
            </div>

            {/* Quick Lakhs Helper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Amount in Words:{' '}
                <strong style={{ color: '#10b981' }}>
                  {((Number(answers[currentQuestion.id as keyof BorrowerInput]) || 0) / 100000).toFixed(2)} Lakhs
                </strong>
              </span>

              {/* Quick adjustment buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {[100000, 500000, 1000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => onChangeAnswer(currentQuestion.id as keyof BorrowerInput, amt)}
                    className="btn-secondary"
                    style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  >
                    +₹{amt / 100000}L
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Number Input */}
        {currentQuestion.type === 'number' && (
          <div>
            <input
              type="number"
              min={currentQuestion.min || 0}
              max={currentQuestion.max}
              step={currentQuestion.step || 1}
              value={answers[currentQuestion.id as keyof BorrowerInput] as number ?? ''}
              onChange={(e) =>
                onChangeAnswer(
                  currentQuestion.id as keyof BorrowerInput,
                  e.target.value === '' ? 0 : Number(e.target.value)
                )
              }
              placeholder={currentQuestion.placeholder}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1.5px solid var(--border-focus)',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#fff',
                padding: '14px 16px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            />
          </div>
        )}
      </div>

      {/* Impact Note ("Every additional question must change an output") */}
      <div
        style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        <Info size={16} color="#818cf8" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.78rem', color: '#c7d2fe' }}>
          <strong>How this affects your output:</strong> {currentQuestion.impactNote}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrev}
          disabled={isFirstStep}
          className="btn-secondary"
          style={{ opacity: isFirstStep ? 0.4 : 1, cursor: isFirstStep ? 'not-allowed' : 'pointer' }}
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>

        <button onClick={handleNext} className="btn-primary">
          <span>{isLastStep ? 'View Copilot Evaluation' : 'Next Question'}</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};
