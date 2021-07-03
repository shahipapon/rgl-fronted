import {
  checkbox,
  dateTimePicker,
  dropDown,
  input,
  radioButton
} from "./components";

const DesignerComponent = {
  item_checkbox: checkbox,
  item_input: input,
  item_RadioButton: radioButton,
  item_DropDown: dropDown,
  item_Date: dateTimePicker,
};

export default function ComponentMapper({ rows }) {
  const Component = DesignerComponent[rows];
  return (
    <>
          <Component />
    </>
  );
}
