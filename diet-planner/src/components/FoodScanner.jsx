import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FoodScanner.css';

const FoodScanner = ({ onClose, onAddMeal }) => {
    const [scanState, setScanState] = useState('idle'); // 'idle', 'scanning', 'success'
    const [scanResult, setScanResult] = useState(null);

    const handleCapture = () => {
        setScanState('scanning');

        // Simulate AI Vision processing time
        setTimeout(() => {
            setScanResult({
                name: "Tarta de Choclo y Queso",
                emoji: "🥧",
                calories: 385,
                protein: 14,
                fatGrams: 18,
                carbs: 42,
                description: "Porción mediana de tarta casera con masa integral.",
                prepTime: "0 min",
                difficulty: "Comprada"
            });
            setScanState('success');
        }, 3000); // 3 seconds of scanning animation
    };

    const handleAdd = () => {
        onAddMeal(scanResult);
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="scanner-overlay"
            >
                {/* Simulated Camera Viewfinder */}
                <div className="scanner-viewfinder">

                    {/* Header */}
                    <div className="scanner-header">
                        <button className="scanner-close-btn" onClick={onClose}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="scanner-title">AI Food Vision</div>
                        <div style={{ width: 40 }}></div> {/* spacer */}
                    </div>

                    {/* Camera Area */}
                    <div className={`camera-area ${scanState === 'scanning' ? 'is-scanning' : ''}`}>
                        {/* Fake background image to simulate camera feed looking at a pie */}
                        <div className="camera-feed-mock">
                            🥧
                        </div>

                        {/* Viewfinder brackets */}
                        <div className="vf-bracket top-left"></div>
                        <div className="vf-bracket top-right"></div>
                        <div className="vf-bracket bottom-left"></div>
                        <div className="vf-bracket bottom-right"></div>

                        {/* CSS Cyberpunk Scan Line */}
                        {scanState === 'scanning' && (
                            <>
                                <div className="scan-line"></div>
                                <div className="scan-particles">
                                    <div className="particle p1"></div>
                                    <div className="particle p2"></div>
                                    <div className="particle p3"></div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Bottom Controls Area */}
                    <div className="scanner-controls">
                        {scanState === 'idle' && (
                            <div className="idle-state">
                                <p>Apunta tu plato y deja que la IA calcule tus macros.</p>
                                <button className="capture-target" onClick={handleCapture}>
                                    <div className="capture-inner"></div>
                                </button>
                            </div>
                        )}

                        {scanState === 'scanning' && (
                            <div className="scanning-state">
                                <h3 className="glitch-text" data-text="Analizando...">Analizando...</h3>
                                <p>Identificando ingredientes y volumen...</p>
                            </div>
                        )}

                        {scanState === 'success' && scanResult && (
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="success-state"
                            >
                                <div className="result-card">
                                    <div className="result-header">
                                        <div className="result-emoji">{scanResult.emoji}</div>
                                        <div>
                                            <h3>{scanResult.name}</h3>
                                            <p>{scanResult.description}</p>
                                        </div>
                                    </div>

                                    <div className="result-macros">
                                        <div className="rm-item">
                                            <span>🔥 {scanResult.calories}</span>
                                            <label>Kcal</label>
                                        </div>
                                        <div className="rm-item">
                                            <span style={{ color: 'var(--c-protein)' }}>{scanResult.protein}g</span>
                                            <label>Pro</label>
                                        </div>
                                        <div className="rm-item">
                                            <span style={{ color: 'var(--c-fat)' }}>{scanResult.fatGrams}g</span>
                                            <label>Gra</label>
                                        </div>
                                        <div className="rm-item">
                                            <span style={{ color: 'var(--c-carbs)' }}>{scanResult.carbs}g</span>
                                            <label>Carb</label>
                                        </div>
                                    </div>

                                    <button className="btn-primary w-100" onClick={handleAdd}>
                                        Agregar a mi día
                                    </button>
                                    <button className="btn-secondary w-100 mt-2" onClick={() => setScanState('idle')} style={{ marginTop: '12px' }}>
                                        Volver a escanear
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FoodScanner;
