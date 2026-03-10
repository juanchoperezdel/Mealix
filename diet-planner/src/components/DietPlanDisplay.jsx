import { useState, useEffect } from 'react';
import MealMatcher from './MealMatcher';
import FoodScanner from './FoodScanner';

// Icons 
const CheckIcon = () => (
    <svg className="meal-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const HomeIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const ActivityIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
);

const UserIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const DietPlanDisplay = ({ plan, onReset }) => {
    const [activeWeek, setActiveWeek] = useState(0);
    const [activeDayIdx, setActiveDayIdx] = useState(0);
    // Estado para guardar las comidas trackeadas: { "week-day-meal": boolean }
    const [trackedMeals, setTrackedMeals] = useState({});
    const [waterIntake, setWaterIntake] = useState({});
    const [arcOffset, setArcOffset] = useState(283); // Start empty (hidden)
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [swappingMeal, setSwappingMeal] = useState(null); // The meal being swapped
    const [mockAlternatives, setMockAlternatives] = useState([]); // Temporary mock data
    const [streakDays, setStreakDays] = useState(5); // Gamification: Mock Streak Days
    const [showScanner, setShowScanner] = useState(false); // AI Food Scanner state

    // Bottom Sheet Component
    const MealDetailSheet = ({ meal, onClose }) => {
        if (!meal) return null;
        return (
            <div className="bottom-sheet-overlay" onClick={onClose}>
                <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
                    <div className="sheet-handle"></div>
                    <div className="sheet-header">
                        <div>
                            <div style={{ color: 'var(--c-primary)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                                {meal.time} • {meal.calories} kcal
                            </div>
                            <h2 className="sheet-title">{meal.emoji} {meal.name}</h2>
                        </div>
                        <button className="sheet-close" onClick={onClose}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="sheet-content">
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}>⏱ {meal.prepTime}</div>
                            <div className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}>🔥 {meal.difficulty}</div>
                        </div>

                        <h3 className="sheet-section-title">🥗 Ingredientes</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {meal.ingredients?.map((ing, i) => (
                                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ color: 'var(--c-success)' }}>•</span> {ing}
                                </li>
                            ))}
                        </ul>

                        <h3 className="sheet-section-title">👨‍🍳 Instrucciones</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {meal.instructions?.map((step, i) => (
                                <div key={i} className="step-item">
                                    <div className="step-number">{i + 1}</div>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={onClose}>
                            Marcar como Completado
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        // Animate the arc on mount or when plan changes
        if (plan) {
            setTimeout(() => {
                const pct = 0.7; // 70%
                setArcOffset(283 - (283 * pct));
            }, 100);
        }
    }, [plan]);

    if (!plan) return null;

    const currentDay = plan.weeks[activeWeek].days[activeDayIdx];

    const toggleMeal = (wIdx, dIdx, mIdx) => {
        const key = `${wIdx}-${dIdx}-${mIdx}`;
        setTrackedMeals(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleWaterClick = (dayName) => {
        setWaterIntake(prev => {
            const current = prev[dayName] || 0;
            const next = current >= 2.5 ? 0 : current + 0.5;
            return { ...prev, [dayName]: next };
        });
    };

    const handleOpenSwipe = (meal) => {
        // Generate some mock alternatives that fit the same macros roughly
        const mocks = [
            {
                name: "Tortilla de Claras fit",
                emoji: "🥚",
                description: "Deliciosa tortilla rápida con espinaca y un toque de queso magro.",
                calories: meal.calories - 15,
                protein: meal.protein + 5,
                fatGrams: meal.fatGrams - 2,
                prepTime: "10 min",
                difficulty: "Fácil"
            },
            {
                name: "Yogur Griego con Nueces",
                emoji: "🥣",
                description: "Bowl fresco, alto en proteínas y grasas saludables.",
                calories: meal.calories + 20,
                protein: meal.protein,
                fatGrams: meal.fatGrams + 4,
                prepTime: "2 min",
                difficulty: "Muy Fácil"
            },
            {
                name: "Pancakes Proteicos",
                emoji: "🥞",
                description: "Esponjosos pancakes hechos con avena y proteína en polvo.",
                calories: meal.calories,
                protein: meal.protein + 10,
                fatGrams: meal.fatGrams,
                prepTime: "15 min",
                difficulty: "Media"
            }
        ];
        setMockAlternatives(mocks);
        setSwappingMeal(meal);
    };

    const handleSelectAlternative = (newMeal) => {
        // Here we would normally dispatch to adjust the global plan state
        alert(`¡Elegiste ${newMeal.name}! La dieta se actualizará.`);
        setSwappingMeal(null);
    };

    const handleAddScannedMeal = (scannedMeal) => {
        alert(`¡Agregado ${scannedMeal.name} a tus macros del día!`);
        // We would dispatch this to the global state to update targets
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '100px' }}>

            {/* HEADER NAV */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={onReset} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)', width: '30px' }}>
                    ←
                </button>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Progreso Diario</h2>

                {/* Gamification: Streak Indicator */}
                <div
                    className="streak-indicator"
                    onClick={() => alert("¡Llevas 5 días seguidos cumpliendo tus macros! Sigue así para subir de nivel.")}
                >
                    <span className="streak-fire">{streakDays >= 7 ? '☄️' : '🔥'}</span>
                    <span className="streak-count">{streakDays}</span>
                </div>
            </div>

            {/* MEALIX CALORIE BANNER (AAA Focal Point) */}
            <div className="app-card" style={{
                background: 'linear-gradient(135deg, #FFF, #FEF9F3)',
                padding: '1.2rem', marginBottom: '1.5rem',
                border: '1px solid rgba(255, 149, 0, 0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            background: 'rgba(255, 149, 0, 0.1)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
                        }}>
                            🔥
                        </div>
                        <div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-main)' }}>
                                {Math.round(plan.caloriesTarget * 0.45)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>/ {Math.round(plan.caloriesTarget)}</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Calorías de Hoy
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
                {/* Slim progress bar inside banner */}
                <div style={{ height: '8px', background: 'var(--bg-input)', borderRadius: '4px', marginTop: '12px', overflow: 'hidden' }}>
                    <div style={{ width: '45%', height: '100%', background: 'linear-gradient(to right, #FF9500, #FFCC00)', borderRadius: '4px' }}></div>
                </div>
            </div>

            {/* MACRO PILLS (Protein, Fat, Carbs Balance) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
                <div className="app-card" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>PROTEÍNA</div>
                    <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--c-protein)' }}>{plan.macros.protein.current}g</div>
                    <div style={{ height: '4px', background: 'var(--bg-input)', borderRadius: '2px', marginTop: '6px' }}>
                        <div style={{ width: '70%', height: '100%', background: 'var(--c-protein)', borderRadius: '2px' }}></div>
                    </div>
                </div>
                <div className="app-card" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>GRASAS</div>
                    <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--c-fat)' }}>{plan.macros.fat.current}g</div>
                    <div style={{ height: '4px', background: 'var(--bg-input)', borderRadius: '2px', marginTop: '6px' }}>
                        <div style={{ width: '45%', height: '100%', background: 'var(--c-fat)', borderRadius: '2px' }}></div>
                    </div>
                </div>
                <div className="app-card" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>CARBS</div>
                    <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--c-carbs)' }}>{plan.macros.carbs.current}g</div>
                    <div style={{ height: '4px', background: 'var(--bg-input)', borderRadius: '2px', marginTop: '6px' }}>
                        <div style={{ width: '85%', height: '100%', background: 'var(--c-carbs)', borderRadius: '2px' }}></div>
                    </div>
                </div>
            </div>

            {/* WATER INTAKE - MEALIX CAPSULES */}
            <div className="app-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>Water Intake <span style={{ fontWeight: '400', color: 'var(--text-muted)' }}>(Litters)</span></h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>See All</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 4px' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                        const liters = waterIntake[day === 'Mon' ? 'Lun' : day === 'Tue' ? 'Mar' : day === 'Wed' ? 'Mié' : day === 'Thu' ? 'Jue' : day === 'Fri' ? 'Vie' : day === 'Sat' ? 'Sáb' : 'Dom'] || 0;
                        const fillPct = (liters / 2.0) * 100;

                        return (
                            <div key={day} className="capsule-tracker">
                                <div className="capsule-bar" onClick={() => {
                                    const key = day === 'Mon' ? 'Lun' : day === 'Tue' ? 'Mar' : day === 'Wed' ? 'Mié' : day === 'Thu' ? 'Jue' : day === 'Fri' ? 'Vie' : day === 'Sat' ? 'Sáb' : 'Dom';
                                    handleWaterClick(key);
                                }}>
                                    {liters > 0 && <div className="capsule-value">{liters}</div>}
                                    <div className="capsule-fill" style={{ height: `${fillPct > 100 ? 100 : fillPct}%` }}></div>
                                </div>
                                <span className="capsule-label">{day}</span>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* WEEK NAVIGATOR */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', overflowX: 'auto' }}>
                {plan.weeks.map((week, idx) => (
                    <button
                        key={idx}
                        className={`btn-secondary ${activeWeek === idx ? 'active' : ''}`}
                        onClick={() => { setActiveWeek(idx); setActiveDayIdx(0); }}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                        Semana {week.weekNumber}
                    </button>
                ))}
            </div>

            {/* DAYS NAVIGATOR */}
            <div className="days-nav">
                {plan.weeks[activeWeek].days.map((day, dIdx) => {
                    const isActive = activeDayIdx === dIdx;
                    return (
                        <div
                            key={dIdx}
                            onClick={() => setActiveDayIdx(dIdx)}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                                opacity: isActive ? 1 : 0.5, transition: 'var(--transition-fast)'
                            }}
                        >
                            <div style={{
                                width: '45px', height: '60px',
                                borderRadius: '30px',
                                background: isActive ? 'linear-gradient(to bottom, var(--c-primary), var(--c-primary-light))' : 'var(--bg-card)',
                                color: isActive ? 'white' : 'var(--text-main)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: '600', boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                            }}>
                                {day.dayNumber}
                            </div>
                            <span style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: '500', color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                {day.dayOfWeek}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* MEALS LIST */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>Comidas de Hoy</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ver todo</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {currentDay.meals.map((meal, mIdx) => {
                        const isTracked = !!trackedMeals[`${activeWeek}-${activeDayIdx}-${mIdx}`];

                        return (
                            <div
                                key={mIdx}
                                className="app-card"
                                style={{ padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}
                                onClick={() => setSelectedMeal(meal)}
                            >

                                {/* Tracker Checkbox */}
                                <div
                                    className={`meal-check-container ${isTracked ? 'checked' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); toggleMeal(activeWeek, activeDayIdx, mIdx); }}
                                    style={{ flexShrink: 0, marginTop: '2px' }}
                                >
                                    <CheckIcon />
                                </div>

                                {/* Meal Details */}
                                <div style={{ flex: 1, opacity: isTracked ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '1.2rem' }}>{meal.emoji}</span>
                                            <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{meal.time}</span>
                                        </div>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>{meal.timeLabel}</span>
                                    </div>

                                    {/* Nombre y Descripción incorporada */}
                                    <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '2px' }} className="text-gradient">{meal.name}</h4>
                                    <p style={{ fontSize: '0.85rem', marginBottom: '12px', fontWeight: '400' }}>{meal.description}</p>

                                    {/* Macros info footer */}
                                    <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                                        <div>
                                            <span style={{ fontWeight: '700', color: 'var(--c-warning)' }}>{Math.round(meal.calories)}</span> kcal
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{meal.protein}g</span> Pro
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{meal.fatGrams}g</span> Grasas
                                        </div>
                                    </div>
                                </div>

                                {/* SWAP MEAL BUTTON (simulated) */}
                                <div
                                    style={{ color: 'var(--c-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', height: '100%', paddingLeft: '8px' }}
                                    title="Cambiar comida"
                                    onClick={(e) => { e.stopPropagation(); handleOpenSwipe(meal); }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="16 3 21 3 21 8"></polyline>
                                        <line x1="4" y1="20" x2="21" y2="3"></line>
                                        <polyline points="21 16 21 21 16 21"></polyline>
                                        <line x1="15" y1="15" x2="21" y2="21"></line>
                                        <line x1="4" y1="4" x2="9" y2="9"></line>
                                    </svg>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AI Summary Insights Button */}
            <button className="btn-primary" style={{
                marginTop: '1.5rem', background: 'var(--c-primary)',
                color: 'white', borderRadius: 'var(--radius-pill)',
                padding: '16px', display: 'flex', justifyContent: 'space-between',
                boxShadow: '0 12px 24px rgba(30, 80, 255, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        ✨
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: '700' }}>Resumen de IA</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            {/* AI SCANNER FLOATING BUTTON */}
            <button
                onClick={() => setShowScanner(true)}
                style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '24px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '32px',
                    background: 'linear-gradient(135deg, #FF9500, #FF3B30)',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 24px rgba(255, 59, 48, 0.4)',
                    cursor: 'pointer',
                    zIndex: 900
                }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
            </button>


            {/* BOTTOM NAV BAR - FLOATING PILL */}
            <nav className="bottom-nav-bar">
                <div className="nav-item active">
                    <HomeIcon />
                </div>
                <div className="nav-item" onClick={() => alert("Insights de Macros")}>
                    <ActivityIcon />
                </div>
                <div className="nav-item" onClick={() => alert("Cálculo de Compras con IA")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </div>
                <div className="nav-item" onClick={() => alert("Favoritos")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <div className="nav-item" onClick={() => alert("Ajustes Perfil")}>
                    <UserIcon />
                </div>
            </nav>

            {/* MEAL DETAIL SHEET */}
            {selectedMeal && <MealDetailSheet meal={selectedMeal} onClose={() => setSelectedMeal(null)} />}

            {/* MEAL MATCHER (Tinder Swipe) */}
            {swappingMeal && (
                <MealMatcher
                    originalMeal={swappingMeal}
                    alternatives={mockAlternatives}
                    onSelect={handleSelectAlternative}
                    onClose={() => setSwappingMeal(null)}
                />
            )}

        </div>
    );
};

export default DietPlanDisplay;
