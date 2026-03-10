# Vision AAA: Diseño y Funcionalidad Premium

El objetivo de esta fase es elevar la aplicación de un "buen prototipo" a una **Aplicación Nutricional AAA**. Tomando como base la estética de startups top (vibrante, moderna, gamificada y altamente usable), el orquestador (`agency-agents-orchestrator`) coordinará a los agentes `ui-designer`, `ux-architect`, y `senior-developer` para implementar las siguientes mejoras radicales antes del backend.

---

## 🎨 1. Estética y "Onda" Visual Exageradamente AAA (The "Wow" Factor)

El diseño actual es limpio, pero le falta la "vida" y el color de las referencias originales. Pasaremos a un modelo visual mucho más agresivo y atractivo:

### Paleta y Gradientes Dinámicos:
- **Fondos de Tarjetas Vivos:** En lugar de dejar todas las tarjetas de comidas blancas, usaremos subtipos de tarjetas con gradientes muy suaves según la comida (Ej: Mañana: gradiente cálido anaranjado; Noche: azul perlado).
- **Sombras con Color (Glow):** Reemplazar los box-shadows grises aburridos por sombras coloreadas difuminadas que dan un efecto "Neón suave" a los botones y elementos interactivos.
- **Micro-interacciones Fluidas:** Las animaciones no deben ser solo un `fade-in`. Usaremos animaciones tipo *spring* (rebote suave) para cuando el usuario tilda una comida, abre un modal o cambia de semana.
- **Tipografía Expresiva:** Aumentar el contraste tipográfico. Números de calorías enormes y gruesos (*bolds*), contraetiquetas muy sutiles.

### Data Visualization Mejorada:
- **Gráficos de Dona Reales animadas:** El arco de calorías debe tener bordes redondeados perfectos (`stroke-linecap="round"`), brillar cuando se llena, y acompañarse de un anillo secundario para las calorías quemadas.
- **Tarjetas de Macros Independientes:** Sacar proteína/grasa/carbs de "barritas de progreso" planas a tarjetas cuadradas individuales 3D (estilo widgets de iOS 18) en una grilla interactiva.

---

## ⚡ 2. Features Premium de Nivel Top (Funcionalidades AAA)

Para que la app *se sienta* cara y justifique su uso diario:

### 2.1 Flujo de "Generación de Receta" (IA On-Demand)
En vez de solo listar "Avena con frutas", el usuario debe poder hacer **click en la tarjeta de la comida** y que se abra una pantalla completa (Bottom Sheet / Modal deslizable) que le muestre:
- Foto (Generada dinámicamente o con un placeholder AAA vibrante).
- Tiempo de preparación.
- Lista de ingredientes *exacta* para esa porción.
- Instrucciones paso a paso.

### 2.2 Modal V2 de "Swap Meal" (Cambiazo con Swipes)
Cuando tocas el ícono de "Cambiar comida", se abre una interfaz tipo "Tinder":
- La IA te da 3 opciones de comidas alternativas que encajan en esos mismos macros (Ej: Si no querías avena, te ofrece *Huevos revueltos fit* o *Pancakes de proteína*).
- El usuario "swipea" la que le gusta y la dieta se actualiza automáticamente.

### 2.3 Onboarding Experiencial (Formulario V2)
El formulario de ingreso actual es funcional pero aburrido. Lo transformaremos en un **Onboarding Step-by-Step** tipo Noom o MyFitnessPal.
- Pantalla a pantalla, con animaciones y botones inmensos para elegir el objetivo (Perder peso, Ganar Músculo).
- Integración de emojis 3D de alta calidad para cada selección (Ej: 🥑 para dieta Keto).

### 2.4 Panel de Estadísticas Semanal
Un dashboard donde puedes ver cómo te fue en la semana:
- "Completaste el 80% de tus comidas."
- "Efectividad de macros: Perfecto en Proteínas, Alto en Grasas."
- Días perfectos marcados con un Fueguito (🔥 Streak).

---

## 🚀 Plan de Ejecución Inmediato (Frontend Overhaul)

Iremos construyendo esta visión en este orden:

1. **Refactorización de CSS Global ($AAA-Design-System):** Implementar los nuevos gradientes, sombras coloreadas, fuentes más audaces y animaciones tipo *spring*.
2. **Onboarding V2:** Desglosar `UserForm.jsx` en pasos interactivos y hermosos.
3. **Rediseño del Dashboard:** 
   - UI de Widgets para Macros.
   - Efecto Glow en el arco circular.
4. **Detail Meal Sheet:** Construir la vista expandida (modal) cuando haces clic en una comida para ver la receta detallada.

*(Una vez coronado este nivel estético, recién conectaremos Supabase y la IA).*
