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

/*
    usage:
        '+,0-10,0-10,1,1'
        '+-,0-10,0-10,10,10'
        '+-,0-100,0-10,10,10'
    result:
        '+-,0-10,1' -> ['+-', '0-10', '1']
*/
export function generate_2digit_task_from_string(task_string) {
    console.log('generate_2digit_task_from_string ' + task_string);
    var array = task_string.split(',');
    return generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
}

/*
    usage:
        '+-,0-10,1'
    result:
        '+-,0-10,1' -> ['+-', '0-10', '1']
*/
export function generate_3digit_task_from_string(task_string) {
    console.log('generate_3digit_task_from_string ' + task_string);
    var array = task_string.split(',');
    return generate_3digit_task(array[0], array[1], array[2]);
}

/*
    usage:
        '<>=,0-10,1'
    result:
        '<>=,0-10,1' -> ['<>=', '0-10', '1']
*/
export function generate_comparison_task_from_string(task_string) {
    console.log('generate_comparison_task_from_string ' + task_string);
    var array = task_string.split(',');
    return generate_comparison_task(array[0], array[1], array[2]);
}

function generate_3digit_task(operations, range_numbers, factor=1) {
    var operation_1 = get_random_operation(operations);
    var operation_2 = get_random_operation(operations);

    var number_1 = 0, number_2 = 0, number_3 = 0, result = 0;
    number_1 = parseInt(get_random_int(range_numbers) * factor);
    number_2 = parseInt(get_random_int(range_numbers) * factor);
    if (operation_1 === OPERATION_SUM) {
        result = number_1 + number_2;

    } else if (operation_1 === OPERATION_SUB) {
        if (number_1 < number_2) {
            var tmp = number_1;
            number_2 = number_1;
            number_1 = tmp;
        }
        result = number_1 - number_2;

    } else if (operation_1 === OPERATION_MUL) {
        result = number_1 * number_2;
    }

    number_3 = parseInt(get_random_int(range_numbers) * factor);
    if (operation_2 === OPERATION_SUM) {
        result = result + number_3;

    } else if (operation_2 === OPERATION_SUB) {
        if (result < number_3) {
            if (result > 0) {
                number_3 = result - 1;
            } else {
                number_3 = result;
            }
        }
        result = result - number_3;
        console.log("result " + result + ", number_3 " + number_3);

    } else if (operation_2 === OPERATION_MUL) {
        result = result * number_3;
    }

    var return_value = {'task': number_1.toString() + ' ' + operation_1.toString()
                        + ' ' + number_2.toString() + ' ' + operation_2.toString()
                        + ' ' + number_3.toString()+ ' = ',
                       'result': result.toString()};

    console.log('generate_3digit_task:: ' + return_value.task + '=' + return_value.result);
    return return_value;
}

/*
    usage example:
        generate_2digit_task('+', '0,9', '0,9', 1, 1) - sum of one figit numbers
        generate_2digit_task('+-', '0,10', '0,10', 10, 10) - sum/sub of tens
        generate_2digit_task('+-*', '0,10', '0,10') - sum/sub/mul of one digit numbers
*/
function generate_2digit_task(operations, range_1, range_2, factor_1=1, factor_2=1) {
    var operation = get_random_operation(operations);
    var number_1 = 0, number_2 = 0, result = 0;
    switch (operation) {
        case OPERATION_SUM:
            number_1 = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            result = number_1 + number_2;
        break;

        case OPERATION_SUB:
            number_1 = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            // swap numbers if first less than second
            if (number_1 < number_2) {
                var tmp = number_1;
                number_1 = number_2;
                number_2 = tmp;
            }
            result = number_1 - number_2;
        break;

        case OPERATION_MUL:
            number_1 = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            result = number_1 * number_2;
        break;

        case OPERATION_DIV: // /
            result = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            number_1 = number_2 * result;

        break;

        default:
            alert("RND generator error: Unknown math operation '" + operation + "'");
        break;
    }

    if ((operation === OPERATION_SUM) || (operation === OPERATION_MUL)) {
        // randomNumber is true => swap number_1 & number_2
        var randomNumber = Math.random() >= 0.5;
        if (randomNumber) {
            tmp = number_1; number_1 = number_2; number_2 = tmp;
        }
    }

    var return_value = {'number_1': number_1.toString(),
                        'number_2': number_2.toString(),
                        'operation': operation.toString(),
                        'result': result.toString()};

    console.log("generate_2digit_task:: "
                + return_value.number_1
                + return_value.operation
                + return_value.number_2
                + "=" + return_value.result);

    return return_value;
}

function generate_comparison_task(operations, range, factor=1) {
    var operation = get_random_operation(operations);
    var expression_1 = 0, expression_2 = 0;
    switch (operation) {
        case OPERATION_GREATER: // >
            while ((expression_1 < expression_2) || (expression_1 === expression_2)) {
                expression_1 = parseInt(get_random_int(range) * factor);
                expression_2 = parseInt(get_random_int(range) * factor);
            }
        break;

        case OPERATION_SMALLER: // <
            while ((expression_2 < expression_1) || (expression_1 === expression_2)) {
                expression_1 = parseInt(get_random_int(range) * factor);
                expression_2 = parseInt(get_random_int(range) * factor);
            }
        break;

        case OPERATION_EQUALLY: // =
            expression_1 = parseInt(get_random_int(range) * factor);
            expression_2 = expression_1;
        break;

        default:
            alert("RND generator error: Unknown math operation '" + operation + "'");
        break;
    }

    var return_value = {'expression_1': expression_1.toString(),
                        'expression_2': expression_2.toString(),
                        'operation': operation.toString()};

    console.log("generate_comparison_task:: "
                + return_value.expression_1
                + return_value.operation
                + return_value.expression_1);

    return return_value;
}

/**
 * @range should be specified with dash: 0-10, 0-100 etc.
 * Returns a random number between min (inclusive) and max (inclusive)
 * from 0 to 10: [0...10]
 * from 10 to 99: [10...99]
 * from 100 to 999: [100...999]
 */
function get_random_int(range) {
    var numbers = range.split('-');
    if (numbers.length < 2) {
        alert("get_random_int error: wrong range format '" + range + "'");
        return;
    }

    var minum = parseInt(numbers[0]);
    var maxum = parseInt(numbers[1]);

    return Math.floor(Math.random() * (maxum - minum + 1)) + minum;
}

/**
 * @operations should be specified one by one in string: '+-*' or '<>='
 * Returns random operation from string
 */
function get_random_operation(operations) {
    var operation = '';
    if (operations.length === 1) {
        operation = operations;
    } else {
        var array = operations.split('');
        operation = array[Math.floor(Math.random() * (array.length))];
    }
    return operation;
}
