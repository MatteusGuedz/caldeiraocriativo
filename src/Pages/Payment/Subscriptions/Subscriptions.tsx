import React, { useState } from 'react';
import './Subscriptions.scss';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Plano Básico',
    price: 29.90,
    features: [
      'Acesso a cursos básicos',
      'Certificado de conclusão',
      'Suporte por e-mail'
    ]
  },
  {
    id: 2,
    name: 'Plano Criativo',
    price: 49.90,
    features: [
      'Todos os cursos básicos',
      'Cursos avançados',
      'Mentoria mensal',
      'Certificados personalizados',
      'Suporte prioritário'
    ],
    recommended: true
  },
  {
    id: 3,
    name: 'Plano Master',
    price: 99.90,
    features: [
      'Acesso a todos os cursos',
      'Cursos exclusivos',
      'Mentoria individual',
      'Certificados de especialização',
      'Suporte VIP 24h',
      'Comunidade exclusiva'
    ]
  }
];

const Subscriptions: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      const plan = subscriptionPlans.find(p => p.id === selectedPlan);
      alert(`Você selecionou o ${plan?.name}. Redirecionando para pagamento...`);
      // Em um cenário real, isso iniciaria um fluxo de pagamento
    }
  };

  return (
    <div className="subscriptions-page">
      <header className="subscriptions-header">
        <h1>Escolha seu Plano</h1>
        <p>Desbloqueie todo o potencial do Caldeirão Criativo</p>
      </header>

      <div className="subscription-plans">
        {subscriptionPlans.map(plan => (
          <div 
            key={plan.id} 
            className={`subscription-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.recommended && <div className="recommended-badge">Mais Popular</div>}
            <h2>{plan.name}</h2>
            <div className="plan-price">
              R$ {plan.price.toFixed(2)}/mês
            </div>
            <ul className="plan-features">
              {plan.features.map(feature => (
                <li key={feature}>
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={`select-plan-btn ${selectedPlan === plan.id ? 'active' : ''}`}
            >
              {selectedPlan === plan.id ? 'Plano Selecionado' : 'Selecionar Plano'}
            </button>
          </div>
        ))}
      </div>

      <div className="subscribe-section">
        <button 
          className="subscribe-btn" 
          onClick={handleSubscribe}
          disabled={!selectedPlan}
        >
          Assinar Plano Selecionado
        </button>
      </div>
    </div>
  );
};

export default Subscriptions;