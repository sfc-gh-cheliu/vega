function Entry(type, value, params) {
  this.id = -1,
  this.type = type;
  this.value = value;
  this.params = params;
}

export function entry(type, value, params) {
  return new Entry(type, value, params);
}

export function operator(value, params) {
  return entry('Operator', value, params);
}

export function transform(type, params) {
  return entry(type, null, params);
}

// -----

export function ref(op) {
  return {$ref: op.id};
}

export function fieldRef(field, name) {
  return name ? {$field: field, $name: name} : {$field: field};
}

export var keyRef = fieldRef('key');

export function compareRef(fields, order) {
  return {$compare: fields, $order: order};
}

// -----

export var ASCENDING  = 'ascending';

export var DESCENDING = 'descending';

export function sortKey(sort) {
  return !isObject(sort) ? ''
    : (sort.order === DESCENDING ? '-' : '+')
      + aggrField(sort.op, sort.field);
}

export function aggrField(op, field) {
  return (op && op.signal ? '$' + op.signal : op || '')
    + (op && field ? '_' : '')
    + (field && field.signal ? '$' + field.signal : field || '');
}

// -----

export function error(message) {
  throw Error(message);
}

// -----

export function isObject(_) {
  return _ === Object(_);
}

export function isString(_) {
  return typeof _ === 'string';
}

export function isFunction(_) {
  return typeof _ === 'function';
}

export function isArray(_) {
  return Array.isArray(_);
}