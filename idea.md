# Project Brief: Dynamic Background Pattern Generator

## Overview
We are building an interactive background pattern and gradient generator. Unlike static pattern libraries (e.g., PatternCraft), this tool acts as a "visual mixing board." Users can select a predefined preset and dynamically tweak its variables in real-time to generate custom CSS/Tailwind code.

## Core Architecture: The Layered Engine
The background generation logic should treat backgrounds as a stack of independent layers rather than a single flat string:
* **Layer 1: The Base:** A solid color, linear gradient, or radial gradient.
* **Layer 2: The Motif:** The geometric rule or repeating shape (e.g., Grids, Dots, Waves, Zig-zags, Crosshatches).
* **Layer 3: The Modifiers (Optional):** Overlays, masks, or noise/grain effects to blend or fade the pattern.

## Key Features & User Flow
1. **Inspiration Gallery:** A landing page displaying thumbnail previews of "Smart Presets."
2. **The Sandbox (Editor):** Clicking a preset loads its specific parameters into a control panel. 
3. **Real-Time Preview:** A live canvas that updates instantly as the user adjusts controls.
4. **Code Exporter:** A compiler that translates the current state into clean, optimized, copy-pasteable code (CSS and/or Tailwind).

## Configurable Parameters (The "Knobs and Dials")
The control panel should expose the following variables for the user to manipulate:
* **Colors:** Base color(s) and Motif color(s).
* **Scale / Density:** Controls motif size or frequency of repetition.
* **Spacing / Gap:** Distance between shapes (e.g., gap between dots or grid lines).
* **Stroke Weight:** Thickness of line-based patterns.
* **Angle / Rotation:** Direction of gradients or rotation of grid axes (0–360 degrees).
* **Opacity:** Alpha transparency of the motif layer.

## Data Structure: Smart Presets
Presets should not be hardcoded CSS strings. They should be stored as lightweight configuration objects (e.g., JSON) containing the recipe of variables. 
* *Example:* `{ id: 'neon-grid', motif: 'grid', baseColor: '#000000', motifColor: '#ff00ff', scale: 40, weight: 2, opacity: 0.8 }`
* The engine will parse this object to render the preview and generate the output code.