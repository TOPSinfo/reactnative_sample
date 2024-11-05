const Regex = {
  Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  Alphabetic: /^[ A-Za-z'-]*$/,
  AlphaNumeric: /^[a-zA-Z0-9]+$/,
  AlphaNumericWithoutOnlyNumber:/^(?![0-9 ]+$)[A-Za-z0-9 ]*$/,
  AlphaNumericWithSpace: /^[a-zA-Z0-9 ]*$/,
  Numeric:/^\d+$/,
  Email:/^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/
};

export default Regex;
