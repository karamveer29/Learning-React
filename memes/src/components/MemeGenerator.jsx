import { useCallback, useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";

function MemeGenerator({ meme, onBack }) {
  const canvasRef = useRef(null);

  const [texts, setTexts] = useState([
    "",
    "",
  ]);

  const [fontSize, setFontSize] = useState(42);

  const [textColor, setTextColor] = useState("#ffffff");

  const [strokeColor, setStrokeColor] = useState("#000000");

  const [isGenerating, setIsGenerating] = useState(false);

  const updateText = (index, value) => {
    setTexts((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addText = () => {
    setTexts((prev) => [...prev, ""]);
  };

  const removeText = (index) => {
    setTexts((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || !meme) return;

    const ctx = canvas.getContext("2d");

    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height
      );

      const actualFontSize = Math.max(
        20,
        Math.round(
          fontSize *
            (image.width / 500)
        )
      );

      ctx.font = `bold ${actualFontSize}px Impact, Arial`;

      ctx.textAlign = "center";

      ctx.textBaseline = "top";

      ctx.fillStyle = textColor;

      ctx.strokeStyle = strokeColor;

      ctx.lineWidth = Math.max(
        3,
        actualFontSize / 12
      );

      texts.forEach((text, index) => {
        if (!text.trim()) return;

        const y =
          index === 0
            ? 20
            : index === 1
            ? image.height -
              actualFontSize -
              30
            : 20 +
              index *
                (actualFontSize + 20);

        const x = image.width / 2;

        ctx.strokeText(
          text.toUpperCase(),
          x,
          y
        );

        ctx.fillText(
          text.toUpperCase(),
          x,
          y
        );
      });
    };

    image.onerror = () => {
      console.error(
        "Unable to load meme image."
      );
    };

    image.src = meme.url;
  }, [fontSize, meme, strokeColor, textColor, texts]);

  useEffect(() => {
    drawMeme();
  }, [drawMeme]);

  const downloadMeme = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const link =
        document.createElement("a");

      link.download =
        `${meme.name}-meme.png`;

      link.href =
        canvas.toDataURL("image/png");

      link.click();

      setIsGenerating(false);
    }, 300);
  };

  if (!meme) return null;

  return (
    <section
      className="generator"
      id="generator"
    >
      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back to Templates
      </button>

      <div className="generator-container">

        {/* LEFT SIDE */}

        <div className="editor">

          <h2>Create Your Meme</h2>

          <p className="selected-name">
            {meme.name}
          </p>

          <div className="controls">

            <label>
              Meme Text
            </label>

            {texts.map(
              (text, index) => (
                <TextInput
                  key={index}
                  value={text}
                  placeholder={
                    index === 0
                      ? "Top text"
                      : index === 1
                      ? "Bottom text"
                      : `Text ${index + 1}`
                  }
                  onChange={(value) =>
                    updateText(
                      index,
                      value
                    )
                  }
                  onRemove={() =>
                    removeText(index)
                  }
                  canRemove={
                    texts.length > 2
                  }
                />
              )
            )}

            <button
              className="add-text-btn"
              onClick={addText}
            >
              + Add Text
            </button>

            <div className="setting">
              <label>
                Font Size
              </label>

              <input
                type="range"
                min="20"
                max="80"
                value={fontSize}
                onChange={(e) =>
                  setFontSize(
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="setting">
              <label>
                Text Color
              </label>

              <input
                type="color"
                value={textColor}
                onChange={(e) =>
                  setTextColor(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="setting">
              <label>
                Outline Color
              </label>

              <input
                type="color"
                value={strokeColor}
                onChange={(e) =>
                  setStrokeColor(
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          <button
            className="generate-btn"
            onClick={downloadMeme}
            disabled={isGenerating}
          >
            {isGenerating
              ? "Generating..."
              : "Generate & Download"}
          </button>

        </div>

        {/* RIGHT SIDE */}

        <div className="preview">

          <h3>Preview</h3>

          <div className="canvas-container">
            <canvas
              ref={canvasRef}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default MemeGenerator;