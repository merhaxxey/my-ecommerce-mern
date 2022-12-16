const searchEngine = (qStr, searchStr)=>{
    qStr = qStr.toLowerCase().split(' ')
    searchStr = searchStr.toLowerCase().split(' ')

    let match = 0,
        maxlen = 0,
        minlen = 0,
        qIndexSafe = 0,
        sIndexSafe = 0,
        result = []

    // looping throught each string in the qstr
    qStr.forEach((qItem, qIndex)=>{
        qIndexSafe = qIndex

        // looping throught each string in the searchStr
        searchStr.forEach((sItem, sIndex)=>{
            sIndexSafe = sIndex
            maxlen = qItem.length > sItem.length? qItem.length: sItem.length
            minlen = qItem.length < sItem.length? qItem.length: sItem.length

            // loop to compare char in two string
            for(let i = 0; i<minlen; i++){
                if(qItem[i] === sItem[i]){
                    match++
                }
            }
            let tempResult = match / maxlen * 100
            if(tempResult >= 66){
                result.push(tempResult)
            }
            match = 0
        })
    })

    let percent = 0
    let isContinious = true
    if(result.length > 0){
        let i=0
        for(i=0; i !== (result.length-1); i++){
            percent += result[i]
            if(result[i][2] > result[i+1][2]){
                isContinious = false
            }
        }
        percent += result[i]
    }

    percent = percent / result.length

    return result.length
}


module.exports = searchEngine