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
 * from 0 to 10: [0...10]
 * from 10 to 99: [10...99]
 * from 100 to 999: [100...999]
 */
function get_random_int(range) {
    var numbers = range.split(',');
    if (numbers.length < 2) {
        alert("get_random_int error: wrong range format '" + range + "'");
        return;
    }

    var minum = parseInt(numbers[0]);
    var maxum = parseInt(numbers[1]);

    return Math.floor(Math.random() * (maxum - minum + 1)) + minum;
}

/*
    usage: 
*/
export function generate_2digit_task_from_array(array) {
    // console.log("generate_2digit_task_from_array:: " + array);
    return generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
}

/*
    usage example:
        generate_rnd_task('+', '0,9', '0,9', 1, 1) - sum of one figit numbers
        generate_rnd_task('+-', '0,10', '0,10', 10, 10) - sum/sub of tens
        generate_rnd_task('+-*', '0,10', '0,10') - sum/sub/mul of one digit numbers
*/
export function generate_2digit_task(operations, range_number_1, range_number_2, factor_1, factor_2) {
    var operation = '';
    if (operations.length === 1) {
        operation = operations;
    } else {
        var array = operations.split('');
        operation = array[Math.floor(Math.random() * (array.length))];
    }
        
    var num_1 = 0, num_2 = 0, res = 0, tmp = 0;
    switch (operation) {
        case OPERATION_SUM:
            num_1 = parseInt(get_random_int(range_number_1) * factor_1);
            num_2 = parseInt(get_random_int(range_number_2) * factor_2);
            res = num_1 + num_2;
        break;

        case OPERATION_SUB:
            num_1 = parseInt(get_random_int(range_number_1) * factor_1);
            num_2 = parseInt(get_random_int(range_number_2) * factor_2);
            // swap numbers if first less than second
            if (num_1 < num_2) {
                tmp = num_1; num_1 = num_2; num_2 = tmp;
            }
            res = num_1 - num_2;
        break;

        case OPERATION_MUL:
            num_1 = parseInt(get_random_int(range_number_1) * factor_1);
            num_2 = parseInt(get_random_int(range_number_2) * factor_2);
            res = num_1 * num_2;
        break;

        case OPERATION_DIV: // /
            res = parseInt(get_random_int(range_number_1) * factor_1);
            num_2 = parseInt(get_random_int(range_number_2) * factor_2);
            num_1 = num_2 * res;

        break;

        case OPERATION_GREATER: // >
            num_1 = parseInt(get_random_int(range_number_1) * factor_1);
            num_2 = parseInt(get_random_int(range_number_2) * factor_2);
            if (num_1 < num_2) {
                tmp = num_1; num_1 = num_2; num_2 = tmp;
            }
            res = '>';
        break;

        case OPERATION_SMALLER: // <
            num_1 = parseInt(get_random_int(range_number_1) * factor_1);
            num_2 = parseInt(get_random_int(range_number_2) * factor_2);
            if (num_1 > num_2) {
                tmp = num_1; num_1 = num_2; num_2 = tmp;
            }
            res = '<';
        break;

        case OPERATION_EQUALLY: // =
            num_1 = parseInt(get_random_int(range_number_1) * factor_1);
            num_2 = num_1; res = '=';
        break;

        default:
            alert("RND generator error: Unknown math operation '" + operation + "'");
        break;
      }

      if ((operation === OPERATION_SUM) || (operation === OPERATION_MUL)) {
          // randomNumber is true => swap num_1 & num_2
          var randomNumber = Math.random() >= 0.5;
          if (randomNumber) {
              tmp = num_1; num_1 = num_2; num_2 = tmp;
          }
      }

      var return_value = {'number_1': num_1,
                          'number_2': num_2,
                          'operation': operation,
                          'result': res};

      console.log("generate_2digit_task:: "
                  + return_value.number_1
                  + return_value.operation
                  + return_value.number_2
                  + "=" + return_value.result);

      return return_value;
}
