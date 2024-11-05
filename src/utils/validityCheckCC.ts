import { StringSchema, Schema } from 'yup';

const valid = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

function validityCheckCC(this: Schema<any>, message: string) {
  return (this as StringSchema).test('validityCheckCC', message, function (
    value
  ) {
    const { path, createError } = this;
    if (typeof value === 'undefined') {
      return createError({ path, message: `error.cardNumberIsRequired` });
    }
    let len = value.length;
    let bit = 1;
    let sum = 0;
    let val;

    while (len) {
      val = parseInt(value.charAt(--len), 10);

      sum += (bit ^= 1) ? valid[val] : val;
    }

    return sum && sum % 10 === 0
      ? value
      : createError({ path, message: `error.cardNumberIsInvalid` });
  });
}
export default validityCheckCC;
