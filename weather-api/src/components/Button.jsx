const Button = (props) => {
    return (
        <button
            className="btn"
            disabled={props.disabled}
            onClick={props.onClick}
            type={props.type || "button"}
        >
            {props.value}
        </button>
    );
};

export default Button;
