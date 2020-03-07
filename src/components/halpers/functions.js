/** @const {string} */
var OPERATION_SUM = '+';
/** @const {string} */
var OPERATION_SUB = '-';
/** @const {string} */
var OPERATION_MUL = '*';
/** @const {string} */
var OPERATION_DIV = '/';

/*
 * Task generation from type and settings
 */
export function generate_task(type, settings) {
    // console.log('generate_task ' + type + ', settings ' + settings);
    var array = settings.split(',');

    // depends from type, result may have different properties
    var task, result = {};

    // 2 numbers task, like: 1 + 2 = 3
    if (type === '2digits') {
        task = generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
        result = {'expr1': task.num1 + ' ' + task.operation + ' ' + task.num2 + ' = ', 'result': task.result};
        console.log(type + ' generate_task: ' + result.expr1 + '' + result.result);

    // 3 numbers task: 1 + 2 + 3 = 6
    } else if (type === '3digits') {
        // operations, range_numbers, factor
        result = generate_3digit_task(array[0], array[1], array[2]);
        console.log(type + ' generate_task: ' + result.expr1 + result.result);

    // math operation determination tasks 1 ? 2 = 3
    // argument operation determination tasks 7 + ? = 9 or ? - 6 = 2
    } else if (type === '2digit_arg') {
        task = generate_2digit_task(array[1], array[2], array[3], array[4], array[5]);
        var expected = task.num1, argument = '1'; 
        if (array[0] === 'd') {
            if (Math.random() >= 0.5) {
                argument = '2'; expected = task.num2;
            }
        } else {
            argument = 'o'; expected = task.operation;
        }

        result = {'num1': task.num1, 'num2': task.num2, 'operation': task.operation,
                  'outcome': task.result, 'result': expected, 'argument': argument};
        console.log(type + ' generate_task: ' + result.num1 + result.operation + result.num2 + '=' + result.result);

    // {'num1': number_1, 'num2': number_2, 'operation': operation, 'result': result};
    } else if (type === 'digit_2column') {
        result = generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
        console.log(type + ' generate_task: ' + result.num1 + result.operation + result.num2 + '=' + result.result);

    // sequence digits like, 1,2,3,4 or 8,7,6,5 etc.
    } else if (type === 'linedigits') {
        result = generate_sequence_task(settings);
        console.log(type + ' generate_task: ' + result.expr1 + result.result);

    // comparision digits, 5 < 6
    } else if (type === 'comp_nums') {
        // <>=,0-10,1 -> operations, range, factor
        result = generate_comparison_digits(array[0], array[1], parseInt(array[2]));
        console.log(type + ' generate_task: ' + result.expr1 + result.result + result.expr2);

    // comparision expressions, 2+3 vs 9-3 (<>=)
    } else if (type === 'comp_expr') {
        // <>=,+-,0-10,1 -> operations, range_1, range_2, factor_1, factor_2
        result = generate_comparison_expressions(array[1], array[2], array[2], parseInt(array[3]), parseInt(array[3]));
        console.log(type + ' generate_task: ' + result.expr1 + result.result + result.expr2);

    } else if (type === 'line_5numbers') {
        // input string: '+-*,5,0-10,1' -> (0)operations: +-*, (1)#numbers: 5, (2)range: 0-10, (3)factor: 1
        // operations, range_numbers, factor
        result = generate_5digit_task(array[0], array[2], array[3]);
        console.log(type + ' generate_task: ' + result.expr1 + result.result);

    // undefined tasks, will return error
    } else {
        result = 'generate_task_from_string: wrong type "' + type + '" or task: "' + settings + '"';
        console.log(type + ' generate_task: ' + result);
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
    return {'expr1': task + ' , ', 'result': result};
}

/*
    usage:
        '<>=,0-10,1'
    result:
        '<>=,0-10,1' -> ['<>=', '0-10', '1']
*/
function generate_comparison_digits(operations, range, factor) {
    var num1 = get_random_int(range) * factor;
    var num2 = get_random_int(range) * factor;

    var operation = '=';
    if (num1 > num2) { operation = '>'; }
    else if (num1 < num2) { operation = '<'; }

    return {'expr1': num1, 'expr2': num2, 'result': operation};
}

/*
 * usage: <>=,+-,0-10,1
 * 
 */
function generate_comparison_expressions(operations, range_1, range_2, factor_1, factor_2) {
    var task1 = generate_2digit_task(operations, range_1, range_2, factor_1, factor_2);
    var expr1 = task1.num1 + ' ' + task1.operation + ' ' + task1.num2;
    var task2 = generate_2digit_task(operations, range_1, range_2, factor_1, factor_2);
    var expr2 = task2.num1 + ' ' + task2.operation + ' ' + task2.num2;

    var operation = '', num1 = parseInt(task1.result), num2 = parseInt(task2.result);
    if (num1 > num2) { operation = '>'; }
    else if (num1 < num2) { operation = '<'; }
    else { operation = '='; }

    return {'expr1': expr1, 'expr2': expr2, 'result': operation};
}

function generate_5digit_task(operations, range, factor=1) {
    var number_1 = parseInt(get_random_int('1-10'));
    var number_2 = parseInt(get_random_int('1-10'));
    var result = number_1 * number_2;
    var expression = number_1.toString() + ' x ' + number_2.toString();

    var number, number_3, number_4, result34, operation_2, operation_3 = 'na', operation_4;
    if (result < 10) {
        number = parseInt(get_random_int('0-10'));
        operation_2 = '*'; result = result * number;
        expression = number + ' x ' + expression;

    } else {
        operation_2 = get_random_operation(operations);
        if (operation_2 === '+') {
            number = parseInt(get_random_int('20-100'));
            if (Math.random() >= 0.5) {
                expression = number + ' + ' + expression; 
            } else {
                expression = expression + ' + ' + number; 
            }
            result = result + number;

        } else if (operation_2 === '-') {
            number = parseInt(get_random_int('40-99'));
            if (number > result) {
                result = number - result;
                expression = number + ' - ' + expression;
            } else {
                result = result - number;
                expression = expression  + ' - ' + number;
            }

        } else if (operation_2 === '*') {
            number_3 = parseInt(get_random_int('1-10'));
            number_4 = parseInt(get_random_int('0-10'));
            result34 = number_3 * number_4;

            operation_3 = get_random_operation('+-');
            if (operation_3 === '+') {
                expression = expression  + ' + ' + number_3 + ' x ' + number_4;
                result = result + result34;
            } else { // else -
                if (result > result34) {
                    expression = expression  + ' - ' + number_3 + ' x ' + number_4;
                    result = result - result34;
                } else {
                    expression = number_3 + ' x ' + number_4 + ' - ' + expression;
                    result = result34 - result;
                }
            }
        }        
    }

    var number_N = parseInt(get_random_int('60-100'));
    if (operation_2 === '*') {
        operation_4 = get_random_operation('+-');
        if (operation_4 === '+') {
            if (Math.random() >= 0.5) {
                expression = number_N + ' + ' + expression; 
            } else {
                expression = expression + ' + ' + number_N; 
            }
            result = result + number_N;

        } else { // else -
            // if: number_N - 3*4 - 2*3
            if (operation_3 === '-') {
                // re-calculate result due to --=+
                result = number_1 * number_2 + number_3 * number_4;
                if (number_N > result) {
                    result = number_N - result; expression = number_N + ' - ' + expression;
                } else {
                    result = result - number_N; expression = expression + ' - ' + number_N;
                }

            } else {
                if (result > number_N) {
                    result = result - number_N;
                    expression = expression + ' - ' + number_N; 
                } else {
                    result = number_N - result;
                    expression = number_N + ' - ' + expression; 
                }
            }
        }

    } else {
        operation_4 = get_random_operation(operations);
        if (operation_4 === '+') {
            if (Math.random() >= 0.5) {
                expression = number_N + ' + ' + expression; 
            } else {
                expression = expression + ' + ' + number_N;
            }
            result = result + number_N;

        } else if (operation_4 === '-') {
            // IF: number_N - 100 - 3*4
            if (operation_2 === '-') {
                result = number + number_1 * number_2;
                if (number_N > result) {
                    result = number_N - result;
                    expression = number_N + ' - ' + expression;
                } else {
                    result = result - number_N;
                    expression = expression + ' - ' + number_N;
                }
            } else {
                if (result > number) {
                    result = result - number;
                    expression = expression + ' - ' + number; 
                } else {
                    result = number - result;
                    expression = number + ' - ' + expression; 
                }
            }

        } else { // else *
            number_3 = parseInt(get_random_int(range));
            number_4 = parseInt(get_random_int(range));
            result34 = number_3 * number_4;

            operation_4 = get_random_operation('+-');
            if (operation_3 === '+') {
                if (Math.random() >= 0.5) {
                    expression = expression  + ' + ' + number_3 + ' x ' + number_4;
                } else {
                    expression = number_3 + ' x ' + number_4 + ' + ' + expression;
                }
                result = result + result34;

            } else { // else -
                // IF: 8 x 7 - 67 - 4 x 7 =
                if (operation_2 === '-') {
                    result = number + number_1 * number_2;
                    if (result34 > result) {
                        result = result34 - result;
                        expression = number_3 + ' x ' + number_4 + ' - ' + expression;
                    } else {
                        result = result - result34;
                        expression = expression  + ' - ' + number_3 + ' x ' + number_4;
                    }

                } else {
                    if (result > result34) {
                        expression = expression  + ' - ' + number_3 + ' x ' + number_4;
                        result = result - result34;
                    } else {
                        expression = number_3 + ' x ' + number_4 + ' - ' + expression;
                        result = result34 - result;
                    }
                }
            }
        }
    }

    var task = {'expr1': expression + ' = ', 'result': result.toString()};
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

    // replace * to x for better visualization
    if (operation_1 === OPERATION_MUL) {operation_1='x'}
    if (operation_2 === OPERATION_MUL) {operation_2='x'}

    var task = {'expr1': number_1.toString() + ' ' + operation_1
                + ' ' + number_2.toString() + ' ' + operation_2
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
            number_1 = number_2 = result = operation = 'error';
        break;
    }

    if ((operation === OPERATION_SUM) || (operation === OPERATION_MUL)) {
        // randomNumber is true => swap number_1 & number_2
        var randomNumber = Math.random() >= 0.5;
        if (randomNumber) {
            tmp = number_1; number_1 = number_2; number_2 = tmp;
        }
    }

    // replace * to x for better visualization
    if (operation === OPERATION_MUL) {operation='x'}

    return {'num1': number_1, 'num2': number_2, 'operation': operation, 'result': result};
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
