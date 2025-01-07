import "../../switch.css";

type SwitchMode = {
  switchMode: () => void;
};

export const SwitchButton: React.FC<SwitchMode> = (props) => {
  return (
    <>
      <label className="theme focus:outline-none" onClick={props.switchMode}>
        <input className="input" type="checkbox" />
      <img src="/uno_logo.svg" />
      </label>
    </>
  );
};
