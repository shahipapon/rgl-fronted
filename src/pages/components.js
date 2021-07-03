function handleChange(e) {
  console.log(e?.target?.value ? e.target.value : e);
}

function input() {
  return (
    <input
      type="text"
      placeholder="enter your text"
      className="border-2 border-gray-500 w-36	"
      onChange={handleChange}
    />
  );
}

function opt() {
  return (
    <select onChange={handleChange}>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
      <option value="Option 4">Option 4</option>
    </select>
  );
}

function checkbox() {
  return (
    <>
      <input type="checkbox" name="vehicle1" value="Bike" />
      <label for="vehicle1"> Checkbox 1 </label>
      <input type="checkbox" name="vehicle2" value="Car" />
      <label for="vehicle2"> Checkbox 2 </label>
      <input type="checkbox" name="vehicle3" value="Boat" checked />
      <label for="vehicle3"> Checkbox 3 </label>
    </>
  );
}

export { input, opt, checkbox };

