export const filterUrl = (string)=>{
    string = string
        .split('&').join('*and*')
        .split('+').join('*plus*')
    return string
}
