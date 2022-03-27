import DatePicker from "react-date-picker";
import TextInput from "./TextInput";

type CalendarInputProps = {
  placeholder: string;
  className?: string;
};

export default function CalendarInput(props: CalendarInputProps) {
  return (
    <TextInput
      prefixIcon="calendar"
      suffixIcon="dropdown"
      editable={false}
      suffixIconOnClick={() => alert("hey")}
      className={props.className}
      placeholder={props.placeholder}
    ></TextInput>
  );
}
