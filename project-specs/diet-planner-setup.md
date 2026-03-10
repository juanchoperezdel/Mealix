# Project Specification: Diet Planner Web App

## Goal
A high-quality web application where users provide their personal information, goals, and constraints to receive a highly personalized, science-based 30-day meal plan created by AI.

## Core Features
1. **User Input Dashboard/Form**:
   - Primary Goal (Weight loss, Muscle gain, Maintenance, Recomp).
   - Monthly Budget (Approximate spend limits).
   - Allergies / Intolerances (e.g., Peanuts, Dairy, Gluten).
   - Dietary Preferences (Standard, Vegan, Vegetarian, Keto, Paleo, etc.).
   - Meals per day (numeric input, e.g., 3, 4, 5).
   - Detailed free-text preferences.
2. **AI Diet Generation**:
   - The system interprets the inputs and curates a 30-day plan.
   - Must be nutritionist quality.
   - For each meal, it should provide a recipe, ingredients, or a link/reference to how to prepare it.
3. **Results Display**:
   - User-friendly, beautiful presentation of the diet.
   - Organized by weeks/days.

## Technical Architecture
- **Frontend Stack**: React (Vite) + Vanilla CSS. Must look premium and utilize modern UI patterns.
- **Backend/AI Logic**: A service file that structures a prompt and communicates with an LLM SDK to fetch the JSON structure of the diet.

## Constraints
- Focus on creating a solid frontend layout and the prompt structure to interface with an AI.
- The UI must NOT be a simple MVP; it requires a curated color palette and micro-interactions.
