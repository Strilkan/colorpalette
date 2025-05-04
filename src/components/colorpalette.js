import React, { useState } from "react";
import "./CSS/colorpalette.css"; // Ensure the file name matches exactly (spelling is correct)

const generateRandomColor = () => {
  const letters = "0123456789abcdef";
  return (
    "#" +
    Array.from({ length: 6 })
      .map(() => letters[Math.floor(Math.random() * 16)])
      .join("")
  );
};

const generatePalette = () => {
  return Array.from({ length: 8 }, generateRandomColor);
};

const ColorPalette = () => {
  const [palettes, setPalettes] = useState([]);
  const [openStates, setOpenStates] = useState([]);

  const addPalette = () => {
    setPalettes([...palettes, generatePalette()]);
    setOpenStates([...openStates, true]);
  };

  const deletePalette = (index) => {
    setPalettes(palettes.filter((_, i) => i !== index));
    setOpenStates(openStates.filter((_, i) => i !== index));
  };

  const togglePalette = (index) => {
    const newStates = [...openStates];
    newStates[index] = !newStates[index];
    setOpenStates(newStates);
  };

  return (
    <div className="app">
      <button className="generate-button" onClick={addPalette}>
        Generate 8-Color Palette
      </button>
      <div className="palettes">
        {palettes.map((palette, index) => (
          <div key={index} className="palette">
            <div
              className="palette-header"
              onClick={() => togglePalette(index)}
            >
              <span className={`arrow ${openStates[index] ? "open" : ""}`}>
                ▶
              </span>
              <h3>Palette {index + 1}</h3>
            </div>

           
            {openStates[index] && (
              <div className="colors">
                {palette.map((color, i) => (
                  <div
                    key={i}
                    className="color"
                    style={{ backgroundColor: color }}
                  >
                    <span>{color}</span>
                  </div>
                ))}
              </div>
            )}

            
            <button
              className="delete-button"
              onClick={() => deletePalette(index)}
            >
              Delete Palette
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
