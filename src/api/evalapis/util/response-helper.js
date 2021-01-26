
export const invalidResponse = {
    'status': 400,
    'message': "Invalid Expression"
}

export const validResponse = (value) => {
    return {
        'value': value
    }
}