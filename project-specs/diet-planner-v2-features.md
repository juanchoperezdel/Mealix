# Reporte de Investigación y Expansión de Features (V2)

## 👥 Agentes Involucrados
- **`agency-product-trend-researcher`**: Analizó competitividad contra apps top como MyFitnessPal, MacroFactor y Lifesum.
- **`agency-ux-researcher`**: Evaluó flujos de fricción comunes en apps de dieta.
- **`agency-ui-designer`**: Propone integraciones en el Dashboard actual basado en las imágenes de referencia ("Fitnessme©").
- **`project-manager-senior`**: Consolidó y priorizó esta lista de features.

---

## 📈 1. Insights del Mercado (Trend Researcher)
Las apps de nutrición modernas exitosas no solo "dictan" qué comer; son flexibles y gamificadas.
1. **Listas de Compras Automáticas (Grocery List):** El mayor punto de fricción es tener la dieta pero no los ingredientes. Si generamos 30 días de comidas, la IA DEBE generar una lista de supermercado consolidada por semana.
2. **Sistema de Remplazos (Swap Meal):** A los usuarios no les gusta el 10% de las comidas. Necesitan un botón de "Cambiar esta comida", que le pida a la IA una alternativa con exactamente los mismos macros.
3. **Manejo de Sobras (Leftovers):** Opción de decirle a la IA: "Cociname para 2 días".

## 🧠 2. Mejoras de Experiencia (UX Researcher)
1. **Tracker de Agua (Water Intake):** Fundamental en cualquier app de salud. Podemos agregar las barras azules de agua que se ven en la imagen de referencia.
2. **Streak & Gamificación:** Recompensar visualmente al usuario (fueguitos 🔥) por completar el 100% de las comidas del día.
3. **Escáner/IA Visual:** A futuro, que puedan subir una foto de su heladera y la IA adapte la dieta de *ese* día a lo que tengan.

## 🎨 3. Actualizaciones Visuales (UI Designer)
Basado exhaustivamente en el mockup de "Fitnessme©":
1. **Gráfico de Agua:** Un componente de barras (`Mon, Tue, Wed...`) con relleno dinámico para los litros de agua.
2. **Dashboard de Macros Expansivo:** Las pequeñas barras de grasa, proteína y carbs se deben ver flotando como widgets individuales debajo del gráfico principal. (Actualmente los tenemos pequeños debajo del arco, podemos darles más jerarquía).
3. **Bottom Navigation Bar:** Una barra de navegación persistente inferior al estilo iOS (Home, Reloj/Historial, Favoritos, Perfil/Ajustes) para que realmente se sienta como una aplicación nativa instalable (PWA).

---

## 📋 Plan de Acción Propuesto (Próxima Fase Frontend)

Antes de tocar el backend pesado, implementaremos:

- [ ] **Feature 1:** `WaterIntakeWidget` - Componente visual animado para registrar los litros de agua.
- [ ] **Feature 2:** `SwapMealModal` - Un modal visual donde puedas darle un toque a "Cambiar" en una comida y la interfaz te muestre opciones alternativas simuladas (ideal para setear el terreno a la IA).
- [ ] **Feature 3:** `BottomNavBar` - Navegación estilo iOS para estructurar vistas (Hoy, Lista de Compras, Perfil).
- [ ] **Feature 4:** `GroceryListView` - Vista de lista de supermercado generada a partir de los ingredientes de la semana.
