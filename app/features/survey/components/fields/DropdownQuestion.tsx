import { Picker } from "@react-native-picker/picker"

export const DropdownQuestion = ({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (val: string) => void
}) => {
  return (
    <Picker selectedValue={value} onValueChange={onChange}>
      <Picker.Item label="Select an option..." value="" />
      {options.map((opt) => (
        <Picker.Item key={opt} label={opt} value={opt} />
      ))}
    </Picker>
  )
}
