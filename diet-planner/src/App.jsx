import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import DietPlanDisplay from './components/DietPlanDisplay';
import { generateDietPlan } from './services/aiDietService';

function App() {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadMsgIdx, setLoadMsgIdx] = useState(0);

  const loadMessages = [
    "Calculando requerimientos calóricos...",
    "Generando 30 días de recetas premium...",
    "Balanceando proteínas y fibras...",
    "Ajustando lista de compras semanal...",
    "Finalizando tu plan AAA..."
  ];

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    // Simular mensajes dinámicos
    const interval = setInterval(() => {
      setLoadMsgIdx(prev => (prev + 1) % loadMessages.length);
    }, 1500);

    try {
      const plan = await generateDietPlan(formData);
      setDietPlan(plan);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error. El servidor de la IA está saturado.");
    } finally {
      setLoading(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="app-container">

      {/* MEALIX HEADER - Social & Profile style */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 20px 10px', animation: 'springUp 0.8s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'var(--bg-input)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.4rem', border: '2px solid white',
            boxShadow: 'var(--shadow-sm)'
          }}>
            👤
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>¡Hola, Lucas! 👋</div>
            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>Mealix©</div>
          </div>
        </div>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'white', display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: 'var(--shadow-sm)', cursor: 'pointer'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
      </header>

      {/* Hero Header - Hidden when diet is displayed */}
      {!dietPlan && !loading && (
        <header className="hero-section animate-fade-in" style={{ padding: '2rem 1.5rem 2rem' }}>
          <h1 className="hero-title text-gradient" style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-4px' }}>Mealix©</h1>
          <p className="hero-subtitle" style={{ fontSize: '1.1rem', marginTop: '0.5rem', opacity: 0.8 }}>
            Tu nutrición profesional en el bolsillo.
          </p>
        </header>
      )}

      <main className="main-content">
        {!dietPlan && !loading && (
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <UserForm onSubmit={handleFormSubmit} />
          </section>
        )}

        {loading && (
          <div className="animate-fade-in" style={{
            textAlign: 'center',
            padding: '5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
          }}>
            <div className="loading-spinner" style={{ width: '60px', height: '60px', borderWidth: '6px', marginBottom: '1.5rem' }}></div>
            <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{loadMessages[loadMsgIdx]}</h2>
            <p style={{ maxWidth: '250px', margin: '0 auto' }}>Nuestro orquestador de IA está diseñando cada detalle de tu nutrición.</p>
          </div>
        )}

        {error && (
          <div className="app-card animate-fade-in" style={{ border: '2px solid var(--c-error)', textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h3 style={{ color: 'var(--c-error)', marginBottom: '0.5rem' }}>Error de Conexión</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={() => setError(null)} style={{ marginTop: '1.5rem', background: 'var(--text-main)' }}>
              Reintentar Onboarding
            </button>
          </div>
        )}

        {dietPlan && !loading && (
          <section className="animate-fade-in">
            <DietPlanDisplay plan={dietPlan} onReset={() => setDietPlan(null)} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
