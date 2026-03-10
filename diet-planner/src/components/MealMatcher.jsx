import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import { motion, AnimatePresence } from 'framer-motion';
import './MealMatcher.css';

const MealMatcher = ({ originalMeal, alternatives, onSelect, onClose }) => {
    // We reverse the array so the first alternative appears on top of the stack
    const [cards, setCards] = useState(alternatives.slice().reverse());
    const [swipeDirection, setSwipeDirection] = useState(null);

    const swiped = (direction, foodToSwap) => {
        setSwipeDirection(direction);
        if (direction === 'right') {
            onSelect(foodToSwap);
        } else {
            // Remove the card from the stack
            setCards(prev => prev.filter(c => c.name !== foodToSwap.name));
            setTimeout(() => setSwipeDirection(null), 300);
        }
    };

    const outOfFrame = (name) => {
        // Automatically close if we run out of cards
        if (cards.length === 1 && cards[0].name === name) {
            setTimeout(onClose, 500);
        }
    };

    const swipe = (dir) => {
        const cardsLeft = cards.filter(person => !person.swiped)
        if (cardsLeft.length) {
            const toBeSwiped = cardsLeft[cardsLeft.length - 1] // Find the top card
            swiped(dir, toBeSwiped)
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="meal-matcher-overlay"
            >
                <div className="meal-matcher-container">
                    <button className="matcher-close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div className="matcher-header">
                        <span className="matcher-subtitle">Reemplazando:</span>
                        <h3 className="matcher-title">{originalMeal.emoji} {originalMeal.name}</h3>
                        <div className="matcher-macros-target">
                            <span>{originalMeal.calories} kcal</span> •
                            <span>{originalMeal.protein}g Pro</span>
                        </div>
                    </div>

                    <div className="matcher-card-container">
                        {cards.length === 0 ? (
                            <div className="matcher-empty-state">
                                <h2>¡Te quedaste sin opciones! 😅</h2>
                                <p>No hay más alternativas con estos macros por hoy.</p>
                                <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={onClose}>Volver a la Dieta</button>
                            </div>
                        ) : (
                            cards.map((meal) => (
                                <TinderCard
                                    className='swipe'
                                    key={meal.name}
                                    onSwipe={(dir) => swiped(dir, meal)}
                                    onCardLeftScreen={() => outOfFrame(meal.name)}
                                    preventSwipe={['up', 'down']}
                                >
                                    <div className="matcher-card">
                                        <div className="matcher-card-image">
                                            <span style={{ fontSize: '4rem' }}>{meal.emoji}</span>
                                            <div className="matcher-card-price-tag">
                                                Ahorrás $1.200
                                            </div>
                                        </div>
                                        <div className="matcher-card-content">
                                            <h2>{meal.name}</h2>
                                            <p>{meal.description}</p>

                                            <div className="matcher-card-macros">
                                                <div className="macro-pill">
                                                    <strong>🔥 {meal.calories}</strong> kcal
                                                </div>
                                                <div className="macro-pill">
                                                    <strong>🥩 {meal.protein}g</strong> pro
                                                </div>
                                            </div>

                                            <div className="matcher-badges">
                                                <span className="badge-time">⏱ {meal.prepTime}</span>
                                                <span className="badge-diff">👩‍🍳 {meal.difficulty}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TinderCard>
                            ))
                        )}
                    </div>

                    <div className="matcher-controls">
                        <button className="matcher-btn reject" onClick={() => swipe('left')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="swipe-instruction">
                            Swipea para elegir
                        </div>
                        <button className="matcher-btn accept" onClick={() => swipe('right')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MealMatcher;
