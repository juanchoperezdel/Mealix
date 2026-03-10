// Simulación de interacción con LLM - Datos Enriquecidos para UI AAA

const MEAL_DATABASE = {
    'Pérdida de Peso': {
        Morning: [
            { name: "Pancakes de Avena", emoji: "🥞", calories: 350, protein: 20, fat: 8, carbs: 45, prepTime: "15 min", difficulty: "Fácil", ingredients: ["1 banana", "1 huevo", "1/2 taza avena"], instructions: ["Licuar todo.", "Cocinar en sartén antiadherente.", "Servir con canela."] },
            { name: "Yogur con Proteína", emoji: "🍦", calories: 280, protein: 25, fat: 4, carbs: 20, prepTime: "5 min", difficulty: "Fácil", ingredients: ["200g Yogur griego", "1 scoop proteína", "Frutos secos"], instructions: ["Mezclar el yogur y la proteína.", "Decorar con frutos secos."] }
        ],
        Lunch: [
            { name: "Ensalada de Atún", emoji: "🥗", calories: 450, protein: 40, fat: 12, carbs: 30, prepTime: "10 min", difficulty: "Fácil", ingredients: ["1 lata de atún", "Lechuga", "Tomate", "Palta"], instructions: ["Mezclar vegetales.", "Añadir el atún.", "Aliñar con limón y aceite."] },
            { name: "Pollo a la Plancha", emoji: "🍗", calories: 500, protein: 45, fat: 10, carbs: 35, prepTime: "20 min", difficulty: "Media", ingredients: ["Pecho de pollo", "Batata", "Brócoli"], instructions: ["Cocinar pollo.", "Hervir batata.", "Saltear brócoli."] }
        ],
        Dinner: [
            { name: "Sopa de Vegetales", emoji: "🍲", calories: 320, protein: 15, fat: 8, carbs: 40, prepTime: "25 min", difficulty: "Media", ingredients: ["Caldo de verduras", "Zanahoria", "Zapallo", "Fideos integrales"], instructions: ["Cortar vegetales.", "Hervir en caldo.", "Añadir fideos al final."] }
        ]
    },
    'Ganancia Muscular': {
        Morning: [
            { name: "Tortilla de Claras", emoji: "🍳", calories: 600, protein: 40, fat: 15, carbs: 70, prepTime: "12 min", difficulty: "Media", ingredients: ["4 claras", "2 huevos", "Pan integral", "Queso"], instructions: ["Batir huevos.", "Cocinar tortilla.", "Tostar pan."] }
        ],
        Lunch: [
            { name: "Pasta Boloñesa Fit", emoji: "🍝", calories: 850, protein: 50, fat: 20, carbs: 100, prepTime: "30 min", difficulty: "Media", ingredients: ["Pasta integral", "Carne picada magra", "Salsa tomate"], instructions: ["Hervir pasta.", "Cocinar carne con salsa.", "Mezclar todo."] }
        ],
        Dinner: [
            { name: "Filete de Res y Arroz", emoji: "🥩", calories: 750, protein: 55, fat: 22, carbs: 65, prepTime: "25 min", difficulty: "Media", ingredients: ["200g Res", "1 taza arroz", "Espinacas"], instructions: ["Grillar res.", "Cocinar arroz blanco.", "Blanquear espinacas."] }
        ]
    }
};

const DEFAULT_MEALS = {
    Morning: { name: "Avena con Frutas", emoji: "🥣", calories: 420, protein: 18, fat: 10, carbs: 60, prepTime: "10 min", difficulty: "Fácil", ingredients: ["Avena", "Leche", "Frutas"], instructions: ["Hervir leche con avena.", "Añadir frutas cortadas."] },
    Lunch: { name: "Pechuga y Arroz", emoji: "🍚", calories: 650, protein: 40, fat: 12, carbs: 80, prepTime: "20 min", difficulty: "Fácil", ingredients: ["Pollo", "Arroz", "Ensalada"], instructions: ["Cocinar pollo.", "Cocinar arroz."] },
    Dinner: { name: "Pescado al Horno", emoji: "🐟", calories: 480, protein: 35, fat: 15, carbs: 30, prepTime: "25 min", difficulty: "Media", ingredients: ["Merluza", "Papa", "Cebolla"], instructions: ["Hornear pescado.", "Hornear papas."] }
};

export const generateDietPlan = async (userInputs) => {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const goal = MEAL_DATABASE[userInputs.goal] || MEAL_DATABASE['Pérdida de Peso'];
    const targetCals = userInputs.goal === 'Pérdida de Peso' ? 1900 : (userInputs.goal === 'Ganancia Muscular' ? 2900 : 2400);

    return {
        summary: `Plan de 30 días para ${userInputs.goal.toLowerCase()} basado en dieta ${userInputs.preferences}.`,
        caloriesTarget: targetCals,
        caloriesBurnedMock: 520,
        macros: {
            protein: { current: 125, target: 160 },
            fat: { current: 48, target: 75 },
            carbs: { current: 210, target: 300 }
        },
        weeks: Array.from({ length: 4 }, (_, w) => ({
            weekNumber: w + 1,
            days: Array.from({ length: 7 }, (_, d) => {
                const dayNum = (w * 7) + d + 1;
                const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

                return {
                    dayNumber: dayNum,
                    dayOfWeek: days[d],
                    meals: Array.from({ length: userInputs.mealsPerDay }, (_, m) => {
                        let type = m === 0 ? 'Morning' : (m === 1 ? 'Lunch' : (m === userInputs.mealsPerDay - 1 ? 'Dinner' : 'Lunch'));
                        const options = goal[type] || [DEFAULT_MEALS[type]];
                        const selected = options[Math.floor(Math.random() * options.length)];

                        return {
                            ...selected,
                            time: type === 'Morning' ? 'Desayuno' : (type === 'Dinner' ? 'Cena' : (m === 1 ? 'Almuerzo' : `Merienda`)),
                            timeLabel: type === 'Morning' ? '08:30 am' : (type === 'Dinner' ? '08:30 pm' : (m === 1 ? '01:30 pm' : '05:00 pm')),
                        };
                    })
                };
            })
        }))
    };
};
