import React from 'react'

export default (state = {product: {},operations:[]}, action) => {
    switch (action.type) {
        case "PRODUCT_SCANNED":
            return{
                product:action.product
            };
        case "POPULATE_OPERATIONS":
            return{
                operations:action.operations
            };
        default:
            return state
    }

}