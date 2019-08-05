export default {
  errorStyle: {},
  errorText: '',
  hintText: '',
  selectionsRenderer: function selectionsRenderer (values, hintText) {
    if (!values) return hintText;
    const value = values.value;
    const label = values.label;

    if (Array.isArray(values)) {
      return values.length
        ? values
          .map(function (_ref) {
            const value = _ref.value;
            const label = _ref.label;
            return label || value;
          })
          .join(', ')
        : hintText;
    } else if (label || value) return label || value;
    else return hintText;
  },
  underlineErrorStyle: {},
};
