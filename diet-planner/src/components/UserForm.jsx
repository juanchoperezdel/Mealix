import { useState } from 'react';

const UserForm = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        goal: 'Pérdida de Peso',
        budget: '40000',
        allergies: '',
        preferences: 'Estándar',
        mealsPerDay: 3,
        additionalInfo: ''
    });

    const goals = [
        { id: 'Pérdida de Peso', label: 'Perder Peso', emoji: '🔥', desc: 'Quemar grasa y definir.' },
        { id: 'Ganancia Muscular', label: 'Ganar Músculo', emoji: '💪', desc: 'Aumentar masa y fuerza.' },
        { id: 'Mantenimiento', label: 'Estar Saludable', emoji: '🥗', desc: 'Mantener peso y energía.' }
    ];

    const dietPrefs = [
        { id: 'Estándar', label: 'Omnívoro', emoji: '🍖' },
        { id: 'Vegetariana', label: 'Vegetariano', emoji: '🥦' },
        { id: 'Vegana', label: 'Vegano', emoji: '🌿' },
        { id: 'Keto', label: 'Keto / Low Carb', emoji: '🥓' },
        { id: 'Mediterránea', label: 'Mediterráneo', emoji: '🥫' }
    ];

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const progress = (step / 4) * 100;

    return (
        <div className="animate-fade-in" style={{ padding: '0 0.5rem' }}>

            {/* Progress Header */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Paso {step} de 4
                </div>
                <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`, background: 'var(--c-primary)', transition: 'width 0.4s ease' }}></div>
                </div>
            </div>

            {/* Step 1: Goal */}
            {step === 1 && (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'left' }}>¿Cuál es tu <span className="text-gradient">objetivo?</span></h2>
                    <p style={{ marginBottom: '2rem' }}>Personalizaremos tu dieta según lo que quieras lograr.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {goals.map(g => (
                            <div
                                key={g.id}
                                className={`app-card interactive ${formData.goal === g.id ? 'selected' : ''}`}
                                onClick={() => handleSelect('goal', g.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem',
                                    border: formData.goal === g.id ? '2px solid var(--c-primary)' : '1px solid var(--border-color)',
                                    background: formData.goal === g.id ? 'rgba(30, 80, 255, 0.05)' : 'var(--bg-card)'
                                }}
                            >
                                <span style={{ fontSize: '2.5rem' }}>{g.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>{g.label}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{g.desc}</div>
                                </div>
                                {formData.goal === g.id && <div style={{ color: 'var(--c-primary)' }}>✓</div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Diet Prefs */}
            {step === 2 && (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Tus <span className="text-gradient">preferencias</span></h2>
                    <p style={{ marginBottom: '2rem' }}>Selecciona tu estilo de alimentación actual.</p>

                    <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {dietPrefs.map(p => (
                            <button
                                key={p.id}
                                className={`option-btn ${formData.preferences === p.id ? 'selected' : ''}`}
                                onClick={() => handleSelect('preferences', p.id)}
                                style={{ padding: '2rem 1rem', borderColor: formData.preferences === p.id ? 'var(--c-primary)' : 'var(--border-color)' }}
                            >
                                <span style={{ fontSize: '2rem', marginBottom: '8px' }}>{p.emoji}</span>
                                <div>{p.label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Logistics */}
            {step === 3 && (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Ajustes <span className="text-gradient">clave</span></h2>
                    <p style={{ marginBottom: '2rem' }}>Contanos un poco sobre tu presupuesto diario y organización.</p>

                    <div className="form-grid">
                        <div className="input-group">
                            <label className="input-label">Presupuesto Mensual ($)</label>
                            <input
                                type="number" name="budget" className="input-field"
                                value={formData.budget} onChange={handleChange}
                                placeholder="Ej: 50000"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">¿Cuántas veces comes al día?</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {[2, 3, 4, 5].map(n => (
                                    <button
                                        key={n}
                                        className={`option-btn ${formData.mealsPerDay === n ? 'selected' : ''}`}
                                        onClick={() => handleSelect('mealsPerDay', n)}
                                        style={{ flex: 1, padding: '1rem' }}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 4: Final Info */}
            {step === 4 && (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Toques <span className="text-gradient">finales</span></h2>
                    <p style={{ marginBottom: '2rem' }}>Cualquier alergia o detalle extra ayuda a la IA a ser más precisa.</p>

                    <div className="form-grid">
                        <div className="input-group">
                            <label className="input-label">Alergias o Intolerancias</label>
                            <input
                                type="text" name="allergies" className="input-field"
                                value={formData.allergies} onChange={handleChange}
                                placeholder="Ej: Gluten, Maní..."
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Notas adicionales</label>
                            <textarea
                                name="additionalInfo" className="input-field" rows="4"
                                value={formData.additionalInfo} onChange={handleChange}
                                placeholder="Ej: No me gusta el pescado, tengo poco tiempo para cocinar..."
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Navigation */}
            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                {step > 1 && (
                    <button className="btn-secondary" onClick={prevStep} style={{ flex: 1 }}>
                        Atrás
                    </button>
                )}
                {step < 4 ? (
                    <button className="btn-primary" onClick={nextStep} style={{ flex: 2 }}>
                        Continuar →
                    </button>
                ) : (
                    <button className="btn-primary" onClick={handleSubmit} style={{ flex: 2 }}>
                        ✨ Generar mi Dieta
                    </button>
                )}
            </div>

        </div>
    );
};

export default UserForm;
