export function checker(parameter, value) {
    // Retorna true si hay un error
    if(!value)
        return true;
    else if (value && (parameter === "birthdate" || parameter === "vaccination_date") && !value.match(/\d{4}-\d{2}-\d{2}/))
        return true;
    else if (value && parameter === "mobile_phone" && !value.match(/^[1-9]\d*$/))
        return true;
    else if (value && parameter === "number_of_doses" && !value.match(/^[1-2]\d*$/))
        return true;
    else
        return false;
};

export function chekerErrors(errors) {
    for (const key in errors)
        if (errors[key] === true)
            return true;
    return false;
}