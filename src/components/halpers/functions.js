/** @const {string} */
var OPERATION_SUM = '+';
/** @const {string} */
var OPERATION_SUB = '-';
/** @const {string} */
var OPERATION_MUL = '*';
/** @const {string} */
var OPERATION_DIV = '/';

/** @const {string} */
var OPERATION_GREATER = '>';
/** @const {string} */
var OPERATION_SMALLER = '<';
/** @const {string} */
var OPERATION_EQUALLY = '=';

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 *
 * [0...9], [10...99], [100...999]
 */
function get_rnd_int(int_min, int_max) {
    return Math.floor(Math.random() * (int_max - int_min + 1)) + int_min;
}

/*
    usage example:
        generate_rnd_task('+', '0,9')
        generate_rnd_task('+-', '0,10')
        generate_rnd_task('+-', '0,100')
*/
export function generate_rnd_task(operations, range) {
    var numbers = range.split(',');
    if (numbers.length < 2) {
        alert("RND generator error: wrong range numbers format '" + range + "'");
        return;
    }

    var operation = '';
    if (operations.length === 1) {
        operation = operations;
    } else {
        var array = operations.split('');
        operation = array[get_rnd_int(0, array.length-1)];
    }
        
    var minum = parseInt(numbers[0]);
    var maxum = parseInt(numbers[1]);
    var factor_1 = '1', factor_2 = '1';
    if (numbers.length === 4) {
        if ((numbers[2].indexOf('=') !== -1) ||
            (numbers[3].indexOf('=') !== -1)) {
            factor_1 = numbers[2]; factor_2 = numbers[3];
        } else {
            factor_1 = numbers[2];
            factor_2 = numbers[3];
        }
    }

    var num_1 = 0, num_2 = 0, res = 0;
    switch (operation) {
        case OPERATION_SUM:
            num_1 = parseInt(get_rnd_int(minum, maxum) * factor_1);
            num_2 = parseInt(get_rnd_int(minum, maxum) * factor_2);
            res = num_1 + num_2;
        break;

        case OPERATION_SUB:
            // if operation is '-' (minus), the first number should be
            // >= second, i.e. result should not be negative
            if (minum >= maxum) {
                alert("RND generator error: wrong MAX and MIN ranges '" + range + "'");
                return;
            } else {
                // generate numbers first and only AFTER that * factor
                num_2 = get_rnd_int(minum, maxum);
                num_1 = get_rnd_int(num_2, maxum);

                num_1 = parseInt(num_1 * factor_1);
                num_2 = parseInt(num_2 * factor_2);

                res = num_1 - num_2;
            }
        break;

        case OPERATION_MUL:
            // =10 means that num_1=10, i.e. first number should be exactly 10
            if (factor_1.indexOf('=') !== -1) {
              num_1 = factor_1.substr(1, factor_1.length);
            } else {
              num_1 = parseInt(get_rnd_int(minum, maxum) * factor_1);
            }

            if (factor_2.indexOf('=') !== -1) {
              num_2 = factor_2.substr(1, factor_2.length);
            } else {
              // 'yellow_1': [TYPE_MO, '*', '0,9,1,=10', 'result', 10, 'game'],
              // 'yellow_2': [TYPE_MO, '*', '0,3', 'result', 10, 'game'],
              // 'yellow_3': [TYPE_MO, '*', '0,7', 'result', 10, 'game'],
              // 'yellow_4': [TYPE_MO, '*', '0,10', 'result', 10, 'game'],
              // 'yellow_5': [TYPE_MO, '/', '0,9,10,=10', 'result', 10, 'game'],
              // 'yellow_6': [TYPE_MO, '/', '1,3', 'result', 10, 'game'],
              // 'yellow_7': [TYPE_MO, '/', '1,7', 'result', 10, 'game'],
              // 'yellow_8': [TYPE_MO, '/', '1,10', 'result', 10, 'game'],
              // 'yellow_9': [TYPE_CO, '*/', '0,9', 'operation', 10, 'game'],
              // 'yellow_10': [TYPE_MO, '*', '1,10', 'number_2', 10, 'game'],
              // 'yellow_11': [TYPE_MO, '/', '1,10', 'number_2', 10, 'game'],
              // 'yellow_12': [TYPE_MO, '*/', '1,10', 'result', 10, 'game'],
              if (numbers.length === 2) {
                if (maxum < 10) {
                    maxum = 10;
                }
              }
              num_2 = parseInt(get_rnd_int(minum, maxum) * factor_2);
            }

            res = num_1 * num_2;
        break;

        case OPERATION_DIV: // /
            // =10 means that num_1=10, i.e. first number should be exactly 10
            if (factor_2.indexOf('=') !== -1) {
              num_2 = factor_2.substr(1, factor_2.length);
            } else {
              if (minum === 0) {minum=1;}
              num_2 = parseInt(get_rnd_int(minum, maxum) * factor_2);
            }

            res = parseInt(get_rnd_int(minum, maxum));
            num_1 = res * num_2;
        break;

        case OPERATION_GREATER: // >
          res = '>';
          num_1 = parseInt(get_rnd_int(minum+1, maxum) * factor_1);
          num_2 = parseInt(get_rnd_int(minum, num_1-1) * factor_2);
        break;

        case OPERATION_SMALLER: // <
          res = '<';
          num_1 = parseInt(get_rnd_int(minum, maxum-1) * factor_1);
          num_2 = parseInt(get_rnd_int(num_1+1, maxum) * factor_2);
        break;

        case OPERATION_EQUALLY: // =
          res = '=';
          num_1 = parseInt(get_rnd_int(minum, maxum) * factor_1);
          num_2 = num_1;
        break;

        default:
          alert("RND generator error: Unknown math operation '" + operation + "'");
          return;
      }

/*
      if ((operation === OPERATION_SUM) ||
          (operation === OPERATION_SUB) ||
          (operation === OPERATION_MUL) ||
          (operation === OPERATION_DIV)) {
        // randomNumber is true => swap num_1 & num_2
        var randomNumber = Math.random() >= 0.5;
        if (randomNumber) {
            var tmp = num_1; num_1 = num_2; num_2 = tmp;
        }
      }
*/
      return {'number_1': num_1,
              'number_2': num_2,
              'operation': operation,
              'result': res};
}
