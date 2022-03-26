type ButtonProps = {
  label: string;
  icon?: string;
  onClick?: any;
};

export default function Button(props: ButtonProps) {
  return (
    <div className="btn-primary" onClick={props.onClick}>
      {props.label}
    </div>
  );
}
