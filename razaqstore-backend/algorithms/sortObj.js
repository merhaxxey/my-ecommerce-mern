const sortObj = (arr)=>{
    const loopLen = arr.length - 1
    let temp = 0

    arr.forEach((arrItem, index)=>{
        for(let i=0; i<(loopLen); i++){
            if(arr[i].value < arr[i+1].value){
                temp = arr[i]
                arr.splice(i, 1, arr[i+1])
                arr.splice(i+1, 1, temp)   
            }
        }
    })

    return arr
}

module.exports = sortObj