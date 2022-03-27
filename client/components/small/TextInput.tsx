import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faAngleDown,
  faSearch,
  faLocation,
  faCalendar,
  faMapMarker,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

type TextInputProps = {
  placeholder: string;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string;
  onClick?: any;
  onChange?: any;
  editable?: boolean;
  suffixIconOnClick?: any;
};

function getIcon(icon: string) {
  return (
    {
      coffee: faCoffee,
      dropdown: faAngleDown,
      search: faSearch,
      calendar: faCalendar,
      location: faLocation,
      marker: faMapMarker,
      map: faMap,
    }[icon] || faCoffee
  );
}

export default function TextInput(props: TextInputProps) {
  const editable = props.editable === undefined ? true : props.editable;
  return (
    <div className={`input-text flex ${props.className}`}>
      {props.prefixIcon ? (
        <FontAwesomeIcon
          className="w-5 h-5 mt-3"
          icon={getIcon(props.prefixIcon)}
        />
      ) : (
        <></>
      )}
      <input
        type="text"
        className={`input-text ${props.className}`}
        placeholder={props.placeholder}
        readOnly={!editable}
        onChange={props.onChange}
        onClick={props.onClick}
      ></input>
      {props.suffixIcon ? (
        <FontAwesomeIcon
          onClick={props.suffixIconOnClick}
          className={`w-5 h-5 mt-3 ${
            props.suffixIconOnClick ? "cursor-pointer" : ""
          }`}
          icon={getIcon(props.suffixIcon)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
