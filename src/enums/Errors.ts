

export enum Errors {
    NO_CONNECTION = `Ping to database failed. Please create a connection.`,
    UNDEFINED_SET_KEY = `Paramater (key) or (value) cannot be undefined`,
    BOOLEAN_KEY = `Paramater (key) cannot be of type: 'boolean'  or undefined`,
    INVALID_OPTIONS_TYPE = `Paramater (options?) can only be of type 'object'`,
    INVALID_SEARCHTYPE = `Option: 'ListOptions.search' may only be allowed if 'ListOptions.keyType' is equal to "string"`,
    INVALID_KEYTYPE = `Option: 'ListOptions.keyType' must either be "string" , "number" or "object"`
}