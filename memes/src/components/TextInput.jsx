function TextInput({
  value,
  onChange,
  placeholder,
  onRemove,
  canRemove,
}) {
  return (
    <div className="text-input-row">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {canRemove && (
        <button
          className="remove-btn"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default TextInput;