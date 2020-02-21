﻿/** @const {string} */
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
 * Task generation from type and settings
 */
export function generate_task(type, settings) {
    console.log('generate_task ' + type + ', settings ' + settings);
    var array = settings.split(',');

    // depends from type, result may have different properties
    var task, result = {};

    // 2 numbers task, like: 1 + 2 = 3
    if (type === '2digit') {
        task = generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
        result = {'expr1': task.number_1 + ' ' + task.operation
                  + ' ' + task.number_2 + ' = ', 'result': task.result};
        console.log('generate_task: ' + result.expr1 + '' + result.result);

    // 3 numbers task: 1 + 2 + 3 = 6
    } else if (type === '3digit') {
        result = generate_3digit_task(array[0], array[1], array[2]);
        console.log('generate_task: ' + result.expr1 + result.result);

    } else if (type === '2digit_arg') {
        result = generate_2digit_task_arguments_from_string(task);

    // sequence digits like, 1,2,3,4 or 8,7,6,5 etc.
    } else if (type === 'linedigit') {
        return generate_sequence_task(task);

    // comparision digits, 5 < 6
    } else if (type === 'comp_dig') {
        return generate_comparison_digits_from_string(task);

    // comparision expressions, 2+3 vs 9-3 (<>=)
    } else if (type === 'comp_exp') {
        return generate_comparison_expressions_from_string(task);

    // operation determination tasks 1 ? 2 = 3
    } else if (type === 'op') {
        return operation_task(task);

    // undefined tasks, will return error
    } else {
        result = 'generate_task_from_string: wrong type and task';
    }

    return result;
}

/*
    usage:
        '0-10', '10-100', etc.
    result:
        '+-,0-10,1' -> ['+-', '0-10', '1']
*/
function generate_sequence_task(range) {
    var number = parseInt(get_random_int(range));
    var task, result;
    if (number > 3) {
        // randomNumber is true => goes down
        var randomNumber = Math.random() >= 0.5;
        if (randomNumber) {
            task = number.toString() + ' , ' + (number-1).toString() + ' , ' + (number-2).toString();
            result = (number-3).toString();
        } else {
            task = number.toString() + ' , ' + (number+1).toString() + ' , ' + (number+2).toString();
            result = (number+3).toString();
        }
    } else {
        task = number.toString() + ' , ' + (number+1).toString() + ' , ' + (number+2).toString();
        result = (number+3).toString();
    }

    console.log('generate_numbers_task_from_string:: ' + task + ', ' + result);
    return {'task': task + ' , ', 'result': result};
}

function operation_task(task_string) {
    console.log('operation_task ' + task_string);
    var array = task_string.split(',');
    var task = generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
    var result = {'expr1': task.number_1.toString(),
                  'expr2': task.number_2.toString() + ' = ' + task.result.toString(),
                  'result': task.operation.toString()};
    console.log("operation_task:: " + result.expr1 + result.result + result.expr2);
    return result;
}

function generate_2digit_task_arguments_from_string(task_string) {
    // console.log('generate_2digit_task_from_string ' + task_string);
    var array = task_string.split(',');
    return generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
}

/*
    usage:
        '<>=,0-10,1'
    result:
        '<>=,0-10,1' -> ['<>=', '0-10', '1']
*/
function generate_comparison_digits_from_string(task_string) {
    // console.log('generate_comparison_digits_from_string ' + task_string);

    var array = task_string.split(',');
    var operations = array[0], range = array[1], factor = parseInt(array[2]);
    var operation = get_random_operation(operations);

    var expr1 = '', expr2 = '';
    switch (operation) {
        case OPERATION_GREATER: // >
            while ((expr1 < expr2) || (expr1 === expr2)) {
                expr1 = get_random_int(range) * factor;
                expr2 = get_random_int(range) * factor;
            }
        break;

        case OPERATION_SMALLER: // <
            while ((expr2 < expr1) || (expr1 === expr2)) {
                expr1 = get_random_int(range) * factor;
                expr2 = get_random_int(range) * factor;
            }
        break;

        case OPERATION_EQUALLY: // =
            expr1 = expr2 = get_random_int(range) * factor;
        break;

        default:
            console.log("ERROR: generate_comparison_digits_from_string: unknown math operation '" + operation + "'");
        break;
    }

    var task = {'expr1': expr1, 'expr2': expr2, 'result': operation};
    console.log("generate_comparison_digits_from_string:: " + task.expr1 + task.result + task.expr2);

    return task;
}

// 111
/*
 * usage: <>=,+-,0-10,1
 * 
 */
function generate_comparison_expressions_from_string(task_string) {
    console.log('generate_comparison_expressions_from_string ' + task_string);
    var array = task_string.split(',');

    // generate_2digit_task('+', '0,9', '0,9', 1, 1) - sum of one digit numbers
    var task1 = generate_2digit_task(array[1], array[2], array[2], array[3], array[3]);
    var expr1 = task1.number_1 + ' ' + task1.operation + ' ' + task1.number_2;
    var task2 = generate_2digit_task(array[1], array[2], array[2], array[3], array[3]);
    var expr2 = task2.number_1 + ' ' + task2.operation + ' ' + task2.number_2;

    var operation = '', num1 = parseInt(task1.result), num2 = parseInt(task2.result);
    if (num1 > num2) { operation = '>'; }
    else if (num1 < num2) { operation = '<'; }
    else { operation = '='; }

    var task = {'expr1': expr1, 'expr2': expr2, 'result': operation};
    console.log("generate_comparison_expressions_from_string:: " + task.expr1 + task.result + task.expr2);
    return task;
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

    var task = {'expr1': number_1.toString() + ' ' + operation_1.toString()
                + ' ' + number_2.toString() + ' ' + operation_2.toString()
                + ' ' + number_3.toString()+ ' = ', 'result': result.toString()};
    return task;
}

/*
    usage example:
        generate_2digit_task('+', '0,9', '0,9', 1, 1) - sum of one digit numbers
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

    var task = {'number_1': number_1.toString(),
                'operation': operation.toString(),
                'number_2': number_2.toString(),
                'result': result.toString()};
    console.log("generate_2digit_task:: " + task.number_1 + task.operation + task.number_2 + '=' + task.result);
    return task;
}

/**
 * @range should be specified with dash: 0-10, 0-100 etc.
 * Returns a random number between min (inclusive) and max (inclusive)
 * from 0-10: [0...10]
 * from 10-99: [10...99]
 * from 100-999: [100...999]
 * from 1-100: [1...100]
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
