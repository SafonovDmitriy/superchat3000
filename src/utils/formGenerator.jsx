import { Box, Button, TextField } from "@material-ui/core";
// example form with one field
// form:[{
//     name: String(*),
//     value: String(*),
//     group:Number
//     validationFunc: [{ func: func, message: String,any:{anyPropsForValidation} }],
//     any: { anyProps },
//  }]

// example titleGroups:{
// [numberGroun]:String
// }

const formGenerator = ({
  form = [],
  error = {},
  setValue = () => {},
  setError = () => {},
  className = {},
  submitProps = {},
  submitText,
  titleGroups = {},
  onSubmit = () => {},
}) => {
  const _formJSX = [];
  const _groupFieldsJSX = {};
  const createField = (field) => (
    <TextField
      key={field.name}
      name={field.name}
      value={field.value}
      error={!!error[field.name]}
      helperText={error[field.name]}
      onChange={changeFieldHendler}
      {...field.any}
    />
  );
  const onSubmitHendler = (e) => {
    e.preventDefault();
    validationField();
    const _form = {};
    form.forEach((item) => {
      Object.assign(_form, { [item.name]: item.value });
    });
    onSubmit(_form);
  };

  const validationField = (_form = form) => {
    let _errors = { ...error };
    for (const field of _form) {
      if (field.validationFunc) {
        for (const valid of field.validationFunc) {
          valid.func(field.value, { ...valid.any })
            ? Object.assign(_errors, { [field.name]: valid.message })
            : Object.assign(_errors, { [field.name]: "" });
        }
      }
    }
    setError(_errors);
  };

  const changeFieldHendler = (e) => {
    let indexChangesItem;
    const _form = form.map((item, idx) => {
      if (item.name === e.target.name) {
        indexChangesItem = idx;
        return { ...item, value: e.target.value };
      }
      return item;
    });

    validationField([_form[indexChangesItem]]);
    setValue(_form);
  };

  for (const field of form) {
    let numberGroup = field.group || 100;
    if (!_groupFieldsJSX[numberGroup]) {
      _groupFieldsJSX[numberGroup] = [];
    }
    _groupFieldsJSX[numberGroup].push(createField(field));
  }

  for (const key in _groupFieldsJSX) {
    if (key !== 100) {
      _formJSX.push(
        <Box key={key}>
          <h2>{titleGroups[key]}</h2>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            {_groupFieldsJSX[key].map((item) => item)}
          </Box>
        </Box>
      );
    } else {
      _formJSX.push(_groupFieldsJSX[key].map((item) => item));
    }
  }

  return form.length ? (
    <form className={className} onSubmit={onSubmitHendler}>
      {_formJSX}
      {submitText && (
        <Button type="submit" {...submitProps}>
          {submitText}
        </Button>
      )}
    </form>
  ) : null;
};
export default formGenerator;
